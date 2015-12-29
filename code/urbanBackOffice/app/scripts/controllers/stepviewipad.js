'use strict';
/**

* @ngdoc function
* @name urbanBackOfficeApp.controller:StepviewipadCtrl
* @description
* # StepviewipadCtrl
* Controller of the urbanBackOfficeApp
*/

angular.module('urbanBackOfficeApp')

  .controller('StepviewipadCtrl', function ($scope, $sce, $routeParams, $location, ProjectsService, graphService, MediasService, $http,  urlStanbol, FileUploader, ProxyProjectsService, ProxyMediasService) {

   var step_id    = $routeParams.stepId;
   var project_id = $routeParams.projectId;
   var step = new Array();
   var promise = ProxyProjectsService.getProjectJsById(project_id, true, true);
   promise.then(function(data){
     $scope.project = data;
   }).then(function(){
     //console.log($scope.project);
     //$scope.step    = ProjectsService.getStepByPosition($scope.project,step_id);
var promiseStep =  ProjectsService.getStepByPosition($scope.project,step_id);
    promiseStep.then(function(dataStep){
      $scope.step = dataStep;
      var step22 = dataStep;
    }).then(function(){

     listOfMedias = step22.medias;



      listOfMedias.sort(function(a,b){
          if(a.ordreDsStep < b.ordreDsStep)
            return(-1);
          else
            return(1);
        });

      $scope.step.medias = listOfMedias;
      console.log($scope.step.medias);

    });
   });



  $scope.trustSrc = function(src) {

     return $sce.trustAsResourceUrl(src);

   }



   $scope.next = function (position) {

      var position = position+1;

      $location.path('/stepViewIpad/'+$scope.project.id+'/step/'+position);

    }

    $scope.previous = function (position) {

    	console.log (position)

    	if (position > 1){

       	var pos = position-1;

     		$location.path('/stepViewIpad/'+$scope.project.id+'/step/'+pos);

     	}

   }

    $scope.getClass = function getClass(idx, list) {
    //console. log (idx);
    if (idx % 2 == 0 ) return "pull-right";
    else return "pull-left";

};

 });
