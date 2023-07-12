let p = document.createElement("p");
function narration(action) {
  p.textContent = "You " + action;
  document.querySelector(".computer-narration").appendChild(p);
}

let character = (function () {
  let stats = {
    atk: 100,
    def: 100,
    hp: 1000,
    mp: 100,
  };

  function actions(action) {
    switch (action) {
      case "attack":
        narration(action);
        break;
      case "defense":
        narration(action);
        break;
      case "special":
        
        break;
    }
  }
  return {
    stats: stats,
    actions: actions,
  };
})();

// use js to make the button and make an if statement that make the control box append
// different button (in this case, spell list) when click on the special ability
const divControl = document.createElement("div");
divControl.setAttribute("class", "control");

const button1 = document.createElement("button");
button1.setAttribute("class", "action");
button1.setAttribute("id", "btn1");
button1.setAttribute("onclick", "character.actions('attack')");
button1.textContent = "Attack";
const button2 = document.createElement("button");
button2.setAttribute("class", "action");
button2.setAttribute("id", "bt2");
button2.setAttribute("onclick", "character.actions('defense')");
button2.textContent = "Defense";
const button3 = document.createElement("button");
button3.setAttribute("class", "action");
button3.setAttribute("id", "btn3");
//button3.setAttribute("onclick", "character.actions('special')");
button3.addEventListener("click", change_to_spell_list);
button3.textContent = "Special";

const back = document.createElement("button");
back.addEventListener("click", change_back_to_controller());
back.onclick = function() {change_back_to_controller();};
back.textContent = "Back";

//create spells with button attribute
 function create_spells(spell_name) {
  const spell_variable = document.createElement("button");
  spell_variable.setAttribute("class", "spells");
  spell_variable.textContent = spell_name;
  return spell_variable;
} // you create spells in this function
const spellList = [
  { name: "Fireball", button: create_spells("Fireball") },
  { name: "Shield", button: create_spells("Shield") },
  { name: "Grasp Heart", button: create_spells("Grasp Heart") },
  { name: "Chill touch", button: create_spells("Chill touch")}
];
/* function will go through the spell list to append all of the 
spell button*/
function create_buttons_at_spell_list() {
  divControl.appendChild(back);
  spellList.forEach((spell) => {
    divControl.appendChild(spell.button);
  });
}
function use_spell(spell_name) {
  switch (spell_name) {
    case "Fireball":
      // do something
      break;
    case "Shield":
      // do something else
      break;
    // add cases for other spells
  }
}

/* i use this while loop to remove the already placed buttons and 
append the new button when the "special" or "back" button is clicked */
function change_to_spell_list() {
  while (divControl.firstChild) { 
    divControl.removeChild        
    (divControl.firstChild);      
  }                               
  create_buttons_at_spell_list();
}
function change_back_to_controller() {
  while (divControl.firstChild) {
    divControl.removeChild(divControl.firstChild);
  }
  divControl.appendChild(button1);
  divControl.appendChild(button2);
  divControl.appendChild(button3);
}

document.querySelector(".game-container").appendChild(divControl);

/*const divBox = document.createElement('div');
divBox.setAttribute('class', 'box');

divBox.appendChild(divControl);

document.body.appendChild(divBox);*/
