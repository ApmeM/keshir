import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import shopReducer from "./components/Shop/ShopReducer";
import productReducer from "./components/Product/ProductReducer";

let reducers = combineReducers({
    shop: shopReducer,
    product: productReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;