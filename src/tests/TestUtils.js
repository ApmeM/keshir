import React from "react";
import {Provider} from "react-redux";
import store from "../AppStore";
import {HashRouter} from "react-router-dom";

export const TestWrapper = (props) => {
    return (
        <Provider store={store}>
            <HashRouter>
                {props.children}
            </HashRouter>
        </Provider>
    )
};
