import {cart, pushToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { moneyCurrency } from './utils/money.js';

function renderProducts(){
    let productHTML = document.querySelector('.js-product-grid');
    let renderHTML = '';
    
    products.forEach((product) => {
        renderHTML = renderHTML + `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src=${product.image}>
            </div>
    
            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>
    
            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>
    
            <div class="product-price">
                $${moneyCurrency(product.priceCents)}
            </div>
    
            <div class="product-quantity-container">
            <select>
                <option selected value="${product.quantity}">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>
    
            <div class="product-spacer"></div>
    
            <div class="added-to-cart">
            <img src="images/icons/checkmark.png" class="added-image">
            Added
            </div>
    
            <button class="add-to-cart-button button-primary js-add-button" 
            data-product-id="${product.id}" data-product-price="${product.priceCents}">
            Add to Cart
            </button>
        </div>
        `
    });
    productHTML.innerHTML = renderHTML; 
    addButton();
}

function addButton(){
    const addCartButton = document.querySelectorAll('.js-add-button');
    
    addCartButton.forEach((button) => {
        let cartProductId = button.dataset.productId;
        let cartProductPrice = (button.dataset.productPrice/100).toFixed(2);

        button.addEventListener('click', () => {
            pushToCart(cartProductId, cartProductPrice);
            updateCartQuantity();
        });
    })
}

function updateCartQuantity(){
    const cartQuantityDisplay = document.querySelector('.js-cart-quantity');  
    let updateCartQuantity = 0;

    cart.forEach((currentCartProduct) => {
        updateCartQuantity += Number(currentCartProduct.quantity);
    })

    cartQuantityDisplay.innerHTML = updateCartQuantity;
}

renderProducts();

