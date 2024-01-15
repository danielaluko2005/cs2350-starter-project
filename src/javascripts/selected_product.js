import 'bootstrap';
import { getCart, displayCart } from './main';
import { wishListbuttonsFunction } from './wishlist';
import _ from 'lodash';

let lengthOfArray=JSON.parse(localStorage.getItem("theClickedCard")).length
let index = JSON.parse(localStorage.getItem("theClickedCard"))[lengthOfArray-1];
let module = JSON.parse(localStorage.getItem("theClickedCard"))[lengthOfArray-2];

let productImage = document.querySelector(".product");
let productDescription = document.querySelector(".product-description");
function displayProduct(module, index) {
  productImage.innerHTML = `
        <div class="card bg-body" style="width: 18rem; border: none">
            <img src="${module[index].image}" class="responsive-image card-img-top" alt="${module[index].name}">
        </div>`;

  productDescription.innerHTML = `
        <div class="card-body">
            <hr>
            <h5 class="card-title">${module[index].name}</h5>
            <hr>
            <div class="cart-box">
                <h3> $${module[index].price}</h3>
                <button type="submit" class="bi bi-box2-heart-fill card-text btn btn-dark open-wishList-button bi bi-bag-plus"></button>
                <button type="submit" class="card-text btn btn-dark open-button bi bi-bag-plus"></button>
                <form method="post" class="d-none submit-product" id="quantity">                
                    <div class="field">
                        <label for="Quantity">Quantity:</label>
                        <input type="number" class="eachQuantity" min="1" max="20" name="dob" placeholder="num">
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary close-cart bi bi-cart4">Add to Cart</button>
                </form> 
            </div>
            <hr>
            <h4>Description:</h4>
            <p class="card-text">${module[index].description}</p>
            <hr>
        </div>`;
}


displayProduct(module, index);


export function addItemToCart(funcCategory, funcIndexLocation, funcQuantity) {
  let cart = getCart();

  for (let cartItem of cart) {
    if (_.isEqual(cartItem.category, funcCategory) && cartItem.indexLocation == funcIndexLocation) {
      cart = cart.filter(s => s.indexLocation !== funcIndexLocation);
    }
  }

  let cartItem = {
    category: funcCategory,
    indexLocation: funcIndexLocation,
    quantity: funcQuantity
  };

  cart.push(cartItem);
  localStorage.setItem("CartItems", JSON.stringify(cart));
  displayCart();
}

function buttonsFunction(module, itemIndex) {
  let openCart = document.querySelectorAll(".open-button");
  for (let index = 0; index < openCart.length; index++) {
    let button = openCart[index];

    button.addEventListener("click", function (event) {
      let buttonClicked = event.target;
      let specificButton = buttonClicked.nextElementSibling;

      specificButton.classList.toggle("d-none");

      specificButton.addEventListener("submit", function (e) {
        e.preventDefault();
        let amount = e.target.querySelector(".eachQuantity").value;
        if (amount > 0) {
          addItemToCart(module, itemIndex, amount);
        }
        e.target.querySelector(".close-cart").onclick = buttonClicked.nextElementSibling.classList.add("d-none");
      });
    });
  }
}

buttonsFunction(module, index);

export let InitialWishList = [];





wishListbuttonsFunction(module, index);
