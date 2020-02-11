// DATA

var databaseToilet;
var storeToiletText;



function preload() {
  // allaccia il database dei luoghi
  databaseToilet = loadJSON("toilets.json");
}



function loadToilets() {

  var toiletName = [];

  for (var i = 0; i <= databaseToilet.lista_comuni.length; i++) {
    // all inside toilet_container
    var toiletContainer = select('#toilet_container');

    // toilet fantoccio (crea una finta toilet finale per aiutare nello scroll)
    if (i == databaseToilet.lista_comuni.length) {
      var fakeletDiv = createDiv();
      fakeletDiv.id('t_final');
      toiletContainer.child('t_final');
    } else {

      // toilet div
      var toiletUrl = databaseToilet.lista_comuni[i].nome_url;
      toiletName.push(databaseToilet.lista_comuni[i].nome_comune);
      var toiletId = 't_' + toiletUrl;
      var toiletDiv = createDiv();
      toiletDiv.addClass('toilet_door');
      toiletDiv.id(toiletId);
      toiletDiv.attribute("data-toilet_name",toiletName[i]);
      toiletDiv.attribute("onmouseover","getToiletText(" + "'" + toiletName[i] + "'" + ")");
      toiletDiv.attribute("onmouseout","restoreToiletText()");

      var toiletImgDiv = createDiv();
      toiletImgDiv.class("toilet_image");
      toiletImgDiv.style("background-image","url('images/"+toiletUrl+".png')");


      // toiletDiv.style("background-image","url('images/"+toiletUrl+".png')");
      // toiletDiv.style("background-size","240px 420px");
      // var toiletGeoYes = createElement("p","YOU ARE HERE!");


      // creazione lista città
      var toiletElement = createElement("option",toiletName[i]);
      toiletElement.attribute("value",toiletName[i]);
      var selectLista = select('#listaCitta')
      selectLista.child(toiletElement);

      // $("#inputCitta").attr("onchange","toiletSearch()");

      // link
      var toiletLink = createElement("a");
      var getLink = "/toilets/" + toiletUrl + "/" + toiletUrl + ".html"; // costruzione stringa URL (pagine locate su /toilets)
      toiletLink.attribute("href", getLink);
      toiletLink.class("toilet_wrap");


      // toilet divs -> links -> toilet container
      toiletDiv.parent(toiletLink);
      toiletImgDiv.parent(toiletDiv);
      toiletContainer.child(toiletLink);

      // toiletDiv.mouseOver(function(){
      //
      //   console.log(toiletDiv.attribute("data-toilet_name"));
      //
      // });

    }
  }

  $("#toiletNumber").html(databaseToilet.lista_comuni.length + " toilets accessible");

}

function getToiletText(name) {
  storeToiletText = name.toUpperCase();
  // var toiletInput = select('#inputCitta');
  // toiletInput.attribute("value",name.toUpperCase());
  // console.log(name);
}

function getInputText(){
  // var toiletInput = select('#inputCitta');
  // storeToiletText = toiletInput.value();
  // console.log(storeToiletText);
}

function restoreToiletText(){
  storeToiletText = "YOUR";
}

function updateToiletText() {
  var toiletInput = select('#inputCitta');
  toiletInput.attribute("value", storeToiletText);
}



// SCROLL ARROWS
$("#left_arrow").click(scrollL);
$("#right_arrow").click(scrollR);


function scrollR() {
  getScroll = $("#toilet_container").scrollLeft();
  $("#toilet_container").scrollLeft(getScroll + 332);
  console.log(getScroll);
}

function scrollL() {
  getScroll = $("#toilet_container").scrollLeft();
  $("#toilet_container").scrollLeft(getScroll - 332);
  console.log(getScroll);
}


function setup() {

  noCanvas();

  // LOAD TOILETS
  loadToilets();

  // LOAD TOILET SEARCH
  //toiletSearch();

}

function draw() {

  getInputText();
  updateToiletText();

}
