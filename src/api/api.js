import * as axios from "axios";
import csv from "csv-parser";

var Readable = require('stream').Readable;

const instanse = axios.create({
    baseURL: 'https://docs.google.com/'
});

const cache = instanse.get('/spreadsheets/d/e/2PACX-1vTR3vyNCfIEo8rJm_5QeRCYFjppQlCMFdJ5zMCHp-LU-OdoS669zmZJhio_iXGSHKPKQVuE7mg6ALfb/pub?gid=0&single=true&output=csv')
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

const getShoppingCart = () => {
    let productsString = localStorage.getItem('shoppingCart');
    if (productsString === null) {
        return [];
    }
    return JSON.parse(productsString);
};

export const postAPI = {
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

    getShoppingCart() {
        return new Promise((resolve, reject) => {
            resolve(getShoppingCart());
        });
    },
    cleanShoppingCart(){
        localStorage.setItem('shoppingCart', JSON.stringify([]));
    },
    addProductShoppingCart(product) {
        let products = getShoppingCart();

        let foundIndex = products.findIndex(p => p.id === product.id);
        if (foundIndex >= 0) {
            products[foundIndex].count++;
        } else {
            products.push({...product, count: 1});
        }
        localStorage.setItem('shoppingCart', JSON.stringify(products));
    },

    changeCountShoppingCart(productId, count) {
        let products = getShoppingCart();
        let foundIndex = products.findIndex(p => p.id === productId);
        if (foundIndex >= 0) {
            products[foundIndex].count += count;
        }
        if (products[foundIndex].count === 0) {
            products = products.filter(p => p.id !== productId)
        }
        localStorage.setItem('shoppingCart', JSON.stringify(products));
    },

    removeProductShoppingCart(productId) {
        let products = getShoppingCart();
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('shoppingCart', JSON.stringify(products));
    },
    placeOrder(contact, products) {
        const contactsGoogleFormId = '87338845';
        const productsGoogleFormId = '865352840';

        const formData = new FormData();
        formData.append(`entry.${contactsGoogleFormId}`, contact);
        formData.append(`entry.${productsGoogleFormId}`, products);
        return axios({
            url: 'https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/1FAIpQLSd-vdFgZ2cwy4VlPo2lmHDS7z8-hV6Ia9fyIwUQXVHJfR-qhg/formResponse' ,
            method: 'post',
            data: formData,
            responseType: 'json'
        });
    }
};