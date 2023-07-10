let character = (function () {
  let stats = {
    atk: 100,
    def: 100,
    hp: 1000,
    mp: 100,
  };
  function handleCLick(){
    console.log("idiot")
  }
  function actions (action) {
    switch (action){
      case "attack":
        console.log("You attacked");
        break;
      case "defense":
        console.log("You defense");
        break;
      case "special":
        console.log("You use special ability");
        break;
    };
  }
  return{
    stats: stats,
    actions: actions
  };
})();
