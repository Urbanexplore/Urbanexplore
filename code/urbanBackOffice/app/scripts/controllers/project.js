'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
 // .controller('ProjectCtrl', function ($scope, $http,$routeParams,$location, urlStanbol, ProjectsService) {
.controller('ProjectCtrl', ProjectCtrl);

function ProjectCtrl($scope,$http,$timeout, $routeParams,$location, $resource, urlStanbol, ProjectsService, DTOptionsBuilder, DTColumnDefBuilder,  ProxyProjectsService, PublishService) {

  	var project_id = $routeParams.projectId;
    var nbMedias = 0;

    

    $scope.project = new Array();
    $scope.isDefineArea = false;
    //var promise = ProxyProjectsService.getProjectJS(project_id);
    var promise = ProxyProjectsService.getProjectJsById(project_id, true, false);
    promise.then(function(data){

      $scope.project = data;

    }).then(function(){
        console.log($scope.project.steps);

      $scope.nbMedia = ProjectsService.getNbMediaFromSteps($scope.project.steps);
      if ($scope.project.lat != 0.12345)
         $scope.isDefineArea = true;


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

       $scope.titleView = "List of Steps";
       $scope.subTitleView  = "Management Route";
       $scope.subTitleView1 = "Management Home page";
       $scope.subTitleView2 = "Management Footer";
       $scope.subTitleView3 = "Management Advertising";

       //editStep
         $scope.edit = function(step) {

           if(step == null){
             var step = ProjectsService.getStep($scope.project);
           }
           $location.path('/project/'+project_id+'/step/'+step.id);
         }

         $scope.goNext = function(hash) {
           console.log(hash);
           //hash = "areaproject/bc33";
           console.warn("TODO voir les raisons de ce bug non, l'id du project ne remonte pas alors qu'il devrait déjà être contenu dans le hash");
           $location.path(hash + $scope.project.id);
          }

          $scope.delete = function (id) {
            if (id != undefined){
              var promiseDelete = ProjectsService.deleteStep($scope.project, id);
              promiseDelete.then(function(){

                $scope.alerts.push ({ type: 'success', msg: 'Well done! The selected step has been removed.' });
                closeAlert();
              });
            }
          }



            //editStep en mode graphique
            $scope.editStepGraph = function(step) {

              if(step == null){
                var step = ProjectsService.getStep($scope.project);
              }
              $location.path('/projectroutestep/'+project_id+'/step/'+step.id);
            }

          $scope.changeVisibility = function(step){
              step.isVisible = !step.isVisible;
          }

          $scope.publier = function(){

           console.log ($scope.project) ;
           PublishService.publishGlobal($scope.project);


          }





 }
