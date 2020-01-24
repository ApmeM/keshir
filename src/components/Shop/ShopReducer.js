import {shopAPI} from "../../api/shopAPI";

const FETCH_TYPES_REQUEST = 'SHOP/FETCH_TYPES_REQUEST';
const FETCH_TYPES_SUCCESS = 'SHOP/FETCH_TYPES_SUCCESS';
const FETCH_TYPES_FAILED = 'SHOP/FETCH_TYPES_FAILED';

const FETCH_PRODUCTS_REQUEST = 'SHOP/FETCH_PRODUCTS_REQUEST';
const FETCH_PRODUCTS_SUCCESS = 'SHOP/FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILED = 'SHOP/FETCH_PRODUCTS_FAILED';

export const fetchTypesRequest = () => ({type: FETCH_TYPES_REQUEST});
export const fetchTypesSuccess = (types) => ({type: FETCH_TYPES_SUCCESS, types});
export const fetchTypesFailed = () => ({type: FETCH_TYPES_FAILED});

export const fetchProductsRequest = (typeName) => ({type: FETCH_PRODUCTS_REQUEST, typeName});
export const fetchProductsSuccess = (products) => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const fetchProductsFailed = () => ({type: FETCH_PRODUCTS_FAILED});

export const fetchTypes = (categoryName, defaultType) => async function (dispatch) {
    dispatch(fetchTypesRequest());
    try {
        const types = await shopAPI.getTypes(categoryName)
        dispatch(fetchTypesSuccess(types));
        let type = types[0];
        if (types.includes(defaultType)) {
            type = defaultType;
        }
        fetchProducts(categoryName, type)(dispatch);
    } catch (error) {
        dispatch(fetchTypesFailed())
    }
};

export const fetchProducts = (categoryName, typeName) => async function (dispatch) {
    dispatch(fetchProductsRequest(typeName));
    try {
        const products = await shopAPI.getProducts(categoryName, typeName)
        dispatch(fetchProductsSuccess(products))
    } catch (error) {
        dispatch(fetchProductsFailed())
    }
};

export default (state = {
    products: {
        isFetching: false,
        failed: false,
        products: []
    },
    types: {
        isFetching: false,
        failed: false,
        types: [],
        currentType: "All"
    }
}, action) => {
    switch (action.type) {
        case FETCH_TYPES_REQUEST:
            return {
                ...state,
                types: {...state.types, isFetching: true}
            };
        case FETCH_TYPES_SUCCESS:
            return {
                ...state,
                types: {
                    ...state.types,
                    isFetching: false,
                    types: action.types
                }
            };
        case FETCH_TYPES_FAILED:
            return {
                ...state,
                types: {
                    ...state.types,
                    isFetching: false,
                    failed: true
                }
            };
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                products: {...state.products, isFetching: true},
                types: {...state.types, currentType: action.typeName}
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: {
                    ...state.products,
                    isFetching: false,
                    products: action.products
                }
            };
        case FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                products: {
                    ...state.products,
                    isFetching: false,
                    failed: true
                }
            };
        default:
            return state;
    }
}