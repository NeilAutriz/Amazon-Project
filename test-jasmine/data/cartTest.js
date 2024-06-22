import {cart, pushToCart, loadCart} from '../../data/cart.js';

describe('Test Suite: Checking the add to cart function', () => {

    it('Adding existing products', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                price: 1090,
                deliveryId: '1'
            }]);
        });
        loadCart(); // Ensure cart is initialized with empty array from localStorage
        expect(cart.length).toEqual(1);
    })


    it('Adding new Products', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadCart(); // Ensure cart is initialized with empty array from localStorage
        pushToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1090);
        expect(cart.length).toEqual(2);
    });
});
