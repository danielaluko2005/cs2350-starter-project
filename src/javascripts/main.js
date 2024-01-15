// Import Bootstrap
import "bootstrap";



// The main engine of the webpage. Contains all necessary functions
export let InitialCart = [];



// Contains the particular card clicked. Then I would save it to the browser storage.
export let theClickedCard = [];

// Cart initialization

/**
 * Retrieve the cart from local storage.
 * @returns {Array} - The cart items.
 */
export function getCart() {
  if (localStorage.getItem("CartItems") && localStorage.getItem("CartItems") !== "[]") {
    return JSON.parse(localStorage.getItem("CartItems"));
  } else {
    return [];
  }
}


/**
 * Display the cart on the webpage.
 */
export function displayCart() {
  // Display Cart
  let totalPrice = 0;

  if (localStorage.getItem("CartItems")) {
    let cartItems = JSON.parse(localStorage.getItem("CartItems"));
  

    for (let cartItem of cartItems) {
      
      totalPrice += parseFloat((cartItem.category[cartItem.indexLocation].price * cartItem.quantity).toFixed(2));
    }
  }

  let totalscoreHTML = `<div class="bg-dark card text-white "> Total Price: $ ${totalPrice} </div>`;

  localStorage.setItem("totalprice", JSON.stringify(totalPrice));

 
  let totalScoreInDocument = document.querySelector(".totalScore");
  totalScoreInDocument.innerHTML = totalscoreHTML;

  return totalPrice
}

// Display cart on window load
window.onload = displayCart();

/**
 * Display a list of items.
 * @param {Array} items - List of items to display.
 */
export function displayItems(items) {
  let Container = "";
  for (let item of items) {
    Container += `
      <div class="card item-card mb-3">
        <h2>${item.name}</h2>
        <hr>
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text">${item.description}</p>
              <p class="card-text"><small>Price:</small><b> $ ${item.price}</b></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  let Details = document.querySelector(".itemsHolder");
  Details.innerHTML = Container;
}


/**
 * Handle the click event on a card. Save the clicked card and navigate to the selected product page.
 * @param {Object} module - The product module containing details.
 */
export function clickedCardFunc(module) {
  let allItems = document.querySelectorAll(".item-card");

  for (let index = 0; index < allItems.length; index++) {
    let clickedCard = allItems[index];

    clickedCard.addEventListener("click", function () {
      theClickedCard.push(module, index);
      localStorage.setItem("theClickedCard", JSON.stringify(theClickedCard));
      window.location.href = "selected_product.html";
    });
  }
}
