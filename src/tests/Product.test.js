import {create} from 'react-test-renderer'
import React from "react";
import {TestWrapper} from "./TestUtils";
import {PureProduct} from "../components/Product/Product";

describe("shop selection form", ()=> {
    test('show not available if out of stock', () => {
        const component = create(<TestWrapper><PureProduct
            fetchProduct={()=>{}}
            product={{id: 1, available: 0, variants:[{id: 1, available: 0, selection: []}]}}
            match={{params: {productId: 1}}}
        /></TestWrapper>);

        expect(()=>{component.root.findByType("form")}).toThrow()
    });
    test('show  available if anything in stock', () => {
        const component = create(<TestWrapper><PureProduct
            fetchProduct={()=>{}}
            product={{id: 1, available: 1, variants:[{id: 1, available: 1, selection: []}]}}
            match={{params: {productId: 1}}}
        /></TestWrapper>);

        const form = component.root.findByType("form");
    });
    test('show  available if infinity in stock', () => {
        const component = create(<TestWrapper><PureProduct
            fetchProduct={()=>{}}
            product={{id: 1, available: undefined, variants:[{id: 1, available: undefined, selection: []}]}}
            match={{params: {productId: 1}}}
        /></TestWrapper>);

        const form = component.root.findByType("form");
    });
});

