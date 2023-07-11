var p = document.createElement("p");
function narration(action) {
    p.textContent = "You " + action;
    document.querySelector(".computer-narration").appendChild(p);
}
var character = (function () {
    var stats = {
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
                change_to_spell_list();
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
var divControl = document.createElement("div");
divControl.setAttribute("class", "control");
var button1 = document.createElement("button");
button1.setAttribute("class", "action");
button1.setAttribute("id", "btn1");
button1.setAttribute("onclick", "character.actions('attack')");
button1.textContent = "Attack";
var button2 = document.createElement("button");
button2.setAttribute("class", "action");
button2.setAttribute("id", "bt2");
button2.setAttribute("onclick", "character.actions('defense')");
button2.textContent = "Defense";
var button3 = document.createElement("button");
button3.setAttribute("class", "action");
button3.setAttribute("id", "btn3");
//button3.setAttribute("onclick", "character.actions('special')");
button3.addEventListener("click", change_to_spell_list);
button3.textContent = "Special";
function create_spells(spell_name) {
    var spell_variable = document.createElement("button");
    spell_variable.setAttribute("class", "spells");
    spell_variable.textContent = spell_name;
    return spell_variable;
}
var back = document.createElement("button");
back.addEventListener("click", change_back_to_controller);
back.textContent = "Back";
var spellList = [
    { name: "Fireball", button: create_spells("Fireball") },
    { name: "Shield", button: create_spells("Shield") },
    { name: "Grasp Heart", button: create_spells("Grasp Heart") },
];
function change_to_spell_list() {
    while (divControl.firstChild) {
        divControl.removeChild(divControl.firstChild);
    }
    //divControl.setAttribute("class", "SpellList");
    create_buttons_at_spell_list();
}
function change_back_to_controller() {
    while (divControl.firstChild) {
        divControl.removeChild(divControl.firstChild);
    }
    //divControl.setAttribute("class", "control");
    divControl.appendChild(button1);
    divControl.appendChild(button2);
    divControl.appendChild(button3);
}
function create_buttons_at_spell_list() {
    divControl.appendChild(back);
    spellList.forEach(function (spell) { return divControl.appendChild(spell.button); });
}
document.querySelector(".game-container").appendChild(divControl);
