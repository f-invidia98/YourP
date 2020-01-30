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

var testoACASO;


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
    prova_due(database);
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



  prova_due(database);

}




function mouseClicked() {

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


  var json = {
    testo: "ciaociao",
    top: "" + mouseX,
    left: "" + mouseY
  };




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


  prova_due(database);
  database = loadJSON("DB.json");
  setTimeout(function() {
    prova_due(database);
  }, 100);


  // fetch('/api', options);








}




function prova_due(database) {
  for (var i = 0; i < database.testi.length; i++) {
    currentText = database.testi[i].testo;
    currentPar = createDiv(currentText);
    currentPar.position(database.testi[i].top, database.testi[i].left);

  }
};
function draw() {






}
