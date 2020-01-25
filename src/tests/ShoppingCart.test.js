import {create} from 'react-test-renderer'
import React from "react";
import {PureShoppingCart} from "../components/ShoppingCart/ShoppingCart";
import {TestWrapper} from "./TestUtils";

describe("shopping cart form", ()=> {
    test('if count equal to available plus sign should be disabled', () => {
        const component = create(<TestWrapper><PureShoppingCart
            fetchShoppingCart={()=>{}}
            products={[{id:123, count: 2, available: 2, selection:{}}]}
        /></TestWrapper>);

        let buttons = component.root.findAllByProps({disabled: true, title: "Добавить"});
        expect(buttons.length).toBe(1);
    });

    test('if count equal to 1 minus sign should be disabled', () => {
        const component = create(<TestWrapper><PureShoppingCart
            fetchShoppingCart={()=>{}}
            products={[{id:123, count: 1, available: 2, selection:{}}]}
        /></TestWrapper>);

        let buttons = component.root.findAllByProps({disabled: true, title: "Убавить"});
        expect(buttons.length).toBe(1);
    });
});

