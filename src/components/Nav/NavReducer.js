import {shopAPI} from "../../api/shopAPI";

const FETCH_CATEGORIES_REQUEST = 'NAV/FETCH_CATEGORIES_REQUEST';
const FETCH_CATEGORIES_SUCCESS = 'NAV/FETCH_CATEGORIES_SUCCESS';
const FETCH_CATEGORIES_FAILED = 'NAV/FETCH_CATEGORIES_FAILED';

export const fetchCategories = () => async function (dispatch) {
    dispatch(fetchCategoriesRequest());
    try {
        const categories = await shopAPI.fetchCategories();
        dispatch(fetchCategoriesSuccess(categories));
    }catch(error){
        dispatch(fetchCategoriesFailed());
    }
};
export const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
export const fetchCategoriesSuccess = (categories) => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const fetchCategoriesFailed = () => ({type: FETCH_CATEGORIES_FAILED});

export default (state = {
    isFetching: false,
    failed: false,
    categories: []
}, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                categories: action.categories
            };
        case FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                isFetching: false,
                failed: true
            };
        default:
            return state
    }
}