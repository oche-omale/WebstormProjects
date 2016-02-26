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
    'schemaForm',
    'angular-storage'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {


$urlRouterProvider.otherwise('/questionario/questionario-form/0');

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
  })
  .state('questionario', {
    abstract: true,
    url: '/questionario',
    templateUrl: 'views/questionario-template.html'
  })
  .state('questionario.form', {
    url: '/questionario-form/:routeId',
    templateUrl: 'views/schema-form.html',
    controller: 'FormController',
    controllerAs: 'schema'
  })
  .state('questionario.risultato', {
    url: '/questionario-risultato',
    templateUrl: 'views/product-list.html',
    controller: 'ProductCalculationCtrl',
    controllerAs: 'product'
  });

  }).run(function($rootScope, $state){
    $rootScope.$state = $state;


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      //console.log(fromState);
      $rootScope.tostateUrl = fromState.name;
      //$state.go(fromParams.url);

    });
  });

}());
