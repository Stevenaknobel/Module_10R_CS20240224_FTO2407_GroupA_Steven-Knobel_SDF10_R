var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

import { initializeApp } from "https://real-time-database-5c238-default-rtdb.firebaseio.com/shoppingListInDB%3B"
 import { getDatabase, ref, push, onValue, remove } from "https://real-time-database-5c238-default-rtdb.firebaseio.com/shoppingListInDB%3B"
 
 const appSettings = {
     databaseURL: "https://real-time-database-5c238-default-rtdb.firebaseio.com/shoppingListInDB%3B//"
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
     if (snapshot.exists()) {
         let itemsArray = Object.entries(snapshot.val())
     
         clearShoppingListEl()
         
         for (let i = 0; i < itemsArray.length; i++) {
             let currentItem = itemsArray[i]
             let currentItemID = currentItem[0]
             let currentItemValue = currentItem[1]
             
             appendItemToShoppingListEl(currentItem)
         }    
     } else {
         shoppingListEl.innerHTML = "No items here... yet"
     }
 })
 
 function clearShoppingListEl() {
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
     
     newEl.addEventListener("click", function() {
         let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
         
         remove(exactLocationOfItemInDB)
     })
     
     shoppingListEl.append(newEl)
 }
