import {shoppingCartAPI} from "../../api/shoppingCartAPI";

const ADD_PRODUCT = 'SHOPPING_CART/ADD';
const CHANGE_COUNT = 'SHOPPING_CART/CHANGE_COUNT';
const REMOVE_PRODUCT = 'SHOPPING_CART/REMOVE';

const FETCH_SHOPPINGCART_SUCCESS = 'SHOPPING_CART/FETCH_SUCCESS';
const FETCH_SHOPPINGCART_REQUEST = 'SHOPPING_CART/FETCH_REQUEST';
const FETCH_SHOPPINGCART_FAILED = 'SHOPPING_CART/FETCH_FAILED';

const PURCHASE_SUCCESS = 'SHOPPING_CART/PURCHASE_SUCCESS';
const PURCHASE_REQUEST = 'SHOPPING_CART/PURCHASE_REQUEST';
const PURCHASE_FAILED = 'SHOPPING_CART/PURCHASE_FAILED';

export const addProduct = (product, form) => function (dispatch) {
    let shoppingCartId = product.id + Object.keys(form).reduce((a, b) => {
        return a + b + form[b];
    }, "");

    product = {...product, selection: form, id: shoppingCartId}

    dispatch({type: ADD_PRODUCT, product});
    shoppingCartAPI.addProductShoppingCart(product);
};
export const increaseCount = (productId) => function (dispatch) {
    dispatch({type: CHANGE_COUNT, productId, count: 1});
    shoppingCartAPI.changeCountShoppingCart(productId, 1);
};
export const decreaseCount = (productId) => function (dispatch) {
    dispatch({type: CHANGE_COUNT, productId, count: -1});
    shoppingCartAPI.changeCountShoppingCart(productId, -1);
};
export const removeProduct = (productId) => function (dispatch) {
    dispatch({type: REMOVE_PRODUCT, productId});
    shoppingCartAPI.removeProductShoppingCart(productId);
};

export const fetchShoppingCartRequest = () => ({type: FETCH_SHOPPINGCART_REQUEST});
export const fetchShoppingCartSuccess = (products) => ({type: FETCH_SHOPPINGCART_SUCCESS, products});
export const fetchShoppingCartFailed = () => ({type: FETCH_SHOPPINGCART_FAILED});

export const fetchShoppingCart = () => async function (dispatch) {
    dispatch(fetchShoppingCartRequest());
    try {
        const products = await shoppingCartAPI.getShoppingCart();
        dispatch(fetchShoppingCartSuccess(products));
    } catch (error) {
        dispatch(fetchShoppingCartFailed())
    }
};

export const purchaseRequest = () => ({type: PURCHASE_REQUEST});
export const purchaseSuccess = () => ({type: PURCHASE_SUCCESS});
export const purchaseFailed = () => ({type: PURCHASE_FAILED});

export const purchase = (contact, products, total) => async function (dispatch) {
    let productText = products.reduce((productAgg, product) => {
        let selectionText = Object.keys(product.selection).reduce((selectionAgg, key) => {
            return selectionAgg + key + product.selection[key];
        }, "");
        return productAgg + `Id=${product.variantId} Name=${product.name} variant=${product.variant} selection=${selectionText} count=${product.count} price=${product.price} total=${product.count * product.price}\n`;
    }, "");

    productText += `Shipping fee=300\n`
    productText += `Total=${total}`

    dispatch(purchaseRequest());
    try {
        await shoppingCartAPI.placeOrder(contact, productText);
        dispatch(purchaseSuccess());
        shoppingCartAPI.cleanShoppingCart();
    } catch (error) {
        dispatch(purchaseFailed())
    }
};

const checkProductsCount = (products, foundIndex) =>{
    if (products[foundIndex].count > products[foundIndex].available)
    {
        products[foundIndex].count = products[foundIndex].available
    }

    if (products[foundIndex].count <= 0) {
        products = products.filter(p => p.id !== products[foundIndex].id)
    }

    return products;
}

export default (state = {
    isFetching: false,
    failed: false,
    products: [],
    purchaseProcessing: false,
    showPopup: false
}, action) => {
    switch (action.type) {
        case FETCH_SHOPPINGCART_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_SHOPPINGCART_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.products
            };
        case FETCH_SHOPPINGCART_FAILED:
            return {
                ...state,
                isFetching: false,
                failed: true
            };
        case ADD_PRODUCT: {
            let products = [...state.products];

            let foundIndex = products.findIndex(p => p.id === action.product.id);
            if (foundIndex >= 0) {
                products[foundIndex].count++;
            } else {
                foundIndex = products.length;
                products.push({...action.product, count: 1});
            }

            products = checkProductsCount(products, foundIndex);

            return {
                ...state,
                products: products
            };
        }
        case CHANGE_COUNT: {
            let products = [...state.products];
            let foundIndex = products.findIndex(p => p.id === action.productId);
            if (foundIndex < 0) {
                return state;
            }

            products[foundIndex].count += action.count;

            products = checkProductsCount(products, foundIndex);

            return {
                ...state,
                products: products
            };
        }
        case REMOVE_PRODUCT: {
            let products = [...state.products];
            let foundIndex = products.findIndex(p => p.id === action.productId);
            if (foundIndex < 0) {
                return state;
            }

            products[foundIndex].count = 0;

            products = checkProductsCount(products, foundIndex);

            return {
                ...state,
                products: products
            };
        }
        case PURCHASE_REQUEST: {
            return {
                ...state,
                purchaseProcessing: true
            }
        }
        case PURCHASE_SUCCESS: {
            return {
                ...state,
                purchaseProcessing: false,
                showPopup: true,
                products: []
            }
        }
        case PURCHASE_FAILED: {
            return {
                ...state,
                purchaseProcessing: false,
                failed: true
            }
        }
        default:
            return state
    }
}