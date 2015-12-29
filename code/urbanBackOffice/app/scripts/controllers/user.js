'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('UserCtrl', function ($scope,$timeout ,$location, $routeParams,UsersService, $http, FileUploader, urlStanbol) {

  $scope.alerts = new Array();

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    var closeAlert = function(){
       $timeout(function(){
        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
    };

  $scope.titleView = "Management Account";
  
 	var user_id    = $routeParams.userId;
 	
  $scope.user = UsersService.get(user_id);
   if ($scope.user.name == undefined)
   		$scope.title = 'new User';
   	else 
   		$scope.title = $scope.user.name;
  
  
  $scope.submitted = false;
  $scope.signupForm = function() {
        if ($scope.signup_form.$valid) {
            console.log ("if");
     
        } else {
            $scope.signup_form.submitted = true;
            console.log ("else");
        }
    } 
  $scope.save = function() {
    console.log ($scope.user);
    UsersService.save($scope.user);
    $scope.user = {};
    $scope.alerts.push ({ type: 'success', msg: 'Well done! your user is created'});
    closeAlert();
    $location.path('/users/');
  }
$scope.uploader = new FileUploader({

  });



  $scope.uploadFile = function(){

        var pw = "Basic YWRtaW46YWRtaW4=";
        $http.defaults.headers.common['Authorization'] = urlStanbol.pwd;
        var file = $scope.myFile;
        var extension = file.name.split(".").pop();
        var fileName = new Date().getTime()+'.'+extension;
       
        var uploadUrl = urlStanbol.url+":"+urlStanbol.port+"/mediamanagement/fileUpload?form="+file+"&fileName="+fileName;
        
       var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
          $scope.user.avatar = "images/"+fileName;
          $scope.showImage = true;
          $scope.alerts.push ({ type: 'success', msg: 'The file uploaded with success.' });
          closeAlert();
        })
        .error(function(){
          $scope.alerts.push ({ type: 'danger', msg: 'Error '+error+'.' });
            closeAlert();
        });
        
        
  };
    
});
