export const cart = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2, 
    price: 1090
    },
    
    {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1, 
    price: 2095
    },
];


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