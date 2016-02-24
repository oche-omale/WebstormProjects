/**
 * Created by Admin on 18/02/2016.
 */
'use strict';

(function() {

  function QuestionarioService($http, store, BACKEND_SERVICE_URLS) {

    var getProductList = function() {
      return $http.get(BACKEND_SERVICE_URLS.PRODUCT_LIST).then(function(response) {
        return response.data;
      });
    };

    var getProductParameterList = function() {
      return $http.get(BACKEND_SERVICE_URLS.PRODUCT_PARAMETERS + getCurrentTimeMills()).then(function(response) {
        return response.data;
      });
    };

    var getProductCalculation = function(data) {
      return $http({
        url: BACKEND_SERVICE_URLS.PRODUCT_CALCULATION,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        return response.data;
      });
    };

    var getCurrentTimeMills = function(){
      return new Date().getTime();
    };

    var setProductParameter = function(data){
      store.set(BACKEND_SERVICE_URLS.PRODUCT, data);
    };

    var getProductParameter = function(){
      return store.get(BACKEND_SERVICE_URLS.PRODUCT);
    };

    var removeProductParameter = function(){
      store.remove(BACKEND_SERVICE_URLS.PRODUCT);
    };

    return {
      getProductList: getProductList,
      getProductParameterList: getProductParameterList,
      getProductCalculation: getProductCalculation,
      getCurrentTimeMills: getCurrentTimeMills,
      setProductParameter: setProductParameter,
      getProductParameter: getProductParameter,
      removeProductParameter: removeProductParameter
    };

  }

  angular.module('preventivitoreApp')
    .factory('QuestionarioService', QuestionarioService);

}());
