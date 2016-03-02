/**
 * Created by Admin on 26/02/2016.
 */
'use strict';


(function(){


  function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/common/main');

    $stateProvider
      .state('common', {
        abstract: true,
        url: '/common',
        templateUrl: 'views/common/content.html'
      })
      .state('common.main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('common.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('common.contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .state('common.gridtable', {
        url: '/grid-table',
        templateUrl: 'views/grid-table.html'
      });
  }

  angular
    .module('xtformApp')
    .config(config)
    .run(function($templateRequest) {
      $templateRequest("views/common/templates/editor.html");
    });

}());
