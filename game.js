let p = document.createElement("p");
function narration(action) {
  p.textContent = "You " + action;
  document.querySelector(".computer-narration").appendChild(p);
}

class Character {
  stats(wizard_level, Knight_level) {
    let atk = 2 * wizard_level + 10 * Knight_level;
    let def = 2 * wizard_level + 10 * Knight_level;
    let hp = 10 * wizard_level + 50 * Knight_level;
    let max-hp = 10 * wizard_level + 50 * Knight_level;
    let mp = 15 * wizard_level + 1 * Knight_level;
  }
  levelUp(){

  }
  actions (action){
    switch (action){
      case "attack":
        narration(action);
        break;
      case "defense":
        narration(action);
        break;
      case "special":
        narration(action);    
    }
  }
};
const yourcharacter = new Character;
yourcharacter.stats(20,0);
const enemy = new Character;
enemy.stats(20,0);

const divControl = document.querySelector('.control');

const button1 = document.createElement("button");
button1.setAttribute("class", "action");
button1.setAttribute("onclick", "yourcharacter.actions('attack')");
button1.textContent = "Attack";
const button2 = document.createElement("button");
button2.setAttribute("class", "action");
button2.setAttribute("onclick", "yourcharacter.actions('defense')");
button2.textContent = "Defense";
const button3 = document.createElement("button");
button3.setAttribute("class", "action");
//button3.setAttribute("onclick", "character.actions('special')");
button3.addEventListener("click", change_to_spell_list);
button3.textContent = "Special";
divControl.appendChild(button1);
divControl.appendChild(button2);
divControl.appendChild(button3);

const back = document.createElement("button");
back.setAttribute("class", "back-button");
back.onclick = function () {
  change_back_to_controller();
};
back.textContent = "◀︎Back";

//create spells with button attribute
function create_spells(spell_name, spell_level) {
  const spell_variable = document.createElement("button");
  spell_variable.setAttribute("class", "spells" + spell_level);
  spell_variable.textContent = spell_name;
  spell_variable.onclick = function () {
    use_spell(spell_name);
  };
  return spell_variable;
} /* you create spells in this function.*/
const spellList = [
  { button: create_spells("Fireball", "3rd") },
  { button: create_spells("Shield", "1st") },
  { button: create_spells("Grasp Heart", "9th") },
  { button: create_spells("Chill touch", "cantrip") },
  { button: create_spells("Time stop", "10th") },
  { button: create_spells("Mage hand", "cantrip") },
  { button: create_spells("Animate dead", "3rd") },
  { button: create_spells("Summon undead", "3rd") },
];
/* function will go through the spell list to append all of the 
spell button*/
function append_buttons_at_spell_list() {
  divControl.appendChild(back);
  spellList.forEach((spell) => {
    divControl.appendChild(spell.button);
  });
}
function use_spell(spell_name,caster,caster-enemy) {
  switch (spell_name) {
    case "Fireball":
      console.log("You use fireball");
      break;
    case "Shield":
      console.log("You use shield");
      break;
    // add cases for other spells
  }
}

/* i use this while loop to remove the already placed buttons and 
append the new button when the "special" or "back" button is clicked */
function change_to_spell_list() {
  while (divControl.firstChild) {
    divControl.removeChild(divControl.firstChild);
  }
  append_buttons_at_spell_list();
}
function change_back_to_controller() {
  while (divControl.firstChild) {
    divControl.removeChild(divControl.firstChild);
  }
  divControl.appendChild(button1);
  divControl.appendChild(button2);
  divControl.appendChild(button3);
}

document.querySelector('.game-container').appendChild(divControl);

/*const divBox = document.createElement('div');
divBox.setAttribute('class', 'box');

divBox.appendChild(divControl);

document.body.appendChild(divBox);*/
