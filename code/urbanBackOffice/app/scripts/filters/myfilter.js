'use strict';

/**
 * @ngdoc filter
 * @name sitejsApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the sitejsApp.
 */


 angular.module('isArray', []).filter('isArray', function() {
  return function(input) {
    return angular.isArray(input);
  };
});

 angular.module('nbOfMedia', []).filter('nbOfMedia', function() {
  return function(input) {
  	if (angular.isArray(input))
  		return input.length;
  	else{ //not a array
  		if(input != undefined)
  			return 1;
  		else
  			return 0;

  	}

  };
});

 angular.module('isEmpty', []).filter('isEmpty', function() {
  return function(input) {
    if (input.id != undefined)
      return true;
    else
     return false;

  };
});

angular.module('isVideo', []).filter('isVideo', function() {
  return function(input) {
      if (input.toUpperCase().indexOf("VIDEO") > -1 )
        return true;
      else
       return false;
    }
});


