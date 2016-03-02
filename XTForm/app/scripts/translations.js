'use strict';
/**
 * Created by Admin on 26/02/2016.
 */



(function(){

  function config($translateProvider){
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider
      .translations('en', {
        HOME: 'Home',
        ABOUT: 'About',
        CONTACT: 'Contact',
        GRID_TABLE: 'Grid Table',
        BUTTON_SPLENDID: 'Splendid',
        ENGLISH: 'English',
        ITALIAN: 'Italian'
    })
      .translations('it', {
        HOME: 'Casa',
        ABOUT: 'A Proposito',
        CONTACT: 'Contatto',
        GRID_TABLE: 'Grid Tabella',
        BUTTON_SPLENDID: 'Splendido',
        ENGLISH: 'Inglese',
        ITALIAN: 'Italiana'
      });

    $translateProvider.preferredLanguage('en');
  }

  angular
    .module('xtformApp')
    .config(config);

}());
