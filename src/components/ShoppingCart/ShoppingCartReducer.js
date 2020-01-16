import {postAPI} from "../../api/api";

const ADD_PRODUCT = 'ADD_PRODUCT';
const CHANGE_COUNT = 'CHANGE_COUNT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const FETCH_SHOPPINGCART_SUCCESS = 'FETCH_SHOPPINGCART_SUCCESS';
const FETCH_SHOPPINGCART_REQUEST = 'FETCH_SHOPPINGCART_REQUEST';
const FETCH_SHOPPINGCART_FAILED = 'FETCH_SHOPPINGCART_FAILED';

export const addProduct = (product) => function (dispatch) {
    dispatch({type: ADD_PRODUCT, product});
    postAPI.addProductShoppingCart(product);
};
export const increaseCount = (productId) => function (dispatch) {
    dispatch({type: CHANGE_COUNT, productId, count: 1});
    postAPI.changeCountShoppingCart(productId, 1);
};
export const decreaseCount = (productId) => function (dispatch) {
    dispatch({type: CHANGE_COUNT, productId, count: -1});
    postAPI.changeCountShoppingCart(productId, -1);
};
export const removeProduct = (productId) => function (dispatch) {
    dispatch({type: REMOVE_PRODUCT, productId});
    postAPI.removeProductShoppingCart(productId, 1);
};

export const fetchShoppingCartRequest = () => ({type: FETCH_SHOPPINGCART_REQUEST});
export const fetchShoppingCartSuccess = (products) => ({type: FETCH_SHOPPINGCART_SUCCESS, products});
export const fetchShoppingCartFailed = () => ({type: FETCH_SHOPPINGCART_FAILED});

export const fetchShoppingCart = () => function (dispatch) {
    dispatch(fetchShoppingCartRequest());
    postAPI.getShoppingCart()
        .then(products => {
            dispatch(fetchShoppingCartSuccess(products))
        })
        .catch(error => {
            dispatch(fetchShoppingCartFailed())
        });
};

export default (state = {
    isFetching: false,
    failed: false,
    products: []
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
        default:
            return state
    }
}