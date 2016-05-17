'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    
    function updateScroll(){
        var element = document.getElementById("list");
        element.scrollTop = element.scrollHeight;
    }

    socket.on('send:time', function (data) {
      $scope.songs = data.songs;
      updateScroll();
    });

    socket.on('broadcast:watch', function (data) {
      $scope.watch = data.watch + 'is typing...';
    });    

    setInterval(function(){
      $scope.watch = null;
    }, 200)

  }).

  controller('MyCtrl1', function ($scope, socket) {
    $scope.song = {};

    $scope.submitPost=function(song){
      song.date = new Date().toString().slice(0,-11)
      socket.emit('send:song', song);
      $scope.clearForm();
    }

    $scope.$watch('song.song', function(newValue, oldValue){
        var watch = $scope.artist.toString();
        socket.emit('send:watch', {'watch':watch});
    })


    $scope.clearForm=function(){
      delete $scope.song.song;
    }
  }).
  
  controller('MyCtrl2', function ($scope, socket) {
    $scope.deletePost=function(song){
      socket.emit('delete:song', song);
    }
  });
