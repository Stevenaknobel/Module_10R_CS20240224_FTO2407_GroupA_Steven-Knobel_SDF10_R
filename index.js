
import { initializeApp } from "https://real-time-database-5c238-default-rtdb.firebaseio.com/"
import { getDatabase, ref, push } from "https://real-time-database-5c238-default-rtdb.firebaseio.com/"

const appSettings = {
    databaseURL: "https://real-time-database-5c238-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
addButtonEl.addEventListener("click", function()
 {
    let inputValue = inputFieldEl.value

     push(shoppingListInDB, inputValue)
      
    console.log(inputValue)
}
)

