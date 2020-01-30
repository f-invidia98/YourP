var container; //div globale
var tile;
var tileDim = 1920; //grandezza tile
var tileNum = 50; //numero tile per lato
var tileSet = []; //array di tile
var texts; //jsonfile
var currentText; //testo in json
var currentPar; //div json
var socket;
var database;
var drag;
var testoACASO;
var json;


//  texts = $.getJSON("/public/DB.json", function(texts) {
//     console.log(texts); // this will show the info it in firebug console
// });
function preload() {
  // database = loadJSON("DB.json");
  // console.log(database)
  database = loadJSON("DB.json");
}




function setup() {


  noCanvas();

  socket = io();

  socket.on('database', function() {
    database = loadJSON("DB.json");
    setTimeout(function(){prova_due(database);}, 500);
    console.log("bella");
  });


  //crea il container
  container = createElement("section");
  container.id("container")
  container.style("width", tileDim * tileNum + "px")
  container.style("height", tileDim * tileNum + "px")
  container.style("border", "1px solid black")


  //crea i tile
  for (var j = 0; j < tileNum; j++) {
    for (var i = 0; i < tileNum; i++) {
      tile = createDiv("t" + ((i + 1) + (j * tileNum)));
      tileSet[(i + 1) + (j * tileNum)] = tile;
      tile.id("t" + ((i + 1) + (j * tileNum)))
      tile.position(i * tileDim, j * tileDim)
      tile.style("width", tileDim + "px")
      tile.style("height", tileDim + "px")
      tile.style("border", "1px solid black")
    }
  }

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what is your name?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);

  prova_tre(database);

}

function greet() {

  var name = input.value();
  greeting.html('hello ' + name + '!');

  json = {
    testo: name
  }
  setTimeout(function(){drag = true;},100);

  // input.value('');

}


function mouseClicked() {
  json = {
    testo: json.testo,
    top: "" + mouseX,
    left: "" + mouseY
  };
if (drag == true) {

  ////////////// importante per dopo
  //scroll function

  // scrollTo(
  // {
  // top: tileSet[1920].y,
  // left:tileSet[1920].x,
  // behavior: 'smooth'
  // });
  //////////////

  // testoACASO = {
  //   testi: []
  // }
  // testoACASO.testi.push({
  //   testo: "ciaociao",
  //   top: mouseX,
  //   left: mouseY
  // })







  // window.open('?nome='+json, '_self')

  // JSON.stringify(json,"\t")
  // var myJsObject = JSON.parse(json);


  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  }

  socket.emit('options', options);
  //console.log(options.body)


  // prova_due(database);
  database = loadJSON("DB.json");
  setTimeout(function() {
    prova_due(database);
  }, 100);


  // fetch('/api', options);






drag = true;
}
}




function prova_due(database) {
    var ultimo = database.testi.length-1;
    currentText = database.testi[ultimo].testo;
    textSize(100);
    currentPar = createDiv(currentText);
    currentPar.position(database.testi[ultimo].top, database.testi[ultimo].left);


};

function prova_tre(database) {
  for (var i = 0; i < database.testi.length; i++) {
    currentText = database.testi[i].testo;
    currentPar = createDiv(currentText);
    currentPar.position(database.testi[i].top, database.testi[i].left);

  }
};
function draw() {






}
