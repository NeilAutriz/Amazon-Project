import {moneyCurrency} from '../scripts/utils/money.js'

class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice(){
    return `$${moneyCurrency(this.priceCents)}`
  }

  additionalHTML(){
    return ``;
  }

}

class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  additionalHTML(){
    return `<a href="${this.sizeChartLink}"
    target="_blank">Show Sizes</a>`
  }

}

export let products = [];


export function loadProductsFetch(){
  const promise = fetch('https://supersimplebackend.dev/products').then((response) => {
    return response.json();
  }).then((productsData) => {
    let products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else {
        return new Product(productDetails);
      }
    })
  }).catch((error) => {
    console.log(`Error is detected: ${error}`);
  });

  return promise;
}

loadProductsFetch();

export function loadProducts(func) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else {
        return new Product(productDetails);
      }
    });

    if (typeof func === 'function') {
      func(); // Ensure func is a function before calling it
    }
    
  });

  xhr.addEventListener('error', () => {
    console.log('Error is detected.');
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

loadProducts();

