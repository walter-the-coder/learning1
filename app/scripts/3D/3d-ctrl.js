'use strict';

angular.module('stylingMaler')
  .controller('3DCtrl', function ($scope, $timeout) {
  	var menu3D = angular.element('#menu3D');

  	$scope.resetClass = function(){
  		menu3D.removeClass();
  	};
  	$scope.popMenu = function(){
  		$scope.resetClass();
  		menu3D.addClass('popMenu');

      angular.element('.menu3D_plate').addClass('popShadow');

      $timeout(function(){
        angular.element('.menu3D_plate').removeClass('popShadow');
      }, 100);
  	};
  	$scope.popText = function(){
  		$scope.resetClass();
  		menu3D.addClass('popText');

      $timeout(function(){
        angular.element('.menu3D_plate').addClass('popShadowReturn');
      }, 100);

      $timeout(function(){
        angular.element('.menu3D_plate').removeClass('popShadowReturn');
      }, 900);
  	};
  });