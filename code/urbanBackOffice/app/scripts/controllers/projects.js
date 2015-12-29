'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('ProjectsCtrl', ProjectsCtrl);

function ProjectsCtrl($scope,$timeout,$resource,$location,$sce, DTOptionsBuilder, DTColumnDefBuilder,DTColumnBuilder,$compile,ProjectsService, ProxyProjectsService){

 	$scope.titleView = "Projects";
 	$scope.subTitleView1 = "Users"

 $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

    //$scope.dtOptions.data = {};
    $scope.projects = new Array();

    var promise = ProxyProjectsService.getProjectJS(false, false);
    promise.then(function(data){
      $scope.projects = data;

    });

    $scope.alerts = new Array();

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    var closeAlert = function(){
       $timeout(function(){
        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
    };
   
   

	/*view list of steps*/
	$scope.edit = function(project) {
    
		if(project != null)		
		  $location.path('/project/'+project.id);
	}

	$scope.save = function(){
		var promiseSave = ProjectsService.saveProject($scope.newproject);
    promiseSave.then(function(){

      $scope.projects.push($scope.newproject);
      $scope.newproject = {};
      $scope.alerts.push ({ type: 'success', msg: 'Well done! your project is created'});
      closeAlert();
     
    });
	}

	$scope.delete = function(project){
      if (project.id != undefined){
        console.log(project.id);
        ProjectsService.delete(project.id, $scope.projects);
      

        $scope.alerts.push ({ type: "success", msg: "Well done! your project "+project.name+" is deleted"});
        closeAlert();
      }else{
         $scope.alerts.push = ({ type: 'warning', msg: 'No Project selected.' });
        closeAlert();
      } 
        /*if ($scope.newproject.id == id) $scope.newproject = {};*/
  }


	

 }
