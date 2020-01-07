import {postAPI} from "../../api/api";

const FETCH_SHOP_REQUEST = 'FETCH_SHOP_REQUEST';
const FETCH_SHOP_SUCCESS = 'FETCH_SHOP_SUCCESS';
const FETCH_SHOP_FAILED  = 'FETCH_SHOP_FAILED';

export const fetchShopRequest = () => ({type: FETCH_SHOP_REQUEST});
export const fetchShopSuccess = (products) => ({type: FETCH_SHOP_SUCCESS, products});
export const fetchShopFailed = () => ({type: FETCH_SHOP_FAILED});

export const fetchShop = () => function(dispatch) {
    dispatch(fetchShopRequest());
    postAPI.getShop()
           .then(products=>{
               dispatch(fetchShopSuccess(products))
            })
            .catch(error => {
                dispatch(fetchShopFailed())
            });
}

export default (state = {
    isFetching: false,
    failed: false,
    products: []
}, action)  => {
    switch (action.type) {
        case FETCH_SHOP_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_SHOP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.products
            };
        case FETCH_SHOP_FAILED:
            return {
                ...state,
                isFetching: false,
                failed: true
            };
        default:
            return state
    }
}