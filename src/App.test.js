import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import shoppingCartReduces, {fetchShoppingCartSuccess} from "./components/ShoppingCart/ShoppingCartReducer";

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("shopping cart", ()=> {
    test('fetch shopping cart success', () => {
        const action = fetchShoppingCartSuccess([{id: 100500}]);
        const state = {
            isFetching: true,
            products: []
        }

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(100500);
    });
});
