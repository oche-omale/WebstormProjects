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

  function MainCtrl(){
      this.awesomeThings = [{header: 'HTML5 Boilerplate', detail: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'},
        {header: 'AngularJS', detail: 'AngularJS is a toolset for building the framework most suited to your application development.'},
        {header: 'Karma', detail: 'Spectacular Test Runner for JavaScript.'}];
  }

  function AboutCtrl(){
      this.message = 'About Page';
  }

  function ContactCtrl(){
      this.message = 'Contact Page';
  }

  function LanguageCtrl($translate, LANGUAGE_SETTINGS){
    var vm = this;
    vm.language = $translate.use();

    vm.changeLanguage = function(langKey){
      $translate.use(langKey);
      vm.language = langKey;
      displayLanguage();
    };

    function displayLanguage(){
      if(typeof (vm.language) !== LANGUAGE_SETTINGS.JS_UNDEFINED && vm.language ===  LANGUAGE_SETTINGS.EN){
        vm.describeLanguage = LANGUAGE_SETTINGS.ENGLISH;
      }else if(typeof (vm.language) !== LANGUAGE_SETTINGS.JS_UNDEFINED && vm.language ===  LANGUAGE_SETTINGS.IT){
        vm.describeLanguage = LANGUAGE_SETTINGS.ITALIAN;
      }
    }

    displayLanguage();

  }

  angular.module('xtformApp')
    .controller('MainCtrl', MainCtrl)
    .controller('AboutCtrl', AboutCtrl)
    .controller('ContactCtrl', ContactCtrl)
    .controller('LanguageCtrl', LanguageCtrl);

}());
