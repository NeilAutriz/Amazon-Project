import { delivery } from "./delivery.js";

export let cart; 
loadCart();

export function loadCart(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cart = [
            {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                price: 1090,
                deliveryId: '1'
            },
            {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                price: 2095,
                deliveryId: '2'
            }
        ];
    }
    return cart; 
}


function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function pushToCart(cartProductId, cartProductPrice){
    loadCart();
    let addedProduct;
    cart.forEach((currentCartProduct) => {
        if(currentCartProduct.id === cartProductId){
            addedProduct = currentCartProduct;
        }
    })
    
    if(addedProduct){
        addedProduct.quantity++;
    } else {
        cart.push({id: cartProductId, 
            quantity: 1, 
            price: cartProductPrice,
            deliveryId: '2'});
    }
    saveCart();
}

export function totalCartPrice(){
    let totalCartPrice = 0;

    cart.forEach((currentCartProduct) => {
        totalCartPrice += Number(currentCartProduct.price) * Number(currentCartProduct.quantity);
    })
    totalCartPrice = totalCartPrice.toFixed(2);
    return totalCartPrice;
}

export function deleteCartItem(itemIdDelete){
    let newCart = [];
    cart.forEach((item) => {
        if(item.id !== itemIdDelete){
            newCart.push(item);
        }
    });
    cart = newCart;
    saveCart();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let foundProduct;

    cart.forEach((item) => {
        if(productId === item.id){
            foundProduct = item;
        }
    })  

    if (foundProduct) {
        foundProduct.deliveryId = deliveryOptionId;
    }
    saveCart();
}
