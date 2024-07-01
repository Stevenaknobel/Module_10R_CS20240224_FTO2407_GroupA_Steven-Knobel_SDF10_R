var firebaseConfig = {
   apiKey: "AIzaSyAZ7AAGPjuPsJyYZLnAuPcSGDkEINRGZz0",
    authDomain: "real-time-database-5c238.firebaseapp.com",
    databaseURL: "https://real-time-database-5c238-default-rtdb.firebaseio.com",
    projectId: "real-time-database-5c238",
    storageBucket: "real-time-database-5c238.appspot.com",
    messagingSenderId: "1030627552410",
    appId: "1:1030627552410:web:790760877a0e1422ef4323",
    measurementId: "G-CMN2EL2FJR"
};

firebase.initializeApp(firebaseConfig);

<script type="module">
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAZ7AAGPjuPsJyYZLnAuPcSGDkEINRGZz0",
    authDomain: "real-time-database-5c238.firebaseapp.com",
    databaseURL: "https://real-time-database-5c238-default-rtdb.firebaseio.com",
    projectId: "real-time-database-5c238",
    storageBucket: "real-time-database-5c238.appspot.com",
    messagingSenderId: "1030627552410",
    appId: "1:1030627552410:web:790760877a0e1422ef4323",
    measurementId: "G-CMN2EL2FJR",
  }
  
  
  


 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const app = initializeApp(appSettings)
 const database = getDatabase(app)
 const shoppingListInDB = ref(database, "shoppingList")
 const inputFieldEl = document.getElementById("input-field")
 const addButtonEl = document.getElementById("add-button")
 const shoppingListEl = document.getElementById("shopping-list")

   </script> 

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
