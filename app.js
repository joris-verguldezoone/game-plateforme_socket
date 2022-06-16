// starter nodejs
// const http = require('http');
const hostname = "127.0.0.1"
// const hostname = '51.75.241.128';
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


var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
const http = require('http');
const { join } = require('path');
const server = http.createServer(app);
//io

const { Server } = require("socket.io");
const { on } = require('stream');
const io = new Server(server);

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204 // no content
}


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

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   console.log('ici')
//   console.log(socket.id);
//   console.log(socket.data)
//   console.log('ici')
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     // socket.join("FirstRoom");
//     const clients = io.sockets.adapter.rooms.get('FirstRoom');
//     console.log(clients);
//   });
// });

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", [response, socket.id]);
};

let interval;


io.on("connection", (socket) => {
  console.log(socket.id, "user?");

  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  // socket.on("create_lobby", value => {
  //   console.log(value, "value du join lobby, qu y a t il dedans?")
  //   socket.join(value[6]);
  //   console.log(socket.rooms, " : rooms !")

  //   const clients = io.sockets.adapter.rooms.get(value[6]);
  //   console.log(clients.size, "client size");
  //   console.log(socket.id);
  // })
  socket.on("join_lobby", value => {
    var clients = io.sockets.adapter.rooms.get(value[0][0]);
    console.log('client debut', clients, 'client debut')
    console.log(socket.id, 'socket.id :)')
    const rooms = io.of("/").adapter.rooms;
    const sids = io.of("/").adapter.sids;
    // console.log(rooms, " rooms")
    // console.log(sids, " sids")

    if (clients != undefined) { // la partie n"a pas été créée 
      console.log(typeof (value[0][2]), typeof (clients.size), typeof (value[0][3]))
      console.log(clients.size <= value[0][3], 'clients.size <= value[0][3]')
      if (clients.size < value[0][3]) {
        socket.emit("lobby_join_200", 'gg wp')
        console.log(socket.id)
        console.log("Success")
        clients = io.sockets.adapter.rooms.get(value[0][0]);
        console.log("clients final", clients, "clients final")

      }
      else {
        console.log("lobby is full you can't join")
      }
    }
    else {
      console.log("partie non créée")
    }


    // console.log(clients)
    // console.log(value, "value join lobby")
  })
  socket.on("join_lobby_validate", data => { // si a partie a été créer
    console.log(data, 'kesako')
    // if (clients == undefined) {
    console.log(socket.id, ' oui deux :() ))')
    socket.join(data);
    console.log(socket.join(data))
    console.log(data + ":nom room")
    var clients = io.sockets.adapter.rooms.get(data);
    console.log("client validate", clients, "client validate")
    // }
    // socket.join(data)
    console.log("final success")
    const rooms = io.of("/").adapter.rooms;
    console.log(rooms)

  })
});





// console.log(socket, " socket")
// je comprends pas tt a fait pk on doit mettre un paramatres


// let blue = 0;
// let red = 0;
// let trace = {};
// socket.on('blue', value => {
//   blue = blue + 1;
//   console.log('blue:' + blue);
//   trace[blue] = socket.id + ' ' + blue
//   console.log(trace)
// })
// socket.on('red', value => {
//   red = red + 1;
//   console.log("red:" + red);
// })


// })


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
