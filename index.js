
import { initializeApp } from "https://real-time-database-5c238-default-rtdb.firebaseio.com/"
import { getDatabase, ref, push, onValue } from "https://real-time-database-5c238-default-rtdb.firebaseio.com/"

const appSettings = {
    databaseURL: "https://real-time-database-5c238-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function()
 {
    let inputValue = inputFieldEl.value

     push(shoppingListInDB, inputValue)
     clearInputFieldEl()

     appendItemToShoppingListEl(inputValue)
 })

 onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
   
    clearShoppingListEl()
   
    for (let i = 0; i < itemsArray.length; i++) {
        appendItemToShoppingListEl(itemsArray[i])
    console.log(itemsArray)
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
 function clearInputFieldEl() {
     inputFieldEl.value = ""
 }
    
 function appendItemToShoppingListEl(itemValue) {
     shoppingListEl.innerHTML += `<li>${inputValue}</li>`
 }


