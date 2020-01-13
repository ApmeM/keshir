const ADD_PRODUCT  = 'ADD_PRODUCT';
const CHANGE_COUNT  = 'CHANGE_COUNT';
const REMOVE_PRODUCT  = 'REMOVE_PRODUCT';

export const addProduct = (product) => ({type: ADD_PRODUCT, product});
export const increaseCount = (productId) => ({type: CHANGE_COUNT, productId, count: 1});
export const decreaseCount = (productId) => ({type: CHANGE_COUNT, productId, count: -1});
export const removeProduct = (productId) => ({type: REMOVE_PRODUCT, productId});

export default (state = {
    products: []
}, action)  => {
    switch (action.type) {
        case ADD_PRODUCT: {
            let products = [...state.products];

            let foundIndex = products.findIndex(p => p.id === action.product.id);
            if(foundIndex >= 0){
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
            if (foundIndex >= 0){
                products[foundIndex].count += action.count;
            }
            if(products[foundIndex].count === 0)
            {
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
                products: state.products.filter(p=>p.id !== action.productId)
            };
        }
        default:
            return state
    }
}