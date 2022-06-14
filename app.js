// starter nodejs
// const http = require('http');
const hostname = '51.75.241.128';
const port = 3002;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


// starter socket.io 


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//io

const { Server } = require("socket.io");
const io = new Server(server);

// SQL

/*var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jeux"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// formulaire d'inscription
// formulaire de connexion 
*/


app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
	console.log('on est passé dans le log de /')
});
/*
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});
app.get('/connexion', (req, res) => {
  res.sendFile(__dirname + '/connexion.html')
})
*/
//server.listen(3003, () => {
  //console.log('listening on *:3003');
//});
 server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });

//io

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    socket.join("FirstRoom");
    const clients = io.sockets.adapter.rooms.get('FirstRoom');
    console.log(clients);
  });
});

io.on('connection', (socket) => {
  console.log('click event');
  
  socket.on('join lobby', value => { // je comprends pas tt a fait pk on doit mettre un paramatres

    socket.join("clickedRoom");

    const clients = io.sockets.adapter.rooms.get('clickedRoom');
    console.log(clients);
    console.log(socket.id);
 })

let blue = 0;
let red = 0;
let trace = {};
	socket.on('blue', value => {
        	blue = blue + 1;
        	console.log('blue:' + blue);
		trace[blue] = socket.id+  ' '+ blue
		console.log(trace)
	}) 
	socket.on('red', value => {
        	red = red + 1;
        	console.log("red:" + red );
	})


})


// function joinLobby() {
// }

// to everyone and the sender

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});



// faut attribuer un room 
//const bcrypt = require('bcrypt')

// async function hashPassword(password) {
//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hash(password, salt)
//   console.log(hash)
// }

// inscription
/* io.on('connection', (socket) => {

  socket.on('inscription', (login, password, confirm_password) => {
    // SQL

    const bcrypt = require("bcrypt");

    async function hashPassword(password, password2) { // updated
      const salt = await bcrypt.genSalt(10) // este queça marche // estce que osef
      const hash = await bcrypt.hash(password, salt)

      const isSame = await bcrypt.compare(password2, hash) // updated
      console.log(isSame) // updated
      return (hash);

    }

    var result = hashPassword(password, confirm_password).then(hash => {
      console.log(hash);



      //    console.log(result);
      var sql = "INSERT INTO user (login, password) VALUES ('" + login + "', '" + hash + "')";

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        console.log(result);
      });
    })
  })
});

*/
// connexion
