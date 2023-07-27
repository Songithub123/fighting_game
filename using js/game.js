const divControl = document.querySelector(".control");
// attack,defense and special abilities button
const attackbtn = document.createElement("button");
attackbtn.setAttribute("class", "action");
attackbtn.setAttribute("onclick", "player.actions('attack',player,enemy)");
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
const back2 = document.createElement("button");
back2.setAttribute("class", "back-button");
back2.onclick = function () {
  change_to_spell_list();
};
back2.textContent = "◀︎Back";

let p = document.createElement("p");
function narration(action) {
  p.textContent = "You " + action;
  document.querySelector(".computer-narration").appendChild(p);
}
class Character {
  constructor(wizard_level, knight_level) {
    this.wizard_level = wizard_level;
    this.knight_level = knight_level;
    this.strength = 2 * this.wizard_level + 10 * this.knight_level;
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
        target.hp -= user.strength - target.def;
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

let player;
let enemy;
const startBattleButton = document.getElementById("start-battle-btn");
startBattleButton.addEventListener("click", () => {
  const wizardLevelInput = document.getElementById("wizard-level");
  const knightLevelInput = document.getElementById("knight-level");
  player = new Character(
    parseInt(wizardLevelInput.value),
    parseInt(knightLevelInput.value)
  );
  enemy = new Character(
    parseInt(wizardLevelInput.value),
    parseInt(knightLevelInput.value)
  );
  startBattleButton.textContent = "In battle";
});
function use_spell(spell_name, caster, target) {
  const spell = spellList.find((s) => s.button.textContent === spell_name);
  if (caster.mp < spell.spell_lv) {
    document
      .querySelector(".computer-narration")
      .append((p.textContent = "Not enough MP "));
  } else {
    caster.mp -= spell.spell_lv;
    switch (spell_name) {
      case "Chill touch":
        dmg = roll_dice(1, 6) * caster.magic_potency - target.def;
        if_damage_is_lower_than_zero(dmg);
        target.hp = -dmg;
        break;
      case "Mage hand":
        break;
      case "Shield":
        console.log("You use shield");
        caster.defense += roll_dice(2, 3) * caster.magic_potency;
        break;
      case "Magic missile":
        for (let i = 0; i < 3; i++) {
          const dmg = (roll_dice(1, 4) + 1) * caster.magic_potency - target.def;
          if_damage_is_lower_than_zero(dmg);
          target.hp = -dmg;
        }
        break;
      case "Acid Arrow":
        break;
      case "Cure Disease":
        break;
      case "Lesser Dexterity":
        break;
      case "Lesser Strength":
        break;
      case "Shock Wave":
        break;
      case "Summon Angel 2nd Tier":
        break;
      case "Thunderlance":
        break;
      case "Fireball":
        console.log("You use fireball");
        const dmg = roll_dice(8, 6) * caster.magic_potency - target.def;
        if_damage_is_lower_than_zero(dmg);
        target.hp = -dmg;
        break;
      case "Animate dead":
        break;
      case "Summon undead 3rd":
        break;
      case "Burn Lance":
        break;
      case "Charm Species":
        break;
      case "Control Cloud":
        break;
      case "Crystal Lance":
        break;
      case "Dehydration":
        break;
      case "Freeze Lance":
        break;
      case "Grand Fireball":
        break;
      case "Holy Aura":
        break;
      case "Holy Ray":
        break;
      case "Shock Lance":
        break;
      case "Silver Lance":
        break;
      case "Summon Angel 4th":
        break;
      case "Tremor Sense":
        break;
      case "Dragon Lightning":
        break;
      case "Raise Dead":
        break;
      case "Sand Field":
        break;
      case "Summon Undead 5th":
        break;
      case "Teleportation":
        break;
      case "Vermin Bane":
        break;
      case "Undying Flame":
        break;
      case "Control Weather":
        break;
      case "Heal":
        break;
      case "Flamewing":
        break;
      case "Summon Undead 6th":
        break;
      case "Wall of Hell":
        break;
      case "Blasphemy":
        break;
      case "Chain Dragon Lightning":
        break;
      case "Focus Magic":
        break;
      case "Greater Teleportation":
        break;
      case "Greater Word of Curse":
        break;
      case "Hell Flame":
        break;
      case "Hellfire Wall":
        break;
      case "Holy Smite":
        break;
      case "Napalm":
        break;
      case "Phoenix Flame":
        break;
      case "Resurrection":
        break;
      case "Shining Burst":
        break;
      case "Summon Angel 7th":
        break;
      case "Undeath Army":
        break;
      case "Aspect of Elemental":
        break;
      case "Astral Smite":
        break;
      case "Death":
        break;
      case "Dimensional Lock":
        break;
      case "Distort Moral":
        break;
      case "Energy Drain":
        break;
      case "Explosion":
        break;
      case "Insanity":
        break;
      case "Wave of Pain":
        break;
      case "Grasp heart":
        const saving_throw =
          target.strength < 50 * caster.magic_potency ? true : false;
        if (saving_throw) {
          target.hp = 0;
        }
        break;
      case "Bless of Titania":
        break;
      case "Call Greater Thunder":
        break;
      case "Crack In The Ground":
        break;
      case "Elemental Form":
        break;
      case "Greater Rejection":
        break;
      case "Lead of Yatagarasu":
        break;
      case "Nuclear Blast":
        break;
      case "Perfect Unknowable":
        break;
      case "Polar Claw":
        break;
      case "Tempest":
        break;
      case "Temporal Stasis":
        break;
      case "True Death":
        break;
      case "True Resurrection":
        break;
      case "Vermilion Nova":
        break;
      case "Armageddon - Evil":
        break;
      case "Armageddon - Good":
        break;
      case "Body of Effulgent Aquamarine":
        break;
      case "Body of Effulgent Heliodor":
        break;
      case "Create Fortress":
        break;
      case "Implosion":
        break;
      case "Mercy of Shorea Robusta":
        break;
      case "Mist of Super Acid":
        break;
      case "Meteor Fall":
        break;
      case "Reality Slash":
        break;
      case "Seven Trumpeter":
        break;
      case "Stream of Lava":
        break;
      case "Summon Monster 10th":
        break;
      case "Summon Undead 10th":
        break;
      case "Ultimate Disturb":
        break;
      case "Uriel":
        break;
      case "Time stop":
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
    if (typeof player === "undefined") {
      return;
    }
    use_spell(spell_name, player, enemy);
  };
  return spell_button_variable;
} /* you create spells in this function.*/
const spellList = [
  { spell_lv: 0, button: create_spells("Chill touch", "cantrip") },
  { spell_lv: 0, button: create_spells("Mage hand", "cantrip") },
  { spell_lv: 1, button: create_spells("Shield", "1st") },
  { spell_lv: 1, button: create_spells("Magic missile", "1st") },
  { spell_lv: 2, button: create_spells("Acid Arrow", "2nd") },
  { spell_lv: 2, button: create_spells("Cure Disease", "2nd") },
  { spell_lv: 2, button: create_spells("Lesser Dexterity", "2nd") },
  { spell_lv: 2, button: create_spells("Lesser Strength", "2nd") },
  { spell_lv: 2, button: create_spells("Shock Wave", "2nd") },
  { spell_lv: 2, button: create_spells("Summon Angel 2nd Tier", "2nd") },
  { spell_lv: 2, button: create_spells("Thunderlance", "2nd") },
  { spell_lv: 3, button: create_spells("Fireball", "3rd") },
  { spell_lv: 3, button: create_spells("Animate dead", "3rd") },
  { spell_lv: 3, button: create_spells("Summon undead 3rd", "3rd") },
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
];

/*const levels = ["cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
const sortedSpellList = levels.flatMap(level => 
    spellList.filter(spell => spell.button.getAttribute("class").includes(level)));
    console.log(sortedSpellList);*/

function create_spell_button_based_on_level(spell_level, button_name) {
  const spell_button = document.createElement("button");
  spell_button.textContent = button_name + " tier spells";
  spell_button.onclick = function () {
    let spells = spellList.filter((spell) => spell.spell_lv === spell_level);
    while (divControl.firstChild) {
      divControl.removeChild(divControl.firstChild);
    }
    divControl.appendChild(back2);
    spells.forEach((spell) => {
      divControl.appendChild(spell.button);
    });
  };
  return spell_button;
}
const spell_tier_button = [
  { button: create_spell_button_based_on_level(0, "0th") },
  { button: create_spell_button_based_on_level(1, "1st") },
  { button: create_spell_button_based_on_level(2, "2nd") },
  { button: create_spell_button_based_on_level(3, "3rd") },
  { button: create_spell_button_based_on_level(4, "4th") },
  { button: create_spell_button_based_on_level(5, "5th") },
  { button: create_spell_button_based_on_level(6, "6th") },
  { button: create_spell_button_based_on_level(7, "7th") },
  { button: create_spell_button_based_on_level(8, "8th") },
  { button: create_spell_button_based_on_level(9, "9th") },
  { button: create_spell_button_based_on_level(10, "10th") },
];
function append_buttons_at_spell_list() {
  while (divControl.firstChild) {
    divControl.removeChild(divControl.firstChild);
  }
  divControl.appendChild(back);
  spell_tier_button.forEach((spell) => {
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
      player.hp -= roll_dice(1, 6) * enemy.strength;
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
            player.hp -= roll_dice(1, 6) * enemy.stats.strength;
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
