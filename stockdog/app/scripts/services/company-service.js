'use strict';

/**
 * Created by Admin on 02/03/2016.
 */


angular.module('stockDogApp')
  .service('CompanyService', function CompanyService($resource) {
    return $resource('companies.json');
  });

