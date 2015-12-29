'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('urbanAppMobileApp', [
    //'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive',
    'ui.bootstrap',
    'ngScrollbar',
    'hmTouchEvents',
    'ldToJsLib'
  ])
  .config(function ($routeProvider) {
    $routeProvider
     .when('/', {
        templateUrl:'views/home.html',
        controller: 'HomeCtrl'
      })
     
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
     
      .when('/vuemixte/:stepId', {
        templateUrl: 'views/vuemixte.html',
        controller: 'VuemixteCtrl'
      })
      .when('/etape/:stepId', {
        templateUrl: 'views/etape.html',
        controller: 'EtapeCtrl'
      })
      .when('/map/:stepId', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
