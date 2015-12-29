'use strict';

/**
 * @ngdoc service
 * @name urbanBackOfficeApp.Fileupload
 * @description
 * # Fileupload
 * Service in the urbanBackOfficeApp.
 */
angular.module('urbanAppMobileApp')
  .service('jsonLD',  ['$http', function ($http) {

	  var defaultNs = "http://ooffee.eu/ns/urban#";
	  //default context for the app
	  var defaultContext = {
          "prefLabel": "http://www.w3.org/2004/02/skos/core#prefLabel",
        };

	  this.toLD = function(obj,baseSubjectUri){
		  //automatically add a new entry in the context for unknow properties
		  Object.keys(obj).forEach(function(d,i){
			  if(!defaultContext[d]){
          defaultContext[d] = defaultNs + d}
		  });
		  if(obj.id && baseSubjectUri){
       obj["@id"] = baseSubjectUri + "#" + obj.id;
     }

		  return {
	                 "@context": defaultContext,
	                 "@graph": [
	                     obj
	                   ]
		  };
	  }

}]);
