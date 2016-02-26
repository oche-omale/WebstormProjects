'use strict';
/**
 * Created by Admin on 26/02/2016.
 */


/**
 * @ngdoc function
 * @name xtformApp.controller:MainCtrl, AboutCtrl
 * @description
 * # MainCtrl, AboutCtrl
 * Controller of the xtformApp
 */
(function(){

  angular.module('xtformApp')
    .controller('MainCtrl', function () {
      this.awesomeThings = [{header: 'HTML5 Boilerplate', detail: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'},
        {header: 'AngularJS', detail: 'AngularJS is a toolset for building the framework most suited to your application development.'},
        {header: 'Karma', detail: 'Spectacular Test Runner for JavaScript.'}];
    })
    .controller('AboutCtrl', function () {
      this.message = 'About Page';
    })
    .controller('ContactCtrl', function () {
      this.message = 'Contact Page';
    });

}());
