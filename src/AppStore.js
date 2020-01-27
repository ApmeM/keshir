import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import shopReducer from "./components/Shop/ShopReducer";
import productReducer from "./components/Product/ProductReducer";
import navReducer from "./components/Nav/NavReducer";
import newsReducer from "./components/News/NewsReducer";
import shoppingCartReducer from "./components/ShoppingCart/ShoppingCartReducer";

let reducers = combineReducers({
    shop: shopReducer,
    product: productReducer,
    news: newsReducer,
    shoppingCart: shoppingCartReducer,
    nav: navReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;