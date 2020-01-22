var container;        //div globale
var tile;
var tileDim = 1920;   //grandezza tile
var tileNum = 50;     //numero tile per lato
var tileSet = [];     //array di tile
var texts;            //jsonfile
var currentText;      //testo in json
var currentPar;       //div json

var testoACASO;



function preload(){
  texts = loadJSON("DB.json");
}

function setup() {
  noCanvas();


  //crea il container
  container = createElement("section");
  container.id("container")
  container.style("width",tileDim*tileNum+"px")
  container.style("height",tileDim*tileNum+"px")
  container.style("border","1px solid black")


  //crea i tile
  for (var j = 0; j < tileNum; j++) {
    for (var i = 0; i < tileNum; i++) {
      tile = createDiv("t"+((i+1)+(j*tileNum)));
      tileSet[(i+1)+(j*tileNum)] = tile;
      tile.id("t"+((i+1)+(j*tileNum)))
      tile.position(i*tileDim,j*tileDim)
      tile.style("width",tileDim+"px")
      tile.style("height",tileDim+"px")
      tile.style("border","1px solid black")
    }
  }



  //load testi da json
  for (var i = 0; i < texts.testi.length; i++) {
    currentText = texts.testi[i].testo;
    currentPar = createDiv(currentText);
    currentPar.position(texts.testi[i].top, texts.testi[i].left);

  }
}



function mouseClicked(){

  ////////////// importante per dopo
  //scroll function

  // scrollTo(
  // {
  // top: tileSet[1920].y,
  // left:tileSet[1920].x,
  // behavior: 'smooth'
  // });
  //////////////

  testoACASO = {
    testi:[]
  }
  testoACASO.testi.push({testo: "ciaociao", top:mouseX, left:mouseY})

  var json = JSON.stringify(testoACASO);
  var fs = require('fs');
  fs.writeFile('DB.json', json, 'utf8');

}

function draw() {





}
