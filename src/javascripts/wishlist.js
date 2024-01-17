
import _ from 'lodash';
import { getCart } from './main';
import { displayCart } from './main';
export let InitialWishList = []

export function getWishList() {
    if (localStorage.getItem("WishListItems") && localStorage.getItem("WishListItems") !== "[]") {
        return JSON.parse(localStorage.getItem("WishListItems"));
    } else {
        return [];
    }
}

function removeFromWishList(funcCategory, funcIndexLocation) {
    let wishListItems = getWishList();

    for (let i = 0; i < wishListItems.length; i++) {
        let wishListItem = wishListItems[i];
        if (_.isEqual(wishListItem.category, funcCategory) && wishListItem.indexLocation == funcIndexLocation) {
            console.log("Before", wishListItems);
            
            // Remove the item from the array using splice
            wishListItems.splice(i, 1);
            
            console.log("After:", wishListItems);
            console.log("Removed from WishList after added to cart.");
            break; // Exit the loop once the item is found and removed
        }
    }

    // Update local storage outside the loop
    localStorage.setItem("WishListItems", JSON.stringify(wishListItems));
}


export function wishListbuttonsFunction(module, itemIndex) {
    let openWishList = document.querySelectorAll(".open-wishList-button");
    for (let index = 0; index < openWishList.length; index++) {
        let button = openWishList[index];

        button.addEventListener("click", function () {
            if (confirm("Do you want to add item to WISHLIST?")) {
                if (addItemToWishList(module, itemIndex)) {
                    window.alert("Added to WishList")
                };

            }
        });
    }
}

let wishListItems = getWishList();
console.log("here",typeof wishListItems)

export function addItemToWishList(funcCategory, funcIndexLocation) {
   
    for (let wishListItem of wishListItems) {

        console.log(_.isEqual(wishListItem.category, funcCategory)); // Outputs: true

        if (_.isEqual(wishListItem.category, funcCategory) && wishListItem.indexLocation == funcIndexLocation) {
            window.alert("Already in WishList.")
            return false;
        }
    }

    let wishListItem = {
        category: funcCategory,
        indexLocation: funcIndexLocation,
    };

    wishListItems.push(wishListItem);
    localStorage.setItem("WishListItems", JSON.stringify(wishListItems));
    // localStorage.removeItem("WishListItems")
    return true

}



function displayWishListProducts() {
    let ndx = 0;
    let WishListItemContainer = "";
    if (localStorage.getItem("WishListItems") && localStorage.getItem("WishListItems")!="[]" ) {
        document.querySelector(".empty-card").classList.add("d-none")
        document.querySelector(".itemsHolder").classList.remove("d-none")
        let wishListItems = JSON.parse(localStorage.getItem("WishListItems"));
        for (let Item of wishListItems) {
            WishListItemContainer += `
                  <div class="card bg-secondary card text-white mb-3" style="max-width: 240px;" data-ndx="${ndx}">
                      <div class="row g-0">
                          <div class="col-md-4">
                              <img src="${Item.category[Item.indexLocation].image}" class="img-fluid rounded-start" alt="${Item.category[Item.indexLocation].name}">
                          </div>
                          <div class="col-md-8 ">
                              <div class="card-body">
                                  <h6 class="card-title">${Item.category[Item.indexLocation].name}</h6>
                                  <p>Price:$ ${Item.category[Item.indexLocation].price}</p>

                              </div>
                            
                          </div>
                          <br>
                          <hr>
                          <div class="button-container">
                          <button class="btn btn-danger removeWishItem bi bi-trash3-fill wishlist-remove-button">Remove from Wishlist</button>
                          
                          <button type="submit" class="card-text btn btn-dark open-button bi bi-bag-plus wishlist-add-button">Add to Cart</button>
                          <form method="post" class="d-none submit-product" id="quantity">                
                          <div class="field">
                              <label for="Quantity">Quantity:</label>
                              <input type="number" class="eachQuantity" min="1" max="20" name="dob" placeholder="1">
                          </div>
                          <br>
                          <button type="submit" class="btn btn-primary close-cart bi bi-cart4">Add to Cart</button>
                      </form> 
                          </div>
                        </div>
                      </div>
                  </div>
              `;
            ndx++;
        }
        let WishListSelector = document.querySelector(".itemsHolder");
        WishListSelector.innerHTML = WishListItemContainer;

        document.querySelectorAll('.removeWishItem').forEach(function (btn) {
            btn.onclick = function (event) {
                if (confirm("Are you sure you want to remove this item from WishList?")) {
                    wishListItems.splice(event.target.closest('.card').dataset.ndx, 1);
                    localStorage.setItem("WishListItems", JSON.stringify(wishListItems));
                    displayWishListProducts();
                }
            };
        });
    }else{
        document.querySelector(".empty-card").classList.remove("d-none")
        document.querySelector(".itemsHolder").classList.add("d-none")
    }

    let openCart = document.querySelectorAll(".open-button");
    let wishList= JSON.parse(localStorage.getItem("WishListItems"))
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
            console.log(wishList)
            addItemToCart(wishList[index].category, wishList[index].indexLocation, amount);
            removeFromWishList(wishList[index].category,wishList[index].indexLocation)
            displayWishListProducts()
          }
          e.target.querySelector(".close-cart").onclick = buttonClicked.nextElementSibling.classList.add("d-none");
        });
      });
    }
}

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
  
try {
    displayWishListProducts()
}catch(e){
    console.log(e)
}