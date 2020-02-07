var container; //div globale
var tile;
var tileDim = 1920; //grandezza tile
var tileNum = 5; //numero tile per lato
var tileSet = []; //array di tile
var texts; //jsonfile
var currentText; //testo in json
var currentPar;
var currentText2; //testo in json
var currentPar2; //div json
var socket;
var database;
var drag;
var testoACASO;
var json;
var italicCheck = false;
var sizeVar;
var name;
var check;
var hexColor = "ffffff";
var rotateVar = 0;
var trackingVar = 0;
var interlineaVar = 0;
var pesoVar = "500"


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
    setTimeout(function() {
      prova_due(database);
    }, 500);
    console.log("bella");
  });


  //crea il container
  container = createElement("section");
  container.id("container")
  container.style("width", tileDim * tileNum + "px")
  container.style("height", tileDim * tileNum + "px")
  container.style("background-color", "black")
  container.style("border", "1px solid black")


  //crea i tile
  for (var j = 0; j < tileNum; j++) {
    for (var i = 0; i < tileNum; i++) {
      tile = createDiv("t" + ((i + 1) + (j * tileNum)));
      tile.style("color","white")
      tileSet[(i + 1) + (j * tileNum)] = tile;
      tile.id("t" + ((i + 1) + (j * tileNum)))
      tile.position(i * tileDim, j * tileDim)
      tile.style("width", tileDim + "px")
      tile.style("height", tileDim + "px")
      tile.style("border", "1px solid white")
    }
  }

  input = createElement('textarea');
  input.position(20, 20);

  button = createButton('submit');
  button.position(input.x + input.width, 20);
  button.mousePressed(greet);

  button2 = createButton('italic');

  button2.position(input.x + input.width + button.width, 20);
  button2.mousePressed(italicFunction);

  button3 = createP();
  button3.position(input.x + input.width + button.width*2, 20);
  button3.id("colorPick")
    $("#colorPick").ColorPicker({flat: true,onChange: function (hsb, hex, rgb) {
		$('#colorSelector div').css('backgroundColor', '#' + hex);
    hexColor = hex;
	}});

  sizeInput = createInput('size', 'range');
  sizeInput.position("100", "100")
  sizeInput.input(sizeFunction);

  rotateInput = createInput('rotate', 'range');
  rotateInput.position("100", "200")
  rotateInput.input(rotateFunction);

  interlineaInput = createInput('interlinea', 'range');
  interlineaInput.position("100", "300")
  interlineaInput.input(interlineaFunction);

  trackingInput = createInput('tracking', 'range');
  trackingInput.position("100", "400")
  trackingInput.input(trackingFunction);

  lightInput = createButton('Light');
  lightInput.position("100", "500");
  lightInput.mousePressed(lightFunction);
  normalInput = createButton('Normal');
  normalInput.position("200", "500");
  normalInput.mousePressed(normalFunction);
  boldInput = createButton('Bold');
  boldInput.position("300", "500");
  boldInput.mousePressed(boldFunction);



  // greeting = createElement('h2', 'what is your name?');
  // greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);

  prova_tre(database);

}

function greet() {

  name = input.value();
  check = true;
  // greeting.html('hello ' + name + '!');

  json = {
    testo: name
  }
  setTimeout(function() {
    drag = true;
  }, 100);

  preview();

  // input.value('');

}

function italicFunction() {
  if (italicCheck == true) {
    italicCheck = false;

  } else if (italicCheck == false) {
    italicCheck = true;

  }
}


function sizeFunction() {
  sizeVar = sizeInput.value();
}

function rotateFunction() {
  rotateVar = rotateInput.value();
  rotateVar = map(rotateVar, 0, 100, 0, 360)
}

function interlineaFunction() {
  interlineaVar = interlineaInput.value();
  interlineaVar = map(interlineaVar, 0, 100, 0, 25);

}

function trackingFunction() {
  trackingVar = trackingInput.value();
  trackingVar = map(trackingVar, 0, 100, -50, 50)

}

function lightFunction() {
  pesoVar = "100";

}

function normalFunction() {
  pesoVar = "500";

}

function boldFunction() {
  pesoVar = "700";

}


function keyPressed() {
  if (keyCode == 18) {
    json = {
      testo: json.testo,
      top: "" + (mouseX + scrollX),
      left: "" + (mouseY + scrollY),
      peso: pesoVar,
      italic: italicCheck,
      colore: "#" + hexColor,
      rotazione: rotateVar,
      scale: sizeVar / 10,
      interlinea: interlineaVar,
      tracking: trackingVar

    }


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


  };
  if (keyCode == 8) {
    check = false;
  };
}

function preview() {

  currentText2 = json.testo;
  textSize(100);
  currentPar2 = createDiv(currentText2);
  currentPar2.style("width", "fit-content")
  currentPar2.style("font-family", "Helvetica")
  currentPar2.style("letter-spacing", trackingVar + "px")
  currentPar2.style("line-height", interlineaVar + "px")
  currentPar2.style("color", "#" + hexColor);
  currentPar2.style("transform", "scale(" + sizeVar / 10 + ") rotate(" + rotateVar + "deg)");
currentPar2.style("font-weight", pesoVar);
  if (italicCheck == true) {
    currentPar2.style("font-style", "italic");
  } else {
    currentPar2.style("font-style", "normal");
  }

}




function prova_due(database) {
  var ultimo = database.testi.length - 1;
  currentText = database.testi[ultimo].testo;
  textSize(100);
  currentPar = createDiv(currentText);
  currentPar.position(database.testi[ultimo].top, database.testi[ultimo].left);
  currentPar.style("width", "fit-content")
  currentPar.style("font-family", "Helvetica")
  currentPar.style("letter-spacing", database.testi[ultimo].tracking + "px")
  currentPar.style("line-height", database.testi[ultimo].interlinea + "px")
  currentPar.style("color", database.testi[ultimo].colore);
  currentPar.style("transform", "scale(" + database.testi[ultimo].scale + ") rotate(" + database.testi[ultimo].rotazione + "deg)");
  currentPar.style("font-weight", database.testi[ultimo].peso);
  if (database.testi[ultimo].italic == true) {
    currentPar.style("font-style", "italic");
  } else {
    currentPar.style("font-style", "normal");
  }


};

function prova_tre(database) {
  for (var i = 0; i < database.testi.length; i++) {
    currentText = database.testi[i].testo;
    currentPar = createDiv(currentText);
    currentPar.position(database.testi[i].top, database.testi[i].left);
    currentPar.style("width", "fit-content")
    currentPar.style("font-family", "Helvetica")
    currentPar.style("letter-spacing", database.testi[i].tracking + "px")
    currentPar.style("line-height", database.testi[i].interlinea + "px")
    currentPar.style("color", database.testi[i].colore);
    currentPar.style("transform", "scale(" + database.testi[i].scale + ") rotate(" + database.testi[i].rotazione + "deg)");
    // currentPar.style("transform", "rotate(30deg)")
    currentPar.style("font-weight", database.testi[i].peso);
    if (database.testi[i].italic == true) {
      currentPar.style("font-style", "italic");
    } else {
      currentPar.style("font-style", "normal");
    }



  }
};

// console.log($(".colorpicker_hex > input").value());


function draw() {

if (check == true) {
  currentPar2.style("transform", "scale(" + sizeVar / 10 + ") rotate(" + rotateVar + "deg)");
  currentPar2.position(mouseX + scrollX, mouseY + scrollY);
} else if(check == false){
  currentPar2.style("display","none")
}





}
