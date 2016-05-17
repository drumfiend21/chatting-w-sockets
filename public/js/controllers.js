'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.songs = data.songs;
      if(!$scope.mouse)$scope.updateScroll();
    });
    socket.on('broadcast:watch', function (data) {
      if(data.watch)$scope.watch = data.watch + ' is typing...';
    });    
    $scope.hoverIn = function(){
        $scope.mouse = true;
    };
    $scope.hoverOut = function(){
        $scope.mouse = false;
    };
    $scope.updateScroll = function(){
        var element = document.getElementById("list");
        element.scrollTop = element.scrollHeight;
    }
    //clear typer watch text
    setInterval(function(){
      $scope.watch = null;
    }, 800)

  }).

  controller('MyCtrl1', function ($scope, socket) {
    $scope.song = {};

    $scope.submitPost=function(song){
      if(!$scope.song.artist)return $scope.artistError=true;
      if(!$scope.song.song)return $scope.songError=true;
      song.date = new Date().toString().slice(0,-11)
      socket.emit('send:song', song);
      $scope.clearForm();
    }
    $scope.clearForm=function(){
      delete $scope.song.song;
      $scope.clearErrors();
    }
    $scope.enter=function(e){
      if (e.keyCode == 13)$scope.submitPost($scope.song);
    }
    $scope.$watch('song.song', function(newValue, oldValue){
        socket.emit('send:watch', {'watch':$scope.song.artist});
        $scope.clearErrors();
    })
    $scope.$watch('song.artist', function(newValue, oldValue){
        $scope.clearErrors();
    })
    $scope.clearErrors=function(){
      $scope.artistError = $scope.songError = false;
    }
  }).
  
  controller('MyCtrl2', function ($scope, socket) {
    $scope.deletePost=function(song){
      socket.emit('delete:song', song);
    }
  });
