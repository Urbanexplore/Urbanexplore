'use strict';

/**
 * @ngdoc service
 * @name urbanBackOfficeApp.utils
 * @description
 * # utils
 * Service in the urbanBackOfficeApp.
 */

angular.module('urbanBackOfficeApp')
	 .service('utils', function () {

    // AngularJS will instantiate a singleton by calling "new" on this function

   this.guid = function(){
        //console.log (Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));
				var val = 'a' +Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
				while(angular.isNumber(val)){
					val = 'a'+ Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
				}
        return(val);
    };
 });
