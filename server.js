// load express library

var express = require('express');


// create the app
var app = express();
// define the port where client files will be provided
var port = process.env.PORT || 3000;
// start to listen to that port
var server = app.listen(port);
// provide static access to the files
// in the "public" folder
app.use(express.static('public'));
app.use(express.json());






// load socket library
var socket = require('socket.io');
// create a socket connection
var io = socket(server);
// define which function should be called
// when a new connection is opened from client
io.on('connection', newConnection);
// callback function: the paramenter (in this case socket)
// will contain all the information on the new connection
function newConnection(socket) {
  //when a new connection is created, print its id
  console.log('socket:', socket.id);

  //define what to do on different kind of messages
  socket.on('options', jsonUpdate);

  function jsonUpdate(request) {
    //console.log(request.body);
    var testo = request.body;
    var fs = require('fs')
    //console.log(testo)


    fs.readFile('./public/DB.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          //now it an object
          //add some data
          //convert it back to json
          obj = JSON.parse(data);
          obj.testi.push(testo)
          json = JSON.stringify(obj, null, 2);
          //console.log(json)
          fs.writeFile('./public/DB.json', json, finished);

          function finished() {
						socket.emit('database', request);
						socket.on('database', function(database) {
						console.log(database);
					});
          } // write it back

          //console.log(data);
        }
      });

    //   app.post('/api',(request,response)=>{
    //   	console.log(request.body);
    //   	var testo = request.body;
    //   	var fs = require('fs')
    //   	console.log(testo)
		//
    //   	fs.readFile('DB.json', 'utf8', function readFileCallback(err, data){
    //        if (err){
    //            console.log(err);
    //        } else {
    //         //now it an object
    //   		 //add some data
    //        //convert it back to json
    //   		 obj = JSON.parse(data);
    //   		 obj.testi.push(testo)
    //   		 json = JSON.stringify(obj,null,2);
    //   		 console.log(json)
    //        fs.writeFile('DB.json', json, finished);
		//
    //   		 function finished(){
    //   			 console.log(json)
    //   		 } // write it back
    //    }});
		//
		//
		//
    // })
	}



}
