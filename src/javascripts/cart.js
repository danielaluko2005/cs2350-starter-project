import "bootstrap"

import { getCart } from "./main";

function checker(cartEmpty) {

    if (cartEmpty){
    if (JSON.parse(localStorage.getItem("totalprice")) == 0) {
        // location.reload();
        document.querySelector(".displayPaymentForm").classList.add("d-none")
        document.querySelector(".cartBody").classList.add("d-none")
        document.querySelector(".empty-card").classList.remove("d-none")
    }
    }
}

checker(true)

export function displayCart() {
    // Display Cart
    let cartHtml = "";
    let ndx = 0;
    let totalPrice = 0;

    if (localStorage.getItem("CartItems")) {
        let cartItems = JSON.parse(localStorage.getItem("CartItems"));
        console.log(cartItems)

        for (let cartItem of cartItems) {
            cartHtml += `
          <div class="card bg-secondary card text-white mb-3" style="max-width: 240px;" data-ndx="${ndx}">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${cartItem.category[cartItem.indexLocation].image}" class="img-fluid rounded-start" alt="${cartItem.category[cartItem.indexLocation].name}">
              </div>
              <div class="col-md-8 ">
                <div class="card-body">
                  <h6 class="card-title">${cartItem.category[cartItem.indexLocation].name}</h6>
                  <p>Quantity: ${cartItem.quantity}</p>
                  <p>Price:$ ${parseFloat(cartItem.category[cartItem.indexLocation].price * cartItem.quantity).toFixed(2)}</p>
                </div>
              </div>
              <button class="btn btn-danger removeItem bi bi-trash3-fill">remove item</button>
            </div>
          </div>
        `;
            ndx++;
            totalPrice += parseFloat((cartItem.category[cartItem.indexLocation].price * cartItem.quantity).toFixed(2));
        }
    }

    let totalscoreHTML = `<div class="bg-dark card text-white "> Total Price: $ ${totalPrice} </div>`;

    localStorage.setItem("totalprice", JSON.stringify(totalPrice));

    let cartSelector = document.querySelector(".cart-menu");
    cartSelector.innerHTML = cartHtml;
    let totalScoreInDocument = document.querySelector(".totalScore");
    totalScoreInDocument.innerHTML = totalscoreHTML;

    document.querySelectorAll('.removeItem').forEach(function (btn) {
        btn.onclick = function (event) {
            let cart=getCart()
            if (confirm("Are you sure you want to remove this item from Cart?")) {
                cart.splice(event.target.closest('.card').dataset.ndx, 1);
                localStorage.setItem("CartItems", JSON.stringify(cart));
                
                displayCart();
            }
            checker(true)
        };
    });
}



function removePaymentForm() {

    let fname = document.getElementById("firstnamePayment").value
    let lname = document.getElementById("LastnamePayment").value
    let address = document.getElementById("inputAddressPayment").value
    let cardNumber = document.getElementById("cardNumberPayment").value
    let state = document.getElementById("inputState").value.toLowerCase()

    if (fname.trim() === '' || lname.trim() === '' || address.trim() === '' || cardNumber.trim() == '' || state == "choose".toLowerCase()) {
        alert('Please fill all required fields.');
        return false // Prevent form submission
    }

    localStorage.removeItem("CartItems")
    localStorage.removeItem("totalprice")
    
    localStorage.setItem("totalprice", JSON.stringify(0))
    checker(true)

    document.querySelector(".paymentForm").classList.add("d-none")

    return true
}

function showPaymentForm() {

       document.querySelector(".paymentForm").classList.remove("d-none")
    document.querySelector(".cartBody").classList.add("d-none")
    document.querySelector(".paymentForm").scrollIntoView({ behavior: 'smooth' })
    document.querySelector(".totalPriceInCart").innerHTML = ` Total Price: $${JSON.parse(localStorage.getItem("totalprice"))
        }`
    return true
}

document.querySelector(".displayPaymentForm").onclick = showPaymentForm

document.querySelector(".exactpaymentForm").onsubmit = removePaymentForm

// Calls the function to display cart.

if (localStorage.getItem("CartItems") && localStorage.getItem("CartItems") != "[]") {
    displayCart()
    console.log("Entered")
} else {
    document.querySelector(".cartBody").classList.add("d-none")
}

