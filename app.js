var express = require("express");
var app = express();

//necesitamos estas dos dependencias para poder sobreescribir las rutas a los archivos en el front
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

const port = 3000;
const host = 'localhost';
const user = 'mzrdeveloper';
const pass = '12345678';
const bbddName = 'chatbbdd';

//conexion a la BBDD
var connection = mysql.createConnection({
  host     : host,
  user     : user,
  password : pass,
  database : bbddName
});
connection.connect();
//esta constante nos permite utilizar las funciones de path
const path = require('path');
//sirve para almacenar en '/static' la ruta de __dirname
app.use('/static', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// RUTAS INICIO ----------------------------------------------------------------------------------------

/*//cuanddo valla a / res envia un archivo index
app.get('/', function(req, res){
  res.sendFile(__dirname+ '/index.html');
});*/

//cuanddo valla a /login res envia un archivo login
app.get('/', function(req, res){
  res.sendFile(__dirname+ '/login.html');
});

//rechazara la conexion y redirigirá a login a menos que tenga la cooky de identificacion
app.get('/chat', function(req, res){

});

//aqui llamará el formulario de login
app.post('/chat', function(req, res){
  console.log("llamando a valida usuario");
  var userName = req.param('userName');
  var userPass = req.param('userPass');
  //deberiams meter una funcion con seguridad para evitar sql injection
  
  connection.query("SELECT us.NICK_USU from usuarios us where us.NAME_USU = '"+userName+"' and us.PASS_USU = '"+userPass+"'", 
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      if (results.length > 1 || results.length == 0){
        res.sendFile(__dirname+ '/login.html');
      }else{
        //deberiamos generar una cooky con identificador
        res.sendFile(__dirname+ '/index.html');
      }
      //connection.end();
    });
});
// RUTAS FIN ---------------------------------------------------------------------------------------------


// IO INICIO ---------------------------------------------------------------------------------------------

//cada vez que se conecta un usuario abre un socket
io.on('connection', function(socket){
	//notifica por consola
  console.log('a user connected');
  	//cuando desconecte notifica por consola
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  	//cuando rciba mensaje lo emite al resto de sockets abiertos
  socket.on('chat message', function(msg){
    //console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// IO FIN ---------------------------------------------------------------------------------------------

//servidor arrancado en el puerto port
http.listen(port, function(){
  console.log('listening on *:'+port);
});