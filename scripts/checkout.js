import { cart, deleteCartItem, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { delivery } from "../data/delivery.js";


renderOrder();
function deliveryOptions(matchedProduct, cartItem){
  let deliveryHTML = '';

  delivery.forEach((deliveryOption) => {
    let today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDay, 'days');
    let deliveryFormat = deliveryDate.format('dddd, MMMM D');

    let deliveryCost;
    if(deliveryOption.deliveryFee === 0){
      deliveryCost = 'FREE';
    } else {
      deliveryCost = `${deliveryOption.deliveryFee}`;
      deliveryCost = '$' + moneyCurrency(deliveryCost);
    }

    let isChecked = String(deliveryOption.deliveryId) === String(cartItem.deliveryId);

    deliveryHTML +=` 
      <div class="delivery-option js-delivery-radio"
      data-delivery-id="${deliveryOption.deliveryId}"
      data-product-id="${matchedProduct.id}">
        <input type="radio"
          ${isChecked ? 'checked': ''} 
          class="delivery-option-input"
          name="delivery-option-${matchedProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryFormat}
          </div>
          <div class="delivery-option-price">
            ${deliveryCost}
          </div>
        </div>
      </div>
    `;
  });

  return deliveryHTML;
}

function renderOrder(){
  let renderContainer = document.querySelector('.js-order-container');
  let cartHTML = '';
  let deliveryDate = renderDate();
  
  cart.forEach((item) => {
    let matchedProduct;

    products.forEach((product) => {
      if(product.id === item.id){
        matchedProduct = product;
      }
    });

    cartHTML += `
      <div class="cart-item-container js-cart-container 
      js-container-${matchedProduct.id}">
        <div class="delivery-date">
          Delivery date: ${renderDate(item.deliveryId)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src=${matchedProduct.image}>

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
            ${deliveryOptions(matchedProduct, item)}
          </div>
        </div>
      </div>
    `;
  });
  renderContainer.innerHTML = cartHTML;
  deleteEventListener();
}

function deleteEventListener(){
  let deleteButtonsSelector = document.querySelectorAll('.js-delete-button');
  deleteButtonsSelector.forEach((button) => {
    button.addEventListener('click', () => {
      let itemId = button.dataset.itemId;
      deleteCartItem(itemId);

      let containerToDelete = document.querySelector(`.js-container-${itemId}`);
      containerToDelete.remove();
    });
  });
}

function renderDate(cartDeliveryId) {
  let deliveryOption;
  delivery.forEach((option) => {
    if(option.deliveryId === cartDeliveryId){
      deliveryOption = option;
    }
  });
  if (deliveryOption) {
    let today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDay, 'days');
    return deliveryDate.format('dddd, MMMM D');
  }


  return '';
}

function radioEventListener(){
  let radioSelector = document.querySelectorAll('.js-delivery-radio');
  radioSelector.forEach((button) => {
    button.addEventListener('click', () => {
      let deliveryId = button.dataset.deliveryId;
      let productId = button.dataset.productId;
      console.log(deliveryId, productId);
      updateDeliveryOption(productId, deliveryId);
    })
  })
  
}
radioEventListener()