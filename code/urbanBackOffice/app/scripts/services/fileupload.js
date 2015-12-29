'use strict';

/**
 * @ngdoc service
 * @name urbanBackOfficeApp.Fileupload
 * @description
 * # Fileupload
 * Service in the urbanBackOfficeApp.
 */
angular.module('urbanBackOfficeApp')
  .service('fileUpload',  ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

