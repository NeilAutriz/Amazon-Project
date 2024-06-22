function CreateCart(localStoragekey){
    const cart = {
        cartItems: undefined,
    
        loadCart(){
            this.cartItems = JSON.parse(localStorage.getItem(`${localStoragekey}-oop`)) || [];
        
            if (this.cartItems.length === 0) {
                this.cartItems = [
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
        },
    
        saveCart(){
            localStorage.setItem(`${localStoragekey}-oop`, JSON.stringify(this.cartItems));
        },
        
        pushToCart(cartProductId, cartProductPrice){
            this.loadCart();
            let addedProduct;
            this.cartItems.forEach((currentCartProduct) => {
                if(currentCartProduct.id === cartProductId){
                    addedProduct = currentCartProduct;
                }
            })
            
            if(addedProduct){
                addedProduct.quantity++;
            } else {
                this.cartItems.push({id: cartProductId, 
                    quantity: 1, 
                    price: cartProductPrice,
                    deliveryId: '2'});
            }
            this.saveCart();
        },
    
        totalCartPrice(){
            let totalCartPrice = 0;
        
            this.cartItems.forEach((currentCartProduct) => {
                totalCartPrice += Number(currentCartProduct.price) * Number(currentCartProduct.quantity);
            })
            totalCartPrice = totalCartPrice.toFixed(2);
            return totalCartPrice;
        },
    
        deleteCartItem(itemIdDelete){
            let newCart = [];
            this.cartItems.forEach((item) => {
                if(item.id !== itemIdDelete){
                    newCart.push(item);
                }
            });
            this.cartItems = newCart;
            this.saveCart();
        },
    
        updateDeliveryOption(productId, deliveryOptionId){
            let foundProduct;
        
            this.cartItems.forEach((item) => {
                if(productId === item.id){
                    foundProduct = item;
                }
            })  
        
            if (foundProduct) {
                foundProduct.deliveryId = deliveryOptionId;
            }
            this.saveCart();
        }
    }
    return cart;
}