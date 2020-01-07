import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./AppStore";

import Header from "./components/Header/Header";
import NewsContainer from "./components/News/NewsContainer";
import ShopContainer from "./components/Shop/ShopContainer";
import AboutContainer from "./components/About/AboutContainer";

import styles from "./App.module.css";

function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <div className={styles.wrapper}>
            <Header/>
            <div className={styles.content}>
              <Route path="/" exact render={() => <NewsContainer/>}/>
              <Route path="/shop" render={() => <ShopContainer/>}/>
              <Route path="/about" render={() => <AboutContainer/>}/>
            </div>
          </div>
        </Provider>
      </BrowserRouter>
  );
}

export default App;
