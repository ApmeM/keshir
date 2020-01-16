import {postAPI} from "../../api/api";

const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
const FETCH_PRODUCT_FAILED = 'FETCH_PRODUCT_FAILED';
const SWITCH_PRODUCT_VARIANT = 'SWITCH_PRODUCT_VARIANT';

export const fetchProductRequest = () => ({type: FETCH_PRODUCT_REQUEST});
export const fetchProductSuccess = (product) => ({type: FETCH_PRODUCT_SUCCESS, product});
export const fetchProductFailed = () => ({type: FETCH_PRODUCT_FAILED});

export const fetchProduct = (productId) => function (dispatch) {
    dispatch(fetchProductRequest());
    postAPI.getProduct(productId)
        .then(product => {
            dispatch(fetchProductSuccess(product))
        })
        .catch(error => {
            dispatch(fetchProductFailed())
        });
};

export const switchVariant = (variantId) => ({type: SWITCH_PRODUCT_VARIANT, variantId});

export default (state = {
    isFetching: false,
    failed: false,
    product: undefined,
    variantId: null
}, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                product: action.product
            };
        case FETCH_PRODUCT_FAILED:
            return {
                ...state,
                isFetching: false,
                failed: true,
                product: action.product
            };
        case SWITCH_PRODUCT_VARIANT:
            return {
                ...state,
                variantId: action.variantId
            };
        default:
            return state
    }
}