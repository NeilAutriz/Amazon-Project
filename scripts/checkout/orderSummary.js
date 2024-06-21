import {cart, totalCartPrice} from '../../data/cart.js'
import {moneyCurrency} from '../utils/money.js'
import {delivery} from '../../data/delivery.js'

export function renderSummary(){
  let summarySelector = document.querySelector('.js-order-summary');
  let totalSummary = totalCartPrice();
  let totalShipping = totalShippingCost();
  let totalNoTax = (Number(totalSummary) + Number(totalShipping)).toFixed(2);
  let estimatedTax = (Number(totalNoTax) * 0.10).toFixed(2); 
  let totalPrice = (Number(totalNoTax) + Number(estimatedTax)).toFixed(2);

  summarySelector.innerHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${totalSummary}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${totalShipping}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${totalNoTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${estimatedTax}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${totalPrice}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;


  let placeOrderButton = summarySelector.querySelector('.place-order-button');
  placeOrderButton.addEventListener('click', () => {
    // Recalculate and re-render summary on button click
    renderSummary();
  });
}

function totalShippingCost(){
  let totalShipping = 0;
  cart.forEach((item) => {
    let cartDeliveryId = item.deliveryId
    let foundItem;
    delivery.forEach((item) => {
      if(cartDeliveryId === item.deliveryId){
        foundItem = item;
      }
    })

    if(foundItem){
      totalShipping = totalShipping + foundItem.deliveryFee
    }

  })
  totalShipping = moneyCurrency(totalShipping);
  return totalShipping;
}

renderSummary();

