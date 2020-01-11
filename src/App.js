import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./AppStore";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NewsContainer from "./components/News/NewsContainer";
import ProductContainer from "./components/Product/ProductContainer";
import ShopContainer from "./components/Shop/ShopContainer";
import AboutContainer from "./components/About/AboutContainer";

import styles from "./App.module.css";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className={styles.wrapper}>
                        <Header/>
                        <div className={styles.content}>
                            <Route path="/" exact render={() => <NewsContainer/>}/>
                            <Route path="/product/:productId" render={() => <ProductContainer/>}/>
                            <Route path="/shop/:categoryName" render={() => <ShopContainer/>}/>
                            <Route path="/about" render={() => <AboutContainer/>}/>
                        </div>
                        <Footer/>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
