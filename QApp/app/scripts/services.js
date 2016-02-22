/**
 * Created by Admin on 18/02/2016.
 */
'use strict';

(function() {

  function QuestionarioService($http) {

    var getQuestionarioParameters = function() {
      return $http.get('http://192.168.190.70:8085/AceRate-Rest-Services/webresources/services/getDizionarioDati/RCPATDIP/1455871541523').then(function(response) {
        //console.log(JSON.stringify(response));
        return response.data;
      });
    };

    return {
      getQuestionarioParameters: getQuestionarioParameters
    };

  }



  angular.module('preventivitoreApp')
    .factory('QuestionarioService', QuestionarioService);

}());
