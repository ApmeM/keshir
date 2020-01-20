import * as axios from "axios";
import csv from "csv-parser";

var Readable = require('stream').Readable;

const instanse = axios.create({
    baseURL: 'https://docs.google.com/'
});

const cache = instanse.get(`/spreadsheets/d/e/${process.env.REACT_APP_SPREADSHEET_ID}/pub?gid=${process.env.REACT_APP_SPREADSHEET_PAGE_ID}&single=true&output=csv`)
    .then(response => {
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

                    let products = results.filter((r) => r.name === data.name);
                    if (products.length === 0) {
                        let product = {...data, category: currentCategory, variants: [data]};
                        results.push(product);
                    } else {
                        products[0].variants.push(data);
                    }
                })
                .on('end', () => {
                    resolve(results);
                });
        });
    });

export const shopAPI = {
    getProduct(id) {
        return cache.then(products => products.filter(p => p.id === id)[0]);
    },

    getTypes(categoryName) {
        return cache.then(
            products => {
                let result = products
                    .filter(p => p.category === categoryName)
                    .map(p => p.type)
                    .filter(p => p !== "")
                    .filter((elem, pos, arr) => arr.indexOf(elem) === pos);
                result.unshift("All");
                return result;
            }
        );
    },

    getProducts(categoryName, typeName) {
        return cache.then(products => products.filter(p => p.category === categoryName && (p.type === typeName || typeName === "All")));
    },

    getNews(productIds) {
        return cache.then(products => products.filter(p => productIds.includes(p.id)));
    },
};