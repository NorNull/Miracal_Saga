var express = require ('express');
var app = express ();
var server = require ('http').createServer (app);
var io = require ('socket.io') (server);
var mysql = require ('mysql');
var connection = mysql.createPool ({
  connectionLimit : 100,
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'miracal_saga',
  debug : false
});

app.use (express.static (__dirname + '/'));
app.set ('port', process.env.PORT || 3000);
app.get ('/', function (req, res) {
  res.send ('Server is running');
});

io.on ('connection', function (socket) {
  socket.on ('login', function (r_data) {
    pool.getConnection (function (err, con) {
      con.query ('SELECT * FROM user WHERE user_name = ?', r_data ['user_name'], function (err, rows, fields) {
        if (rows.length > 0) {
          socket.emit ('login', row [0]);
        } else {
          var error = {'message' : 'not found your id'}
          socket.emit ('login', error);
        }
      });
    });
  });

  socket.on ('register', function (r_data) {
    pool.getConnection (function (err, con) {
      con.query ('SELECT * FROM user WHERE user_name = ?', r_data ['user_name'], function (err, rows, fields) {
        if (rows.length > 0) {
          var error = {'message' : 'this id has already taken'}
          socket.emit ('register', error);
        } else {
          var message = {'message' : 'complete'};
          socket.emit ('register', message);
        }
      });
    });
  });

  socket.on ('insert_row', function (r_data) {
      pool.getConnection (function (err, con) {
        con.query ('INSERT INTO user SET ?', r_data, function (err, res) {

        });
      });
  });

  socket.on ('update_row', function (r_data) {
    pool.getConnection (function (err, con) {
      con.query ('UPDATE user WHERE user_name = ? SET ?', [{user_name : r_data ['user_name']}, r_data], function (err, res) {

      });
    });
  });

  socket.on ('delete_row', function (r_data) {

  });
}

server.listen (app.get ('port'), function () {
  console.log ("Server is running");
});
