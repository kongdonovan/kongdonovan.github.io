/**
 * donovan kong
 * 154ordle javascript code -- credit pls
 */

 'use strict';

 (function() {
   let currentRow = 0;
   let currentSquare = 0;
   const WORD = "CANDY";
 
   window.addEventListener('load', init);
 
   /**
    * initializes everything
    */
   function init() {
     initializeLocalStorage();
     initializeSquares();
     window.addEventListener('keydown', logKeyPress);
     let allKeys = qsa(".key");
     for (let i = 0; i < allKeys.length; i++) {
       allKeys[i].addEventListener("click", logButtonPress);
     }
   }
 
   function initializeLocalStorage() {
     let dailyWord = localStorage.getItem("dailyWord");
     let streak = localStorage.getItem("streak");
     if (!streak) {
       localStorage.setItem("streak", 0);
     }
     if (!dailyWord) {
       localStorage.setItem("dailyWord", null);
     }
   }
 
   function initializeSquares() {
     let rows = qsa("#board .row");
     let numRows = rows.length;
     for (let i = 0; i < numRows; i++) {
       let currentRow = rows[i];
       for (let j = 0; j < WORD.length; j++) {
         let div = gen("div");
         div.classList.add("square");
         let para = gen("p");
         div.appendChild(para);
         currentRow.appendChild(div);
       }
     }
   }
 
   //logs key press; records letter, does fun stuff
   function logKeyPress(e) {
     let currentRowElement = qsa(".row")[currentRow];
     //you pressed a valid key
     if (e.keyCode >= 65 && e.keyCode <= 90) {
       let letter = e.key.toUpperCase();
       if (currentRow <= 5 && currentSquare <= WORD.length - 1) {
         let square = currentRowElement.children[currentSquare].children[0];
         square.textContent = letter;
         currentSquare++;
       }
     }
     //you pressed enter
     else if (e.keyCode === 13 && currentSquare === WORD.length) {
       checkWin();
     }
     //you deleted a char
     else if (e.keyCode === 8 && currentSquare != 0) {
       let square = currentRowElement.children[currentSquare - 1].children[0];
       square.textContent = "";
       currentSquare--;
     }
     //you lost entirely
     else if (currentRow === 6) {
       window.removeEventListener('keydown', logKeyPress);
       alert("you lost!");
     }
   }
 
   //checks whether you won. if win, congratulates you and ends game.
   //otherwise, shows you where you went wrong
   function checkWin() {
     let word = "";
     let currentRowElement = qsa(".row")[currentRow];
     for (let i = 0; i < WORD.length; i++) {
       word += currentRowElement.children[i].children[0].textContent; //reads letters
     }
     for (let i = 0; i < word.length; i++) {
       let theId = word.charCodeAt(i).toString();
       for (let j = 0; j < WORD.length; j++) {
         if (word.charAt(i) === WORD.charAt(i)) {
           currentRowElement.children[i].classList.add("correct");
           id(theId).classList.add("correct");
         } else if (word.charAt(i) === WORD.charAt(j)) {
           currentRowElement.children[i].classList.add("almost");
           id(theId).classList.add("almost");
         } else if (!(WORD.includes(word.charAt(i)))) {
           currentRowElement.children[i].classList.add("wrong");
           id(theId).classList.add("wrong");
         }
       }
     }
     if (word === WORD) {
       let storedWord = localStorage.getItem("dailyWord");
       let currentStreak = parseInt(localStorage.getItem("streak"));
       if (storedWord !== WORD) {
         localStorage.setItem("dailyWord", WORD);
         currentStreak++;
         localStorage.setItem("streak", currentStreak);
       }
       alert("congrats!!! you won!\nStreak: " + currentStreak);
       window.removeEventListener('keydown', logKeyPress);
       let allKeys = qsa(".key");
     for (let i = 0; i < allKeys.length; i++) {
       allKeys[i].removeEventListener("click", logButtonPress);
     }
     } else {
       alert("not quite!");
     }
     currentRow++;
     currentSquare = 0;
   }
 
   //logs a button press
   function logButtonPress() {
     let lowercaseChar = this.children[0].textContent;
     lowercaseChar = lowercaseChar.toLowerCase();
     let id = parseInt(this.id);
     let e = {
       "key": lowercaseChar,
       "keyCode": id
     };
     logKeyPress(e);
   }
 
   //returns new dom element with passed in element type
   function gen(element) {
     return document.createElement(element);
   }
 
   //returns dom element with passed in id
   function id(element) {
     return document.getElementById(element);
   }
 
   //returns dom element with passed in css selector
   function qs(element) {
     return document.querySelector(element);
   }
 
   //returns array of dom elements with passed in css selector
   function qsa(element) {
     return document.querySelectorAll(element);
   }
 })();
 