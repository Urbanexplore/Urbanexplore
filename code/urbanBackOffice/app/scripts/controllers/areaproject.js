'use strict';

/**
 * @ngdoc function
 * @name urbanBackOfficeApp.controller:AreaprojectCtrl
 * @description
 * # AreaprojectCtrl
 * Controller of the urbanBackOfficeApp
 */
angular.module('urbanBackOfficeApp')
  .controller('AreaprojectCtrl', function ($scope,$routeParams,$location,leafletEvents, ProjectsService, ProxyProjectsService , $q) {
   var project_id = $routeParams.projectId;

   angular.extend($scope, {
       // set up map center
       center: {
       lat:0,
       lng:0,
       zoom: 11

       },
       defaults: {
          // tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
           //zoomControlPosition: 'topright',
           tileLayerOptions: {
               opacity: 0.9,
               detectRetina: true,
               reuseTiles: true,
           },
           scrollWheelZoom: true,
           maxZoom:  17,
           minZoom: 10,
       },
       events: {
           markers: {
               enable: ['click'],
               logic: 'emit'
            }
       },
       markers:$scope.markers
      
       
       
      
   });



  var promise = ProxyProjectsService.getProjectJsById(project_id, false, false);
  promise.then(function(data){
    //$scope.project = ProjectsService.get(data, project_id);
    $scope.project = data;
  }).then(function(){ 
     console.log("je trouve bien le projet");
     console.log($scope.project.lat);
     $scope.center.lat = 42;
     $scope.center.lng = 12;
     $scope.center.zoom = 12;
     angular.extend($scope, {
        maxZoom: $scope.project.maxZoom != undefined ? $scope.project.maxZoom : 17,
        minZoom: $scope.project.minZoom != undefined ? $scope.project.minZoom : 10,
        center: {
           lat: $scope.project.lat != undefined ? $scope.project.lat : 0,
           lng: $scope.project.lng != undefined ? $scope.project.lng : 0,
           zoom: $scope.project.zoom != undefined ? $scope.project.zoom : 1

         }
     });
  });




//console.log (marckers);


    $scope.save = function() {
		//console.log ($scope.center.zoom);
    console.log("area project save");
		console.log($scope.project);
    console.log($scope.center);
    $scope.project.lat = Math.round($scope.center.lat*10000)/10000;
		$scope.project.lng  = Math.round($scope.center.lng*10000)/10000;
		$scope.project.zoom= $scope.center.zoom;
    $scope.project.maxZoom = $scope.maxZoom;
    $scope.project.minZoom = $scope.minZoom;
    console.log($scope.project);
    console.log($scope.center);

		var promise = ProjectsService.saveProject($scope.project, $scope.center);
    promise.then(function(){
      console.log("/project/" + $scope.project.id);
      $location.path("/project/" + $scope.project.id);
    });


	}

  });
