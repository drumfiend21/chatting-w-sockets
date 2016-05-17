/*
 * Serve content over a socket
 */

var shortid = require('shortid');
var _ = require('lodash');

var songs = [];

module.exports = function (socket) {
  socket.on('send:song', function(data){
    data.id = shortid.generate();
    songs.push(data)
  });

  socket.on('delete:song', function(data){
    songs = _.reject(songs, ['id', data.id]);
  });

  socket.on('send:watch', function(data){
    // if(data.watch) data.watch = data.watch.toString();
    socket.broadcast.emit('broadcast:watch', data)
  });

  setInterval(function () {
    socket.emit('send:time', {
      songs: songs
    });
  }, 1000);
};

module.exports.songs = songs;