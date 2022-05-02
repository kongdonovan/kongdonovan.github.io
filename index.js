'use strict';

(function() {

  const messages =

  window.addEventListener("load", init);

  function init() {
    qs(".heart").addEventListener("click", calculateLove);
  }

  function calculateLove() {
    let inputs = qsa("input");
    let name1Value = calculateValue(inputs[0].value);
    let name2Value = calculateValue(inputs[1].value);
    let loveValue = Math.abs((name2Value - name1Value) % 100);
    if (!inputs[0].value || !inputs[1].value) {
      id("result").textContent = "Please fill in the blanks!";
      qs("#results img").src = "img/sad_face.jpg";
    } else {
      id("result").textContent = inputs[0].value + " and " + inputs[1].value + " have " + loveValue + "% compatibility. ";
      if (loveValue >= 80) {
        qs("#results img").src = "img/omg.gif";
      } else if (loveValue >= 60 && loveValue < 80) {
        qs("#results img").src = "img/burger_no_honey_mustard.gif";
      } else if (loveValue >= 40 && loveValue < 60) {
        qs("#results img").src = "img/gingerbread.gif";
      } else if (loveValue >= 20 && loveValue < 40) {
        qs("#results img").src = "img/laughing_dog.gif";
      } else {
        qs("#results img").src = "img/kys.gif";
      }
    }
    id("results").classList.remove("hidden");

    if (Math.floor(Math.random() * 100) === 69) {
      qs("body").innerHTML = "";
      let header = gen("h2");
      header.textContent = "haha penis cutting gif";
      qs("body").appendChild(header);
      for (let i = 0; i < 72; i++) {
        let image = gen("img");
        image.src = "img/penis_cut.gif";
        qs("body").appendChild(image);
      }
    }
  }

  function calculateValue(name) {
    let value = 0;
    for (let i = 0; i < name.length; i++) {
      value += name.charCodeAt(i);
    }
    return value;
  }

  function qs(element) {
    return document.querySelector(element);
  }

  function qsa(element) {
    return document.querySelectorAll(element);
  }

  function id(element) {
    return document.getElementById(element);
  }
  
  function gen(element) {
    return document.createElement(element);
  }
})();