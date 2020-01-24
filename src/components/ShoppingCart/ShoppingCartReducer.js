import {shoppingCartAPI} from "../../api/shoppingCartAPI";

const ADD_PRODUCT = 'ADD_PRODUCT';
const CHANGE_COUNT = 'CHANGE_COUNT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const FETCH_SHOPPINGCART_SUCCESS = 'FETCH_SHOPPINGCART_SUCCESS';
const FETCH_SHOPPINGCART_REQUEST = 'FETCH_SHOPPINGCART_REQUEST';
const FETCH_SHOPPINGCART_FAILED = 'FETCH_SHOPPINGCART_FAILED';

const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
const PURCHASE_REQUEST = 'PURCHASE_REQUEST';
const PURCHASE_FAILED = 'PURCHASE_FAILED';

export const addProduct = (product, form) => function (dispatch) {
    let productId = product.id + Object.keys(form).reduce((a, b) => {
        return a + b + form[b];
    }, "");

    product = {...product, rawProductId: product.id, selection: form, id: productId}

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
    shoppingCartAPI.removeProductShoppingCart(productId, 1);
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

export const purchase = (contact, products) => async function (dispatch) {
    let productIds = products.map(function (p) {
        let selectionText = Object.keys(p.selection).reduce((a, b) => {
            return a + b + p.selection[b];
        }, "");
        return `\nId=${p.rawProductId} Name=${p.name} variant=${p.variant} selection=${selectionText} count=${p.count} price=${p.price}`;
    });

    dispatch(purchaseRequest());
    try {
        await shoppingCartAPI.placeOrder(contact, productIds);
        dispatch(purchaseSuccess());
    } catch (error) {
        dispatch(purchaseFailed())
    }
};

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
                products.push({...action.product, count: 1});
            }

            return {
                ...state,
                products: products
            };
        }
        case CHANGE_COUNT: {
            let products = [...state.products];
            let foundIndex = products.findIndex(p => p.id === action.productId);
            if (foundIndex >= 0) {
                products[foundIndex].count += action.count;
            }
            if (products[foundIndex].count === 0) {
                products = products.filter(p => p.id !== action.productId)
            }

            return {
                ...state,
                products: products
            };
        }
        case REMOVE_PRODUCT: {
            return {
                ...state,
                products: state.products.filter(p => p.id !== action.productId)
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