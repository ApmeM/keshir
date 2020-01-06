import {postAPI} from "../api/api";

const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED';

export const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
export const fetchProductsSuccess = (products) => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const fetchProductsFailed = () => ({type: FETCH_PRODUCTS_FAILED});

export const fetchProducts = () => function(dispatch) {
    dispatch(fetchProductsRequest());
    postAPI.getProducts()
    .then(products=>{
        dispatch(fetchProductsSuccess(products))
    })
    .catch(error => {
        dispatch(fetchProductsFailed())
    });
}

export default (state = {
    isFetching: false,
    failed: false,
    products: []
}, action)  => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.products
            };
        case FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                isFetching: false,
                failed: true,
                products: action.products
            };
        default:
            return state
    }
}