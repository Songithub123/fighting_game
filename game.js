const divControl = document.querySelector(".control");
// attack,defense and special abilities button
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
//back button
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

const startBattleButton = document.getElementById("start-battle-btn");

startBattleButton.addEventListener("click", () => {
  const wizardLevelInput = document.getElementById("wizard-level");
  const knightLevelInput = document.getElementById("knight-level");
  const player = new Character(
    parseInt(wizardLevelInput.value),
    parseInt(knightLevelInput.value)
  );
  const enemy = new Character(
    parseInt(wizardLevelInput.value),
    parseInt(knightLevelInput.value)
  );
  startBattleButton.textContent = "In battle";
});
class Character {
  constructor(wizard_level, knight_level) {
    this.wizard_level = wizard_level;
    this.knight_level = knight_level;
    this.atk = 2 * this.wizard_level + 10 * this.knight_level;
    this.def = 2 * this.wizard_level + 5 * this.knight_level;
    this.speed = 1*this.wizard_level + 5*this.knight_level;
    this.hp = 10 * this.wizard_level + 50 * this.knight_level;
    this.max_hp = 10 * this.wizard_level + 50 * this.knight_level;
    this.mp = 15 * this.wizard_level + 1 * this.knight_level;
    this.max_mp = 15 * this.wizard_level + 1 * this.knight_level;
    this.magic_potency =
      1 + (10 * this.wizard_level + 1 * this.knight_level) / 100;
  }
  current_stats(){

  }
  actions(action, user, target) {
    switch (action) {
      case "attack":
        narration(action);
        target.hp-=(user.atk-target.def);
        break;
      case "defense":
        narration(action);
        break;
      case "special":
        narration(action);
        break;
    }
  }
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
        const dmg = roll_dice(8, 6) * caster.magic_potency-target.def;
        if_damage_is_lower_than_zero(dmg);
        target.hp = -dmg;
        break;
      case "Shield":
        console.log("You use shield");
        caster.defense += roll_dice(2, 3) * caster.magic_potency;
        break;
      case "Grasp heart":
        const saving_throw =
          target.atk < 50 * caster.magic_potency ? true : false;
        if (saving_throw) {
          target.hp = 0;
        }
        break;
      case "Chill touch":
        dmg = roll_dice(1, 6) * caster.magic_potency-target.def;
        if_damage_is_lower_than_zero(dmg);
        target.hp = -dmg;
        break;
      case "Time stop":
        break;
      case "Animate dead":
        break;
      case "Summon undead":
        break;
    }
  }
}
function start_battle() {
  let isPlayerTurn = true;
  while (player.hp > 0 && enemy.hp > 0) {
    if (isPlayerTurn) {
      // Player's turn

      // Wait for player to select an action
    } else {
      // Enemy's turn
      update_stats(enemy);
      update_stats(player);
      change_to_computer();
      if (enemy.mp >= spellList[0].spell_lv && Math.random() < 0.5) {
        // Enemy uses a spell
        const spells = spellList.filter((s) => s.spell_lv <= enemy.mp);
        const spell = spells[Math.floor(Math.random() * spells.length)];
        use_spell(spell.button.textContent, enemy, player);
      } else {
        // Enemy attacks
        enemy_turn(enemy, player);
      }
    }
    isPlayerTurn = !isPlayerTurn; // Toggle turns
  }

  if (player.hp <= 0) {
    // Player loses
    console.log("You lose!");
  } else {
    // Enemy loses
    console.log("You win!");
    level_up(player);
  }
}
//create spells with button attribute
function create_spells(spell_name, spell_level) {
  const spell_button_variable = document.createElement("button");
  spell_button_variable.setAttribute("class", "spells" + spell_level);
  spell_button_variable.textContent = spell_name;
  spell_button_variable.onclick = function () {
    use_spell(spell_name, player, enemy);
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
function if_damage_is_lower_than_zero(damage){
  if (damage<0){
    damage = 0;
  }
};

function enemy_turn(enemy, player) {
  const actions = ["attack", "defense", "useSpell"];
  let action = actions[Math.floor(Math.random() * 2)];
  switch (action) {
    case "attack":
      console.log("Enemy attacks");
      player.hp -= roll_dice(1, 6) * enemy.atk;
      break;
    case "defense":
      console.log("Enemy defends");
      enemy.stats.def += roll_dice(1, 6);
      break;
    case "useSpell":
      /*assign the spells of spell list to a variable as a new list but
      filter out any spell that the enemy bot cannot use due to 
      lack of magic points (mp)*/
      const spells = spellList.filter((s) => s.spell_lv <= enemy.mp);
      if (spells.length > 0) {
        const spell = spells[Math.floor(Math.random() * spells.length)];
        use_spell(spell.button.textContent, enemy, player);
      } else {
        // if choose to use spell but not enough mp
        // choose between attack or defense
        action = Math.random() < 0.5 ? "attack" : "defense";
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
