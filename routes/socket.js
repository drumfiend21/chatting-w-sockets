/*
 * Serve content over a socket
 */

var shortid = require('shortid');
var _ = require('lodash');

var songs = [{song: 'Let the Groove in',artist:'Justin Timberlake'}];

module.exports = function (socket) {
  socket.on('send:song', function(data){
    data.id = shortid.generate();
    songs.push(data)
  });

  socket.on('delete:song', function(data){
    songs = _.reject(songs, ['id', data.id]);
  });

  socket.on('send:watch', function(data){
    data.watch = data.watch.toString();
    socket.emit('broadcast:watch', data)
  });

  setInterval(function () {
    socket.emit('send:time', {
      songs: songs
    });
  }, 1000);
};

module.exports.songs = songs;