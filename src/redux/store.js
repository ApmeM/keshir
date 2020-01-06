import {applyMiddleware, combineReducers, createStore} from "redux";
import productsReducer from "./productsReducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    products: productsReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;