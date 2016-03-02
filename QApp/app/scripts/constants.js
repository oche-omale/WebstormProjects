'use strict';
/**
 * Created by Admin on 18/02/2016.
 */

/**
 *
 * Main File for defining the application CONSTANTS
 *
 */
(function() {

angular.module('preventivitoreApp')
  .constant('BACKEND_SERVICE_URLS', {
    PRODUCT_LIST: 'http://192.168.190.70:8085/AceRate-Rest-Services/webresources/services/getProductNames',
    PRODUCT_PARAMETERS: 'http://192.168.190.70:8085/AceRate-Rest-Services/webresources/services/getDizionarioDati/RCPATDIP/',
    PRODUCT_CALCULATION: 'http://62.101.87.234/AceRate-Rest-Services/webresources/services/calcolaTariffa/idChiamata123456/RCPATDIP'
  })
  .constant('LOCAL_STORAGE_VALUE', {
    PRODUCT: 'product',
    SCHEMA: 'schema',
    FORM: 'form',
    MODEL: 'model'
  });

}());
