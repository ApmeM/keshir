import * as axios from "axios";
import csv from "csv-parser";
var Readable = require('stream').Readable;

const instanse = axios.create({
    baseURL: 'https://docs.google.com/'
});

const cache = instanse.get('/spreadsheets/d/e/2PACX-1vTR3vyNCfIEo8rJm_5QeRCYFjppQlCMFdJ5zMCHp-LU-OdoS669zmZJhio_iXGSHKPKQVuE7mg6ALfb/pub?gid=0&single=true&output=csv')
            .then(response => {
                return new Promise((resolve, reject) =>{
                    let currentCategory = '';
                    const results = [];
                    const s = new Readable();
                    s._read = () => {}; // redundant? see update below
                    s.push(response.data);
                    s.push(null);
                    s.pipe(csv())
                     .on('data', (data) => {
                            if(data.id === ""){
                                currentCategory = data.name;
                                return;
                            }

                            results.push({...data, category: currentCategory})
                     })
                     .on('end', () => {
                         resolve(results);
                     });
                });
            });

const getShoppingCart = ()=>{
    let productsString = localStorage.getItem('shoppingCart')
    if(productsString === null){
        return [];
    }
    return JSON.parse(productsString);
}

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

    addProductShoppingCart(product) {
        let products = getShoppingCart();

        let foundIndex = products.findIndex(p => p.id === product.id);
        if(foundIndex >= 0){
            products[foundIndex].count++;
        } else {
            products.push({...product, count: 1});
        }
        localStorage.setItem('shoppingCart', JSON.stringify(products));
    },

    changeCountShoppingCart(productId, count) {
        let products = getShoppingCart();
        let foundIndex = products.findIndex(p => p.id === productId);
        if (foundIndex >= 0){
            products[foundIndex].count += count;
        }
        if(products[foundIndex].count === 0)
        {
            products = products.filter(p => p.id !== productId)
        }
        localStorage.setItem('shoppingCart', JSON.stringify(products));
    },

    removeProductShoppingCart(productId) {
        let products = getShoppingCart();
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('shoppingCart', JSON.stringify(products));
    },
};