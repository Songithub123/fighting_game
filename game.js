let p = document.createElement("p");
function narration(action) {
  p.textContent = "You " + action;
  (document.querySelector(".computer-narration")).appendChild(p);
}



let character = (function () {
  let stats = {
    atk: 100,
    def: 100,
    hp: 1000,
    mp: 100,
  };
  
  function actions (action) {
    switch (action){
      case "attack":
        narration(action);
        break;
      case "defense":
        narration(action);
        break;
      case "special":
        narration(action);
        break;
    };
  }
  return{
    stats: stats,
    actions: actions
  };
})();

const button1 = document.createElement('button');
button1.setAttribute('type', 'button');
button1.setAttribute('class', 'action');
button1.setAttribute('id', 'btn1');
button1.setAttribute('onclick', "character.actions('attack')");
button1.innerHTML = 'Attack';

const button2 = document.createElement('button');
button2.setAttribute('type', 'button');
button2.setAttribute('class', 'action');
button2.setAttribute('id', 'bt2');
button2.setAttribute('onclick', "character.actions('defense')");
button2.innerHTML = 'Defense';

const button3 = document.createElement('button');
button3.setAttribute('type', 'button');
button3.setAttribute('class', 'action');
button3.setAttribute('id', 'btn3');
button3.setAttribute('onclick', "character.actions('special')");
button3.innerHTML = 'Special';

const divControl = document.createElement('div');
divControl.setAttribute('class', 'control');

divControl.appendChild(button1);
divControl.appendChild(button2);
divControl.appendChild(button3);

const divBox = document.createElement('div');
divBox.setAttribute('class', 'box');

divBox.appendChild(divControl);

document.body.appendChild(divBox);


