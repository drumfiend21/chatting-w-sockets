/*
 * Serve JSON to our AngularJS client
 */
var socket = require('./socket.js');


exports.song = function (req, res) {
  if (user == null || user == 'undefined') {
    res.status(404);
  }

  socket.songs.push(req.params.song);

  res.status(200);
};