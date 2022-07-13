// starter nodejs
// const http = require('http');
const hostname = "127.0.0.1"
// const hostname = '51.75.241.128';
const port = 3003;

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
const axios = require('axios');
const { emit } = require('process');

class User { // a n'utilise que dans le lobby sinon on peut pas push le socket et le payload a la connection 
  constructor(socket, payload) {
    this.socket = socket;
    this.payload = payload;
  }
  addUser(user) { }
}

class Lobby {
  constructor(socket, nomLobby, minPlayer, maxPlayer, slots) {
    this.socket = socket;
    this.nomLobby = nomLobby;
    this.minPlayer = minPlayer;
    this.maxPlayer = maxPlayer;
    this.slots = slots;
  }
  setNomLobby(nomLobby) {
    this.nomLobby = nomLobby;
  }
  getNomLobby() {
    return this.nomLobby
  }

  getMinPlayer() {
    return this.minPlayer
  }
  getMaxPlayer() {
    return this.maxPlayer
  }

  setMaxPlayer(maxPlayer) {
    this.maxPlayer = maxPlayer
  }
  setMinPlayer(minPlayer) {
    this.minPlayer = minPlayer
  }
  setSlots(slots) {
    this.slots = slots
  }

  getNumberOfPlayer = (nbMaxPlayer) => {
    let playerInSlot = []
    console.log(nbMaxPlayer, 'nbMaxPlayer in func')
    for (let i = 1; i <= nbMaxPlayer; i++) {
      console.log("gRRRRRRRRRrrrrRrr")
      playerInSlot.push({})
    }
    console.log(playerInSlot, 'PLAYER IN SLOT')
    console.log(playerInSlot.length)

    return playerInSlot

  }

  joinLobbyAccess(data) {

    console.log(this.socket.id, ' oui deux :() ))')
    this.socket.join(data);

    console.log(data + ":nom room")
    var clients = io.sockets.adapter.rooms.get(data[0]);
    console.log("client validate", clients, "client validate")

    if (this.maxPlayer == 0) {
      this.setMaxPlayer(this.getNumberOfPlayer(data[1]))
    }

    console.log("final success")
    const rooms = io.of("/").adapter.rooms;
    console.log(rooms)
    return this.maxPlayer

  }

}

const createLobby = (lobbyValues, socket) => {
  var clients = io.sockets.adapter.rooms.get(lobbyValues[0][0]);
  console.log('client debut', clients, 'client debut')
  console.log(socket.id, 'socket.id :)')
  const rooms = io.of("/").adapter.rooms;
  const sids = io.of("/").adapter.sids;
  // console.log(rooms, " rooms")   // console.log(sids, " sids")

  if (clients != undefined) { // la partie n"a pas été créée 
    console.log(typeof (lobbyValues[0][2]), typeof (clients.size), typeof (lobbyValues[0][3]))
    console.log(clients.size <= lobbyValues[0][3], 'clients.size <= lobbyValues[0][3]')
    if (clients.size < lobbyValues[0][3]) {
      socket.emit("lobby_join_200", lobbyValues[0][3]) // on set nbMaxPlayer mais ça sert a rien
      console.log(socket.id)
      clients = io.sockets.adapter.rooms.get(lobbyValues[0][0]);
      console.log("clients final", clients, "clients final")
      return "Status :200";

    }
    else {
      return ("lobby is full you can't join")
    }
  }
  else {
    return ("partie non créée")
  }
}

const getAny_DeleteByName = (urlRequest) => {
  axios.get('http://51.75.241.128:3001/' + urlRequest)
    .then((res) => {

      if (res.length === 0) {
        console.log(res.data[0].id)
        deleteAny("lobby/" + res.data[0].id)
      }

    }).catch((err) => {
      console.error(err);
    });
}

const getAny = async (urlRequest) => {

  axios.get('http://51.75.241.128:3001/' + urlRequest)
    .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log(`data: ${res.data}`);
      console.log('http://51.75.241.128:3001/' + urlRequest)
      return res.data

    }).catch((err) => {
      console.error(err);
    });
}
const deleteAny = (urlRequest) => {
  axios.delete('http://51.75.241.128:3001/' + urlRequest)
    .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log(`data: ${res.data}`);
      console.log('http://51.75.241.128:3001/' + urlRequest)
    }).catch((err) => {
      console.error(err);
    });

}
// getAny("lobby/find")

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", [response, socket.id]);
};

let interval;

let lobbySlotsState = [];


io.on("connection", (socket) => {
  console.log(socket.id, "user?");

  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);


  socket.on("disconnecting", async () => {
    console.log('dscionnection')
    console.log(socket.rooms, "the Set contains at least the socket ID"); // the Set contains at least the socket ID
    rooms = io.of("/").adapter.rooms;
    console.log(rooms, ' stp rooms dis qqchose')
  });


  socket.on("disconnect", () => {
    // console.log(LobbyObj.nomLobby, "LobbyObj.nomLobby")
    // let nomLobby = LobbyObj.getNomLobby();
    // var clients = io.sockets.adapter.rooms.get(LobbyObj.nomLobby);
    // console.log(clients)
    // console.log(nomLobby)
    // if (clients == undefined) {
    //   console.log("client on est passé dedans y'a plus qu'a delete")
    //   getAny_DeleteByName('lobby/find?nomLobby=' + nomLobby) // relier a une class user qui effacera les lobby a la déconnection

    // }
    // else {
    //   console.log("else ", clients, 'il doit rester des socket dans le lobby')
    // }

    console.log("Client disconnected");
    clearInterval(interval);
  });

  // lobby


  socket.on("join_lobby", value => {

    createLobby(value, socket) // est ce que le lobby existe ? renommer fonction


  })
  socket.on("join_lobby_validate", data => { // si a partie a été créer // la data doit etre le payload comme ça pas besoin de class user  //nomlobby + nbPlayer MAx
    console.log('join_lobby_validate data : ', data)
    let clients = io.sockets.adapter.rooms.get(data[0]);

    console.log(clients, 'combien y a til de gens')
    if (clients == undefined) {
      const LobbyObj = new Lobby(socket, 'toDefine', 0, 0, []);

      let result = LobbyObj.joinLobbyAccess(data)
      console.log("LobbyObj.joinLobbyAccess(data) : ", result)
      console.log(data, 'data')
      LobbyObj.setNomLobby(data[0])
      console.log('join_lobby_validate LobbyObj.setNomLobby(data) : ', LobbyObj.nomLobby)
      lobbySlotsState = result;
      console.log('lobbySlotsState : in creation ', lobbySlotsState)
      socket.emit("lobby_slots_init", result) // result c'est la totalité des slots disponibles
      LobbyObj.setSlots(result) // inutile?
      console.log("LobbyObj.setSlots(result) : ", LobbyObj.slots)
    }
    else {
      console.log('lobbySlotsState : second player ', lobbySlotsState)
      socket.join(data[0]);
      socket.emit("lobby_slots_init", lobbySlotsState) // result c'est la totalité des slots disponibles
      console.log('other user joined successfully')
      const rooms = io.of("/").adapter.rooms;
      console.log(rooms)

    }
  })
  socket.on('lobby_slot_update', slots => {
    lobbySlotsState = slots
    console.log("lobby_slot_update : ", lobbySlotsState)
    socket.emit("lobby_slots_init", lobbySlotsState) // result c'est la totalité des slots disponibles


  })
  // socket.on('changeLobbySlots', (allSlots) => {
  //   LobbyObj.slots = allSlots
  //   console.log("LobbyObj.slots : ", LobbyObj.slots)
  //   socket.to(allSlots[0]).emit("broadCast_slots", (allSlots[1])) // broadCast
  // })
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

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });


// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });



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
