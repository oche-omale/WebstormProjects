/**
 * Created by Admin on 18/02/2016.
 */
'use strict';

(function() {

  function QuestionarioService($http) {

<<<<<<< HEAD
    var getProductList = function() {
      return $http.get('http://192.168.190.70:8085/AceRate-Rest-Services/webresources/services/getProductNames').then(function(response) {
=======
    var getQuestionarioParameters = function() {
      return $http.get('http://192.168.190.70:8085/AceRate-Rest-Services/webresources/services/getDizionarioDati/RCPATDIP/1455871541523').then(function(response) {
>>>>>>> origin/master
        //console.log(JSON.stringify(response));
        return response.data;
      });
    };

<<<<<<< HEAD
    var getProductParameterList = function() {
      return $http.get('http://192.168.190.70:8085/AceRate-Rest-Services/webresources/services/getDizionarioDati/RCPATDIP/1456140657986').then(function(response) {
        return response.data;
      });
    };



    return {
      getProductList: getProductList,
      getProductParameterList: getProductParameterList
=======
    return {
      getQuestionarioParameters: getQuestionarioParameters
>>>>>>> origin/master
    };

  }



  angular.module('preventivitoreApp')
    .factory('QuestionarioService', QuestionarioService);

}());
