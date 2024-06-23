import {renderOrder} from '../scripts/checkout/reviewOrder.js'
import {renderSummary} from '../scripts/checkout/orderSummary.js'
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';


async function loadPage(){
    try{
        await loadProducts();
        await new Promise((resolve) => {
            loadCart(() => {
                resolve();
            })
        });
    } catch(error) {
        console.log(`Error: ${error}`);
    }

    renderOrder();
    renderSummary();

}


loadPage();

new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderOrder();
    renderSummary();
})