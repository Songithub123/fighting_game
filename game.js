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

