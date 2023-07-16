const divControl = document.querySelector(".control");

const button1 = document.createElement("button");
button1.setAttribute("class", "action");
button1.setAttribute("onclick", "player.actions('attack')");
button1.textContent = "Attack";
const button2 = document.createElement("button");
button2.setAttribute("class", "action");
button2.setAttribute("onclick", "player.actions('defense')");
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
    let max_hp = 10 * wizard_level + 50 * Knight_level;
    let mp = 15 * wizard_level + 1 * Knight_level;
    let max_mp = 15 * wizard_level + 1 * Knight_level;
    let magic_potency = 1 + (10 * wizard_level + 1 * Knight_level) / 100;
  }
  levelUp() {}
  actions(action) {
    switch (action) {
      case "attack":
        narration(action);
        break;
      case "defense":
        narration(action);
        break;
      case "special":
        narration(action);
        document
          .querySelector(".computer-narration")
          .append('p.textContent = "Not enough MP"');
        break;
    }
  }
}
const player = new Character();
player.stats(20, 0);
const enemy = new Character();
enemy.stats(20, 0);

//create spells with button attribute
function create_spells(spell_name, spell_level) {
  const spell_button_variable = document.createElement("button");
  spell_button_variable.setAttribute("class", "spells" + spell_level);
  spell_button_variable.textContent = spell_name;
  spell_button_variable.onclick = function () {
    use_spell(spell_name,player,enemy);
  };
  return spell_button_variable;
} /* you create spells in this function.*/
const spellList = [
  { spell_lv: 3, button: create_spells("Fireball", "3rd") },
  { spell_lv: 1, button: create_spells("Shield", "1st") },
  { spell_lv: 9, button: create_spells("Grasp heart", "9th") },
  { spell_lv: 0, button: create_spells("Chill touch", "cantrip") },
  { spell_lv: 10, button: create_spells("Time stop", "10th") },
  { spell_lv: 0, button: create_spells("Mage hand", "cantrip") },
  { spell_lv: 3, button: create_spells("Animate dead", "3rd") },
  { spell_lv: 3, button: create_spells("Summon undead", "3rd") },
];
/*const levels = ["cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
const sortedSpellList = levels.flatMap(level => 
    spellList.filter(spell => spell.button.getAttribute("class").includes(level)));
    console.log(sortedSpellList);*/
/* function will go through the spell list to append all of the 
spell button*/
function append_buttons_at_spell_list() {
  divControl.appendChild(back);
  spellList.forEach((spell) => {
    divControl.appendChild(spell.button);
  });
}
function roll_dice(number_of_rolls, dice_type) {
  let roll_result = 0;
  for (i = 0; i < number_of_rolls; i++) {
    let j = Math.floor(Math.random() * (dice_type + 1));
    roll_result += j;
  }
  return roll_result;
}
function use_spell(spell_name, caster, target) {
  //
  const spell = spellList.find((s) => s.button.textContent === spell_name);
  if (caster.mp < spell.spell_lv) {
    document
      .querySelector(".computer-narration")
      .append('p.textContent = "Not enough MP"');
  } else {
    caster.mp -= spell.spell_lv;
    switch (spell_name) {
      case "Fireball":
        console.log("You use fireball");
        target.hp = -roll_dice(8, 6) * caster.stats.magic_potency;
        break;
      case "Shield":
        console.log("You use shield");
        caster.stats.defense += roll_dice(2, 3) * caster.stats.magic_potency;
        break;
      case "Grasp heart":
        break;
    }
  }
}
function enemy_turn(enemy, player) {
  const spells = spellList.filter((s) => s.spell_lv <= enemy.mp);
  if (spells.length > 0) {
    const spell = spells[Math.floor(Math.random() * spells.length)];
    use_spell(spell.button.textContent, enemy, player);
  } else {
    // choose between attack or defense
    const action = Math.random() < 0.5 ? "attack" : "defense";
    switch (action) {
      case "attack":
        console.log("Enemy attacks");
        player.hp -= roll_dice(1, 6) * enemy.stats.atk;
        break;
      case "defense":
        console.log("Enemy defends");
        enemy.stats.def += roll_dice(1, 6);
        break;
    }
    // display message to player indicating that the enemy took an action
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

document.querySelector(".game-container").appendChild(divControl);

/*const divBox = document.createElement('div');
divBox.setAttribute('class', 'box');

divBox.appendChild(divControl);

document.body.appendChild(divBox);*/
