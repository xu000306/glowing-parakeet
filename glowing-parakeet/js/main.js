import { enemyList } from "./data.js";
let enemies = [...enemyList]; //copy the content to a new array

document.addEventListener("DOMContentLoaded", init);

function init() {
  //when the page loads...
  buildEnemyCards();
  addListeners();
}

function addListeners() {
  //add a submit listener to the form
  let form = document.querySelector("#enemyForm");
  form.addEventListener("submit", addUserToList);
  //add delete listeners for cards
  let section = document.querySelector("#enemies");
  section.addEventListener("click", removeFromList);
  //set the reset for the clear button
  document.getElementById("btnCancel").addEventListener("click", (ev) => {
    document.getElementById("enemyForm").reset();
    ev.preventDefault();
    ev.stopPropagation();
  });
}

function buildEnemyCards() {
  if (!enemyList) return;
  let section = document.querySelector("#enemies");
  //called when page loads AND after any update to the enemyList
  section.innerHTML = enemies
    .map((enemy) => {
      return ` <div class="enemy" data-ref="${enemy.uuid}">
            <h3>${enemy.name}</h3>
            <p>${enemy.reason}</p>
            <button class="btnDelete">Forgive Them</button>
          </div>`;
    })
    .join(" ");
}

function addUserToList(ev) {
  //save the form data in the list
  //remember to generate a uuid for each enemy
  //rebuild the list of enemies cards
  ev.preventDefault();
  let uuid = crypto.randomUUID();
  let name = document.getElementById("enemy").value;
  let reason = document.getElementById("reason").value;
  if (!name || !reason) {
    if (!name) {
      document.getElementById("enemy").classList.add("error");
    } else {
      document.getElementById("reason").classList.add("error");
    }
    return;
  }
  let newEnemy = {
    uuid,
    name,
    reason: reason,
  };
  enemies.unshift(newEnemy);
  buildEnemyCards();
  document.querySelector("#enemyForm").reset();
}

function removeFromList(ev) {
  //find the uuid in the card whose button was clicked
  //remove from the enemyList
  //rebuild the list of enemies cards
  let target = ev.target;
  console.log(target.tagName, target.localName, ev.currentTarget.localName);
  if (target.localName === "button" && target.classList.contains("btnDelete")) {
    let card = target.closest(".enemy");
    if (card) {
      let uuid = card.getAttribute("data-ref");
      enemies = enemies.filter((enemy) => {
        //update the array
        if (enemy.uuid === uuid) {
          return false; //when false get rid of it
        } else {
          return true; // when true keep it
        }
      });
    }
    buildEnemyCards();
  }
}
