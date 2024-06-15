let products = [
    {
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        rating : {
            stars: 40,
            ratingCount : 87
        },
        price: 1090,
        quantity: 1
    },

    {
        image: 'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        rating : {
            stars: 45,
            ratingCount : 127
        },
        price: 2095,
        quantity: 1
    },
    
    {
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        rating : {
            stars: 45,
            ratingCount : 56
        },
        price: 799,
        quantity: 1
    }
]

renderProducts();




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
                src="images/ratings/rating-${product.rating.stars}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.ratingCount};
            </div>
            </div>
    
            <div class="product-price">
                $${product.price};
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
            <img src="images/icons/checkmark.png">
            Added
            </div>
    
            <button class="add-to-cart-button button-primary">
            Add to Cart
            </button>
        </div>
        `
    });
    productHTML.innerHTML = renderHTML; 
}
