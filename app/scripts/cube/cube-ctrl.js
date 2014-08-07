'use strict';

angular.module('stylingMaler')
  .controller('CubeCtrl', function ($scope) {
  	var cube = angular.element('#cube');

  	$scope.resetClass = function(){
  		cube.removeClass();
  	};

  	$scope.rotateToFront = function(){
  		$scope.resetClass();
  		cube.addClass('show-front');
  	};
  	$scope.rotateToBack = function(){
  		$scope.resetClass();
  		cube.addClass('show-back');
  	};
  	$scope.rotateToLeft = function(){
  		$scope.resetClass();
  		cube.addClass('show-left');
  	};
  	$scope.rotateToRight = function(){
  		$scope.resetClass();
  		cube.addClass('show-right');
  	};
  	$scope.rotateToTop = function(){
  		$scope.resetClass();
  		cube.addClass('show-top');
  	};
  	$scope.rotateToBottom = function(){
  		$scope.resetClass();
  		cube.addClass('show-bottom');
  	};
  });