/**
 * Created by Admin on 18/02/2016.
 */
'use strict';

/**
 * @ngdoc function
 * @name preventivitoreAppApp.controller:controllers
 * @description
 * # MainCtrl
 * # AboutCtrl
 * # ContactCtrl
 * # LandingCtrl
 * Controllers of the preventivitoreApp
 */
(function() {

  function MainCtrl(){
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }

  function AboutCtrl(){
    this.message = 'This is the about view';
  }

  function ContactCtrl(){
    this.message = 'This is the contact view';
  }

  function LandingCtrl(QuestionarioService, $scope){

    this.backendValue = [];
    this.error = '';
    $scope.bValue = [];
    $scope.numeroCariches = [];
    $scope.massimale = [];
    $scope.dataDecorrenza = [];

    function keyValuePair(key, value){
      var pair = {};
      var pairs = [];
      for(var i = 0; i < key.length; i++){
        pair = {k:key[i], v:value[i]};
        pairs.push(pair);
      }
      return pairs;
    }


    var onSuccess = function(data) {
      //this.backendValue = data;
      $scope.bValue = data;
      $scope.numeroCariches = keyValuePair(data[0].tipoVariabile.values, data[0].tipoVariabile.descr);
      $scope.massimale = keyValuePair(data[1].tipoVariabile.values, data[1].tipoVariabile.descr);
      $scope.enteCariche = data[2].tipoVariabile.tipoVariabile.listaVariabili;
      //$scope.numeroCariche = data[3];
      $scope.dataDecorrenza = keyValuePair(data[4].tipoVariabile.values, data[4].tipoVariabile.descr);


      //console.log(JSON.stringify($scope.enteCariche));
    };

    var onError = function(reason) {
      this.error = reason;
    };

    function loadBackEnd(){
      QuestionarioService.getQuestionarioParameters().then(onSuccess, onError);
    }

    loadBackEnd();




  }

angular.module('preventivitoreApp')
  .controller('MainCtrl', MainCtrl)
  .controller('AboutCtrl', AboutCtrl)
  .controller('ContactCtrl', ContactCtrl)
  .controller('LandingCtrl', LandingCtrl);

}());

