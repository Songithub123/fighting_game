const divControl = document.querySelector(".control");
// attack,defense and special abilities button
const attackbtn = document.createElement("button");
attackbtn.setAttribute("class", "action");
attackbtn.setAttribute("onclick", "player.actions('attack')");
attackbtn.textContent = "Attack";
const defensebtn = document.createElement("button");
defensebtn.setAttribute("class", "action");
defensebtn.setAttribute("onclick", "player.actions('defense')");
defensebtn.textContent = "Defense";
const speacialbtn = document.createElement("button");
speacialbtn.setAttribute("class", "action");
//speacialbtn.setAttribute("onclick", "character.actions('special')");
speacialbtn.addEventListener("click", change_to_spell_list);
speacialbtn.textContent = "Special";
divControl.appendChild(attackbtn);
divControl.appendChild(defensebtn);
divControl.appendChild(speacialbtn);
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
    this.speed = 1 * this.wizard_level + 5 * this.knight_level;
    this.hp = 10 * this.wizard_level + 50 * this.knight_level;
    this.max_hp = 10 * this.wizard_level + 50 * this.knight_level;
    this.mp = 15 * this.wizard_level + 1 * this.knight_level;
    this.max_mp = 15 * this.wizard_level + 1 * this.knight_level;
    this.magic_potency =
      1 + (10 * this.wizard_level + 1 * this.knight_level) / 100;
  }
  current_stats() {}
  actions(action, user, target) {
    switch (action) {
      case "attack":
        narration(action);
        target.hp -= user.atk - target.def;
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
        const dmg = roll_dice(8, 6) * caster.magic_potency - target.def;
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
        dmg = roll_dice(1, 6) * caster.magic_potency - target.def;
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
  { spell_lv: 1, button: create_spells("Shield", "1st") },
  { spell_lv: 1, button: create_spells("Magic missils", "1st") },
  { spell_lv: 3, button: create_spells("Fireball", "3rd") },
  { spell_lv: 3, button: create_spells("Animate dead", "3rd") },
  { spell_lv: 3, button: create_spells("Summon undead", "3rd") },
  { spell_lv: 4, button: create_spells("Burn Lance", "4th") },
  { spell_lv: 4, button: create_spells("Charm Species", "4th") },
  { spell_lv: 4, button: create_spells("Control Cloud", "4th") },
  { spell_lv: 4, button: create_spells("Crystal Lance", "4th") },
  { spell_lv: 4, button: create_spells("Dehydration", "4th") },
  { spell_lv: 4, button: create_spells("Freeze Lance", "4th") },
  { spell_lv: 4, button: create_spells("Grand Fireball", "4th") },
  { spell_lv: 4, button: create_spells("Holy Aura", "4th") },
  { spell_lv: 4, button: create_spells("Holy Ray", "4th") },
  { spell_lv: 4, button: create_spells("Shock Lance", "4th") },
  { spell_lv: 4, button: create_spells("Silver Lance", "4th") },
  { spell_lv: 4, button: create_spells("Summon Angel 4th", "4th") },
  { spell_lv: 4, button: create_spells("Tremor Sense", "4th") },
  { spell_lv: 5, button: create_spells("Dragon Lightning", "5th") },
  { spell_lv: 5, button: create_spells("Raise Dead", "5th") },
  { spell_lv: 5, button: create_spells("Sand Field", "5th") },
  { spell_lv: 5, button: create_spells("Summon Undead 5th", "5th") },
  { spell_lv: 5, button: create_spells("Teleportation", "5th") },
  { spell_lv: 5, button: create_spells("Vermin Bane", "5th") },
  { spell_lv: 5, button: create_spells("Undying Flame", "5th") },
  { spell_lv: 6, button: create_spells("Control Weather", "6th") },
  { spell_lv: 6, button: create_spells("Heal", "6th") },
  { spell_lv: 6, button: create_spells("Flamewing", "6th") },
  { spell_lv: 6, button: create_spells("Summon Undead 6th", "6th") },
  { spell_lv: 6, button: create_spells("Wall of Hell", "6th") },
  { spell_lv: 7, button: create_spells("Blasphemy", "7th") },
  { spell_lv: 7, button: create_spells("Chain Dragon Lightning", "7th") },
  { spell_lv: 7, button: create_spells("Focus Magic", "7th") },
  { spell_lv: 7, button: create_spells("Greater Teleportation", "7th") },
  { spell_lv: 7, button: create_spells("Greater Word of Curse", "7th") },
  { spell_lv: 7, button: create_spells("Hell Flame", "7th") },
  { spell_lv: 7, button: create_spells("Hellfire Wall", "7th") },
  { spell_lv: 7, button: create_spells("Holy Smite", "7th") },
  { spell_lv: 7, button: create_spells("Napalm", "7th") },
  { spell_lv: 7, button: create_spells("Phoenix Flame", "7th") },
  { spell_lv: 7, button: create_spells("Resurrection", "7th") },
  { spell_lv: 7, button: create_spells("Shining Burst", "7th") },
  { spell_lv: 7, button: create_spells("Summon Angel 7th", "7th") },
  { spell_lv: 7, button: create_spells("Undeath Army", "7th") },
  { spell_lv: 8, button: create_spells("Aspect of Elemental", "8th") },
  { spell_lv: 8, button: create_spells("Astral Smite", "8th") },
  { spell_lv: 8, button: create_spells("Death", "8th") },
  { spell_lv: 8, button: create_spells("Dimensional Lock", "8th") },
  { spell_lv: 8, button: create_spells("Distort Moral", "8th") },
  { spell_lv: 8, button: create_spells("Energy Drain", "8th") },
  { spell_lv: 8, button: create_spells("Explosion", "8th") },
  { spell_lv: 8, button: create_spells("Insanity", "8th") },
  { spell_lv: 8, button: create_spells("Wave of Pain", "8th") },
  { spell_lv: 9, button: create_spells("Grasp heart", "9th") },
  { spell_lv: 9, button: create_spells("Bless of Titania", "9th") },
  { spell_lv: 9, button: create_spells("Call Greater Thunder", "9th") },
  { spell_lv: 9, button: create_spells("Crack In The Ground", "9th") },
  { spell_lv: 9, button: create_spells("Elemental Form", "9th") },
  { spell_lv: 9, button: create_spells("Grasp Heart", "9th") },
  { spell_lv: 9, button: create_spells("Greater Rejection", "9th") },
  { spell_lv: 9, button: create_spells("Lead of Yatagarasu", "9th") },
  { spell_lv: 9, button: create_spells("Nuclear Blast", "9th") },
  { spell_lv: 9, button: create_spells("Perfect Unknowable", "9th") },
  { spell_lv: 9, button: create_spells("Polar Claw", "9th") },
  { spell_lv: 9, button: create_spells("Tempest", "9th") },
  { spell_lv: 9, button: create_spells("Temporal Stasis", "9th") },
  { spell_lv: 9, button: create_spells("True Death", "9th") },
  { spell_lv: 9, button: create_spells("True Resurrection", "9th") },
  { spell_lv: 9, button: create_spells("Vermilion Nova", "9th") },
  { spell_lv: 10, button: create_spells("Armageddon - Evil", "10th") },
  { spell_lv: 10, button: create_spells("Armageddon - Good", "10th") },
  {
    spell_lv: 10,
    button: create_spells("Body of Effulgent Aquamarine", "10th"),
  },
  { spell_lv: 10, button: create_spells("Body of Effulgent Heliodor", "10th") },
  { spell_lv: 10, button: create_spells("Create Fortress", "10th") },
  { spell_lv: 10, button: create_spells("Implosion", "10th") },
  { spell_lv: 10, button: create_spells("Mercy of Shorea Robusta", "10th") },
  { spell_lv: 10, button: create_spells("Mist of Super Acid", "10th") },
  { spell_lv: 10, button: create_spells("Meteor Fall", "10th") },
  { spell_lv: 10, button: create_spells("Reality Slash", "10th") },
  { spell_lv: 10, button: create_spells("Seven Trumpeter", "10th") },
  { spell_lv: 10, button: create_spells("Stream of Lava", "10th") },
  { spell_lv: 10, button: create_spells("Summon Monster 10th", "10th") },
  { spell_lv: 10, button: create_spells("Summon Undead 10th", "10th") },
  { spell_lv: 10, button: create_spells("Ultimate Disturb", "10th") },
  { spell_lv: 10, button: create_spells("Uriel", "10th") },
  { spell_lv: 10, button: create_spells("Time stop", "10th") },
  { spell_lv: 0, button: create_spells("Chill touch", "cantrip") },
  { spell_lv: 0, button: create_spells("Mage hand", "cantrip") },
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
function if_damage_is_lower_than_zero(damage) {
  if (damage < 0) {
    damage = 0;
  }
}

function enemy_turn(enemy, player) {
  const actions = ["attack", "defense", "useSpell"];
  let action = actions[Math.floor(Math.random() * actions.length)];
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
  divControl.appendChild(attackbtn);
  divControl.appendChild(defensebtn);
  divControl.appendChild(speacialbtn);
}

document.querySelector(".game-container").appendChild(divControl);
