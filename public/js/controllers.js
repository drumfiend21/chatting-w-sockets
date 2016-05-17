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
  }).

  controller('MyCtrl1', function ($scope, socket) {
    $scope.song = {};

    $scope.submitPost=function(song){
      socket.emit('send:song', song);
      $scope.clearForm();
    }


    $scope.clearForm=function(){
      $scope.song={};
    }
  }).
  
  controller('MyCtrl2', function ($scope, socket) {
    $scope.deletePost=function(song){
      socket.emit('delete:song', song);
    }
  });
