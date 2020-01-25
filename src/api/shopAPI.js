import * as axios from "axios";
import csv from "csv-parser";
import {Readable} from "stream";

const corsUrl = 'https://cors-anywhere.herokuapp.com/';

const getCache = async () => {
    const response = await axios.create().get(`${corsUrl}https://docs.google.com/spreadsheets/d/e/${process.env.REACT_APP_SPREADSHEET_ID}/pub?gid=${process.env.REACT_APP_SPREADSHEET_PAGE_ID}&single=true&output=csv`)
    return new Promise((resolve, reject) => {
        let currentCategory = '';
        const results = [];
        const s = new Readable();
        s._read = () => {
        }; // redundant? see update below
        s.push(response.data);
        s.push(null);
        s.pipe(csv())
            .on('data', (data) => {
                if (data.id === "") {
                    currentCategory = data.name;
                    return;
                }

                if (data.selection) {
                    data.selectionRaw = data.selection;
                    data.selection = data.selection.split(';').map((s) => {
                        const selector = s.split(':');
                        const selectorName = selector[0];
                        const selectorList = selector[1].split(',');
                        return {selectorName, selectorList};
                    });
                } else {
                    data.selection = [];
                }

                data.available = parseInt(data.available);
                if (isNaN(data.available)) {
                    data.available = undefined;
                }

                const products = results.filter((r) => r.name === data.name);
                if (products.length === 0) {
                    let product = {...data, category: currentCategory, variants: [data]};
                    data.productId = data.id;
                    data.variantId = data.id;
                    results.push(product);
                } else {
                    products[0].variants.push(data);
                    data.productId = products[0].id;
                    data.variantId = data.id;
                }
            })
            .on('end', () => {
                resolve(results);
            });
    });
}

const cache = getCache();

export const shopAPI = {
    async getProduct(id) {
        const products = await cache;
        return products.filter(p => p.id === id)[0];
    },

    async getTypes(categoryName) {
        const products = await cache;
        const result = products
            .filter(p => p.category === categoryName)
            .map(p => p.type)
            .filter(p => p !== "")
            .filter((elem, pos, arr) => arr.indexOf(elem) === pos);
        result.unshift("All");
        return result;
    },

    async getProducts(categoryName, typeName) {
        const products = await cache;
        return products.filter(p => p.category === categoryName && (p.type === typeName || typeName === "All"));
    },

    async getNews(productIds) {
        const products = await cache;
        return products.filter(p => productIds.includes(p.id));
    },
};