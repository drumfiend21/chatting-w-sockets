'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.songs = data.songs;
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
