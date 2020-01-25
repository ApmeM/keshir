import shoppingCartReduces, {
    fetchShoppingCartSuccess
} from "../components/ShoppingCart/ShoppingCartReducer";

describe("add shopping cart", ()=> {
    test('add product that have enough in stock', () => {
        const action = {type: 'SHOPPING_CART/ADD', product: {id: 123, available:  100}};
        const state = {
            products: []
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(123);
        expect(newState.products[0].count).toBe(1);
    });

    test('add product that do not have enough in stock', () => {
        const action = {type: 'SHOPPING_CART/ADD', product: {id: 123, available:  0}};
        const state = {
            products: []
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(0);
    });

    test('add product that have negative in stock', () => {
        const action = {type: 'SHOPPING_CART/ADD', product: {id: 123, available:  -100}};
        const state = {
            products: []
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(0);
    });

    test('add product that have infinity in stock', () => {
        const action = {type: 'SHOPPING_CART/ADD', product: {id: 123, available:  undefined}};
        const state = {
            products: []
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(123);
        expect(newState.products[0].count).toBe(1);
    });

    test('add product that already added', () => {
        const action = {type: 'SHOPPING_CART/ADD', product: {id: 123, available: undefined}};
        const state = {
            products: [{id: 123, count: 1}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(123);
        expect(newState.products[0].count).toBe(2);
    });
});

describe("change count in shopping cart", ()=> {
    test('increase product that was not added to shopping cart', () => {
        const action = {type: 'SHOPPING_CART/CHANGE_COUNT', productId: 123, count : 1};
        const state = {
            products: [{id: 321, available:  100, count: 1}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(321);
        expect(newState.products[0].count).toBe(1);
    });

    test('increase product that have enough in stock', () => {
        const action = {type: 'SHOPPING_CART/CHANGE_COUNT', productId: 123, count: 1};
        const state = {
            products: [{id: 123, available:  100, count: 10}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(123);
        expect(newState.products[0].count).toBe(11);
    });

    test('decrease product that have enough in stock', () => {
        const action = {type: 'SHOPPING_CART/CHANGE_COUNT', productId: 123, count: -1};
        const state = {
            products: [{id: 123, available:  100, count: 11}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(123);
        expect(newState.products[0].count).toBe(10);
    });

    test('change count for product that is no longer available', () => {
        const action = {type: 'SHOPPING_CART/CHANGE_COUNT', productId: 123, count: 1};
        const state = {
            products: [{id: 123, available:  0, count: 11}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(0);
    });

    test('change count for product that is negative in stock', () => {
        const action = {type: 'SHOPPING_CART/CHANGE_COUNT', productId: 123, count: 1};
        const state = {
            products: [{id: 123, available:  -100, count: 11}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(0);
    });

    test('change count for product that have infinity in stock', () => {
        const action = {type: 'SHOPPING_CART/CHANGE_COUNT', productId: 123, count: 1};
        const state = {
            products: [{id: 123, available:  undefined, count: 100500}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(123);
        expect(newState.products[0].count).toBe(100501);
    });
});

describe("remove from shopping cart", ()=> {
    test('remove product from shopping cart', () => {
        const action = {type: 'SHOPPING_CART/REMOVE', productId: 123};
        const state = {
            products: [{id: 123, available:  100, count: 1}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(0);
    });

    test('remove product that was not added to shopping cart', () => {
        const action = {type: 'SHOPPING_CART/REMOVE', productId: 321};
        const state = {
            products: [{id: 123, available:  100, count: 10}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(123);
        expect(newState.products[0].count).toBe(10);
    });

    test('remove only specified product', () => {
        const action = {type: 'SHOPPING_CART/REMOVE', productId: 123};
        const state = {
            products: [{id: 123, available:  100, count: 11}, {id: 321, available: 1, count: 1}]
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(321);
        expect(newState.products[0].count).toBe(1);
    });
});


describe("shopping cart", ()=> {
    test('fetch shopping cart success', () => {
        const action = fetchShoppingCartSuccess([{id: 100500}]);
        const state = {
            isFetching: true,
            products: []
        };

        const newState = shoppingCartReduces(state, action);

        expect(newState.products.length).toBe(1);
        expect(newState.products[0].id).toBe(100500);
    });
});

