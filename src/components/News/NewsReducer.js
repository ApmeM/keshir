import {shopAPI} from "../../api/shopAPI";

const FETCH_NEWS_REQUEST = 'NEWS/FETCH_REQUEST';
const FETCH_NEWS_SUCCESS = 'NEWS/FETCH_SUCCESS';
const FETCH_NEWS_FAILED = 'NEWS/FETCH_FAILED';

export const fetchNewsRequest = () => ({type: FETCH_NEWS_REQUEST});
export const fetchNewsSuccess = (products) => ({type: FETCH_NEWS_SUCCESS, products});
export const fetchNewsFailed = () => ({type: FETCH_NEWS_FAILED});

export const fetchNews = (productIds) => async function (dispatch) {
    dispatch(fetchNewsRequest());
    try {
        const products = await shopAPI.getNews(productIds)
        dispatch(fetchNewsSuccess(products))
    } catch (error) {
        dispatch(fetchNewsFailed())
    }
};

export default (state = {
    isFetching: false,
    failed: false,
    products: []
}, action) => {
    switch (action.type) {
        case FETCH_NEWS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_NEWS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.products
            };
        case FETCH_NEWS_FAILED:
            return {
                ...state,
                isFetching: false,
                failed: true
            };
        default:
            return state
    }
}