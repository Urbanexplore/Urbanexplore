'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  //.controller('UsersCtrl', function ($scope, $routeParams,$location, UsersService) {

 .controller('UsersCtrl', UsersCtrl);

function UsersCtrl($scope,$routeParams, $location, DTOptionsBuilder, DTColumnDefBuilder,UsersService ) {
   
 	$scope.titleView = "List of users";
 	$scope.users = UsersService.list();
 	 $scope.alerts = new Array();

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    var closeAlert = function(){
       $timeout(function(){
        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
    };

 	//editUser
  	$scope.edit = function(user) {
      console.log (user);
      if(user == null){
        var newuser = UsersService.get(); 
         $location.path('/user/'+newuser.id);
      }else
        $location.path('/user/'+user.id);

  	}	
	


	$scope.delete = function (id) {

        UsersService.delete(id);
        $scope.alerts.push ({ type: "success", msg: "Well done! your user  is deleted"});
        closeAlert();
       
  }
 
	

 	
}