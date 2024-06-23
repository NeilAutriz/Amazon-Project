// Import necessary modules and data
import { cart, totalCartPrice } from '../../data/cart.js';
import { moneyCurrency } from '../utils/money.js';
import { delivery } from '../../data/delivery.js';
import { addOrder } from '../../data/orders.js';

// Function to render the order summary
export function renderSummary() {
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
      <div>Items (${cart.length}):</div>
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

  // Handle place order button click
  let placeOrderButton = document.querySelector('.place-order-button');
  placeOrderButton.addEventListener('click', async () => {
    const orderPayload = {
      cart
    };
    console.log('Order payload:', JSON.stringify(orderPayload));

    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        const order = await response.json();
        addOrder(order);
        console.log(order);
        window.location.href = 'orders.html';
      } else {
        const errorText = await response.text();
        console.error('Failed to place order:', errorText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  });
}

// Function to calculate total shipping cost
function totalShippingCost() {
  let totalShipping = 0;
  cart.forEach((item) => {
    let cartDeliveryId = item.deliveryId;
    let foundItem = delivery.find(deliveryItem => deliveryItem.deliveryId === cartDeliveryId);

    if (foundItem) {
      totalShipping += foundItem.deliveryFee;
    }
  });
  totalShipping = moneyCurrency(totalShipping);
  return totalShipping;
}

// Render the order summary
renderSummary();
