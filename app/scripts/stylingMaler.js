'use strict';

angular.module('stylingMaler', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/cube', {
        templateUrl: 'partials/cube.html',
        controller: 'CubeCtrl'
      })
      .when('/3D', {
        templateUrl: 'partials/3D.html',
        controller: '3DCtrl'
      })
      .when('/skrollr', {
        templateUrl: 'partials/skrollr.html',
        controller: 'SkrollrCtrl'
      })
      .when('/svg', {
        templateUrl: 'partials/SVG.html'
      })
      .when('/images', {
        templateUrl: 'partials/images.html',
        controller: 'ImagesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
