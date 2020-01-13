import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./AppStore";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import News from "./components/News/News";
import Product from "./components/Product/Product";
import Shop from "./components/Shop/Shop";
import About from "./components/About/About";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

import styles from "./App.module.css";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className={styles.wrapper}>
                        <Header/>
                        <div className={styles.content}>
                            <Route path="/" exact render={() => <News/>}/>
                            <Route path="/product/:productId" render={() => <Product/>}/>
                            <Route path="/shop/:categoryName" render={() => <Shop/>}/>
                            <Route path="/cart" render={() => <ShoppingCart/>}/>
                            <Route path="/about" render={() => <About/>}/>
                        </div>
                        <Footer/>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
