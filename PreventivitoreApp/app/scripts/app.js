'use strict';

/**
 * @ngdoc overview
 * @name preventivitoreApp
 * @description
 * # preventivitoreApp
 *
 * Main module of the application.
 */
(function() {

angular
  .module('preventivitoreApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ng',
    'dynamic-form',
    'dynform'
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
  })
  .state('dynamic', {
    url: '/dynamic-form',
    templateUrl: 'views/dynamic-form.html',
    controller: 'ExampleCtrl',
    controllerAs: 'example'
  })
  .state('dynamicforms', {
    url: '/dynamic-forms',
    templateUrl: 'views/dynamic-forms.html',
    controller: 'AppCtrl',
    controllerAs: 'app'
  });

  });

}());
