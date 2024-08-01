/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-35cfe-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())
    clearShoppingListel()
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItem)
    }
}else{
    shoppingListEl.innerHTML = "No items here... Yet"
}
})

function clearShoppingListel() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
       let itemID = item[0]
       let itemValue = item[1]
       let newEl = document.createElement("li")
       newEl.textContent = itemValue
       newEl.addEventListener("click", function(){
            let exactLoactionOfItemInDB = ref(database, `shoppingList/${itemID}`)
            remove(exactLoactionOfItemInDB)
       })
       shoppingListEl.append(newEl)
}