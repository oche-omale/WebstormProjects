/**
 * Created by Admin on 18/02/2016.
 */
'use strict';

(function() {

  function QuestionarioService($http, store, BACKEND_SERVICE_URLS, LOCAL_STORAGE_VALUE) {
    var form = [];
    var schema = {};
    var model = {};

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
      //store.set(LOCAL_STORAGE_VALUE.PRODUCT, data);

    };

    var getProductParameter = function(){
      return store.get(LOCAL_STORAGE_VALUE.PRODUCT);
    };

    var removeProductParameter = function(){
      store.remove(LOCAL_STORAGE_VALUE.PRODUCT);
    };

    var set = function(key, data){
      store.set(key, data);
    };

    var get = function(key){
      return store.get(key);
    };

    var setModel = function(data){
      model = data;
    };

    var getModel = function(){
      return model;
    };
    var setForm = function(data){
      form = data;
    };

    var getForm = function(){
      return form;
    };
    var setSchema = function(data){
      schema = data;
    };

    var getSchema = function(){
      return schema;
    };

    var remove = function(key){
      store.remove(key);
    };

    return {
      getProductList: getProductList,
      getProductParameterList: getProductParameterList,
      getProductCalculation: getProductCalculation,
      getCurrentTimeMills: getCurrentTimeMills,
      setProductParameter: setProductParameter,
      getProductParameter: getProductParameter,
      removeProductParameter: removeProductParameter,
      set: set,
      get: get,
      remove: remove,
      setModel: setModel,
      getModel: getModel,
      setForm: setForm,
      getForm: getForm,
      setSchema: setSchema,
      getSchema: getSchema
    };

  }

  angular.module('preventivitoreApp')
    .factory('QuestionarioService', QuestionarioService);

}());
