# YourPublicToilet.com
![COVER](Images/COVER.png)

**YOURPUBLICTOILET.COM** is a university project developed and realized with p5.js library in Creative Coding class, taught by Mauri Michele and Andrea Benedetti at Politecnico di Milano.

The main purpose of our project is to create a virtual common space where thoughts could be expressed indiscriminately through typography.

## TABLE OF CONTENTS

#### 1. [AESTHETIC RESEARCH](#1)	                                                              
  1.	[How we conceived the idea](#1.1)
  2.	[Why the toilet?](#1.2)

#### 2. [CONCEPT](#2)
  1. [How does it work?](#2.1)
  2. [What we expect](#2.2)

#### 3. [DEVELOPMENT](#3)
  1. [Interface](#3.1)
  2. [Lobby](#3.2)
  3. [Toilet system](#3.3)
  4. [Tile search](#3.4)
  5. [Geolocaction](#3.5)
  6. [Tools](#3.6)

#### 4. [ISSUES AND IMPROVEMENTS](#4)
  1. [JSON/placement](#4.1)
  2. [HTML](#4.2)

#### 5. [THE TEAM](#5)


## 1. <a name="1">AESTHETIC AND CONCEPT RESEARCH </a>
![CONCEPT](Images/LOGO.png)

### <a name="1.1">1.1 How we conceived the idea </a>

Our passion in typography drove us from the beginning to think about a place where we could express ourselves through words. Pure concepts freed of their earthly burden. Clear words that float in an immense, navigable, dark space.
We had the vision.
Next we thought about how close this concept was from the visualization of Plato's realm of ideas: We were so excited to give
the Hyperuranion a shape.
But apparently flying high served to fall back to the ground; to come up with something that makes sense here, between us, in our daily lives.
We slowly abandoned the idea of visualizing this greater plane and shifted the gaze to where people truly express themselves - literally - in the most intimate, direct, primordial way.
We went back down to the public toilet.


### <a name="1.2">1.2 Why the toilet? </a>

Each toilet is a world of its own, reflecting the most direct thoughts of those who are using it.
In addition to the obvious vulgarities, public toilets are signed. There are stickers for bands and collectives. Happenings and hidden events are communicated. We exchange impressions, insults, cues.
We continue each other drawings.
It is a space full of instant words, of raw, animalistic, spontaneous, dreamy, festive, quarrelsome, chaotic, loving ideas. 

A collective space but full of individual expression.
As much as online places are.


## <a name="2">2. CONCEPT </a>
![CONCEPT](Images/CONCEPT.png)

### <a name="2.1">2.1 How does it work? </a>

* There are several Toilets, each one represent a geographical area (a city, an event...)
* Each toilet is a very large HTML page, full of writings.
* Each toilet is composed of a "tile grid" (with go-to functions!)
* You can access every toilet from everywhere.
* You can write only on the toilet on you current location.
* Walls are not completely zoomable out, forcing you to explore.
* Write your text into the editor, move it around the toilet and place it.
* One font, but customizable in color, rotation, size, letters and line spacing.



### <a name="2.2">2.2 What could happen </a>

* Events communication
* Collective poetry
* Collective typographic drawing
* Public chat
* Search for inspiration
* Self expression
* Typographic Ads (our secret back-to-the-roots dream!)
* Contact making
* Other unexpected internet phenomena



## <a name="3">3. DEVELOPMENT </a>

### <a name="3.1">3.1 Interface </a>

The interface is linear and minimal, essential, white and black. From the homepage you can access the lobby, the waiting room before the toilets. From the lobby you can select the toilets by scrolling through them and if a toilet in your zone is not yet present you can request one thanks to the Request button. You click a door, you enter the toilet. Easy Peasy.
If you are located into the area represented by the toilet, the editor mode opens with which you can edit your writings.
Click on the preview to attach your writing to your cursor, tweak the typographic parameters and see live results.
Now you are ready to go to the spot you like and click ALT to place your text.
If you want to continue a friend's text at certain position in the toilet you can use the tile coordinate system. Change the number on the label in your left and in a sec you are there!



### <a name="3.2">3.2 Lobby Doors Upload </a>
```p5.js

function preload() {
  // allaccia il database dei luoghi
  databaseToilet = loadJSON("toilets/toilets.json");
  
  // allaccia il database delle richieste
  richieste = loadJSON("richieste.json");

function loadToilets() {

  var toiletName = [];

  // itera tutti i campi del database
  for (var i = 0; i <= databaseToilet.lista_comuni.length; i++) {
    // all inside toilet_container
    var toiletContainer = select('#toilet_container');

    // toilet fantoccio (crea una finta toilet finale per bloccare lo scroll)
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

    }
  }

  $("#toiletNumber").html(databaseToilet.lista_comuni.length + " toilets accessible");

}
}

```

### <a name="3.3">3.3 Toilet system </a>

### <a name="3.4">3.4 Tile search </a>

### <a name="3.5">3.5 Geolocation </a>

### <a name="3.6">3.6 Tools </a>


## <a name="4">4. ISSUES & IMPROVEMENTS </a>

### <a name="4.1">4.1 JSON/placement </a>
The system is based on a JSON database which is rewritten at each PLACEMENT.

-> We could use database service services such as FIREBASE which guarantee a smooth upload without continuous file rewriting.


### <a name="4.2">4.2 HTML </a>
A very large page is created with many div elements and this increases the weight of the page.

-> Do not use an HTML page but create a custom model with a behavior similar to Google Maps.


