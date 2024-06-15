export const cart = [];


export function pushToCart(cartProductId, cartProductPrice){
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
            price: cartProductPrice});
    }
}

function totalCartPrice(){
    let totalCartPrice = 0;

    cart.forEach((currentCartProduct) => {
        totalCartPrice += Number(currentCartProduct.price) * Number(currentCartProduct.quantity);
    })
    totalCartPrice = totalCartPrice.toFixed(2);
}