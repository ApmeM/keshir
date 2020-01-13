import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import shopReducer from "./components/Shop/ShopReducer";
import productReducer from "./components/Product/ProductReducer";
import newsReducer from "./components/News/NewsReducer";
import shoppingCartReducer from "./components/ShoppingCart/ShoppingCartReducer";

let reducers = combineReducers({
    shop: shopReducer,        
    product: productReducer,
    news: newsReducer,
    shoppingCart: shoppingCartReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;