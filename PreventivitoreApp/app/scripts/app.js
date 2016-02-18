'use strict';

/**
 * @ngdoc overview
 * @name preventivitoreApp
 * @description
 * # preventivitoreApp
 *
 * Main module of the application.
 */
angular
  .module('preventivitoreApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {


$urlRouterProvider.otherwise('/landing');

$stateProvider
  .state('main', {
    url: '/',
    templateUrl: "views/main.html",
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  })
  .state('contact', {
    url: '/contact',
    templateUrl: 'views/contact.html',
    controller: 'ContactCtrl',
    controllerAs: 'contact'
  })
  .state('landing', {
    url: '/landing',
    templateUrl: 'views/landing.html',
    controller: 'LandingCtrl',
    controllerAs: 'landing'
  });

  });
