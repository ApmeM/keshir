import {postAPI} from "../../api/api";

const FETCH_TYPES_REQUEST = 'FETCH_TYPES_REQUEST';
const FETCH_TYPES_SUCCESS = 'FETCH_TYPES_SUCCESS';
const FETCH_TYPES_FAILED  = 'FETCH_TYPES_FAILED';

const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILED  = 'FETCH_PRODUCTS_FAILED';

export const fetchTypesRequest = () => ({type: FETCH_TYPES_REQUEST});
export const fetchTypesSuccess = (types) => ({type: FETCH_TYPES_SUCCESS, types});
export const fetchTypesFailed = () => ({type: FETCH_TYPES_FAILED});

export const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
export const fetchProductsSuccess = (products) => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const fetchProductsFailed = () => ({type: FETCH_PRODUCTS_FAILED});

export const fetchTypes = (categoryName) => function(dispatch) {
    dispatch(fetchTypesRequest());
    postAPI.getTypes(categoryName)
           .then(types=>{
                dispatch(fetchTypesSuccess(types));
                fetchProducts(categoryName, types[0])(dispatch);
            })
            .catch(error => {
                dispatch(fetchTypesFailed())
            });
}

export const fetchProducts = (categoryName, typeName) => function(dispatch) {
    dispatch(fetchProductsRequest());
    postAPI.getProducts(categoryName, typeName)
           .then(products=>{
               dispatch(fetchProductsSuccess(products))
            })
            .catch(error => {
                dispatch(fetchProductsFailed())
            });
}

export default (state = {
    products: {
        isFetching: false,
        failed: false,
        products: []
    },
    types: {
        isFetching: false,
        failed: false,
        types: []
    }
}, action)  => {
    switch (action.type) {
        case FETCH_TYPES_REQUEST:
            return {
                ...state,
                types: {isFetching: true}
            }
        case FETCH_TYPES_SUCCESS:
            return {
                ...state,
                types: {
                    isFetching: false,
                    types: action.types
                }
            };
        case FETCH_TYPES_FAILED:
            return {
                ...state,
                types: {
                    isFetching: false,
                    failed: true
                }
            };
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                products: {isFetching: true}
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: {
                    isFetching: false,
                    products: action.products
                }
            };
        case FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                products: {
                    isFetching: false,
                    failed: true
                }
            };
        default:
            return state;
    }
}