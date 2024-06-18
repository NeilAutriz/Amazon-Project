import { cart, deleteCartItem } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { delivery } from "../data/delivery.js";


renderOrder();
deliveryOptions()
function deliveryOptions(matchedProduct){
  let deliveryHTML = '';

  delivery.forEach((deliveryOption) => {
    let today = dayjs();
    console.log(today);
    let deliveryDate = today.add(deliveryOption.deliveryDay, 'days');
    let deliveryFormat = deliveryDate.format('dddd, MMMM D');


    let deliveryCost;
    if(deliveryOption.deliveryFee === 0){
      deliveryCost = 'FREE';
    } else {
      deliveryCost = `${deliveryOption.deliveryFee}`
      deliveryCost = '$' + moneyCurrency(deliveryCost);
    }

   deliveryHTML +=` 
   <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchedProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${deliveryFormat}
        </div>
        <div class="delivery-option-price">
          ${(deliveryCost)}
        </div>
      </div>
    </div>
    `
  })
  return deliveryHTML;
}


function renderOrder(){
    let renderContainer = document.querySelector('.js-order-container');
    let cartHTML = '';
    
    cart.forEach((item) => {
        let matchedProduct;

        products.forEach((product) => {
            if(product.id === item.id){
                matchedProduct = product;
            }
        })

        cartHTML += `
            <div class="cart-item-container js-cart-container 
            js-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchedProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchedProduct.name}
                </div>
                <div class="product-price">
                  $${moneyCurrency(matchedProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-item-id=${matchedProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptions(matchedProduct)}
              </div>
            </div>
          </div>
        `
    })
    renderContainer.innerHTML = cartHTML;
    deleteEventListener();
}

function deleteEventListener(){
  let deleteButtonsSelector = document.querySelectorAll('.js-delete-button');
  deleteButtonsSelector.forEach((button) => {
    button.addEventListener('click', () => {
      let itemId = button.dataset.itemId;
      deleteCartItem(itemId);

      let containerToDelete = document.querySelector(`.js-container-${itemId}`)
      containerToDelete.remove();
    })
  })
}