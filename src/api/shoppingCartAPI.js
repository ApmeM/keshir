import * as axios from "axios";

const getShoppingCart = () => {
    let productsString = localStorage.getItem('shoppingCart');
    if (productsString === null) {
        return [];
    }
    return JSON.parse(productsString);
};

export const shoppingCartAPI = {

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
        const formData = new FormData();
        formData.append(process.env.REACT_APP_ORDER_URL_CONTACT_NAME, contact);
        formData.append(process.env.REACT_APP_ORDER_URL_PRODUCTS_NAME, products);
        return axios.create().post(process.env.REACT_APP_ORDER_URL, formData);
    }
};