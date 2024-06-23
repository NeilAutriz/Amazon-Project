import {renderOrder} from '../scripts/checkout/reviewOrder.js'
import {renderSummary} from '../scripts/checkout/orderSummary.js'
import { loadProducts } from '../data/products.js';

loadProducts(() => {
    renderOrder();
    renderSummary();
});
