//TODO - Your ES6 JavaScript code (if any) goes here
import "bootstrap"

import { personalCares } from "./item_data"

import { displayItems,displayCart,clickedCardFunc } from "./main"

displayItems(personalCares)

clickedCardFunc(personalCares)

displayCart()

