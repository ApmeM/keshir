import {postAPI} from "../../api/api";

const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
const FETCH_NEWS_FAILED = 'FETCH_NEWS_FAILED';

export const fetchNewsRequest = () => ({type: FETCH_NEWS_REQUEST});
export const fetchNewsSuccess = (products) => ({type: FETCH_NEWS_SUCCESS, products});
export const fetchNewsFailed = () => ({type: FETCH_NEWS_FAILED});

export const fetchNews = (productIds) => function (dispatch) {
    dispatch(fetchNewsRequest());
    postAPI.getNews(productIds)
        .then(products => {
            dispatch(fetchNewsSuccess(products))
        })
        .catch(error => {
            dispatch(fetchNewsFailed())
        });
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