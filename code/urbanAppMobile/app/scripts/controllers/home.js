'use strict';

/**
 * @ngdoc function
 * @name urbanAppMobileApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the urbanAppMobileApp
 */
angular.module('urbanAppMobileApp')
  .controller('HomeCtrl', function ($scope,$sce,ProjectService, $modal, $log, $location, leafletEvents,leafletDirective) {

  var listOfStep = new Array();
  var marckers   = new Array();
  var latlngs    = new Array();
  var iconA = {
      type: 'awesomeMarker',
      icon: 'tag',
      markerColor: 'blue',
      size : 'large'
    };
  angular.extend($scope, {
        // set up map center
        center: {
        lat:0,
        lng:0,
        zoom: 10

        },
         defaults: {
            tileLayer: 'images/site/{z}/{x}_{y}.png',
            //zoomControlPosition: 'topright',
            tileLayerOptions: {
                opacity: 0.9,
                detectRetina: true,
                reuseTiles: true,
            },
            scrollWheelZoom: true,
            maxZoom: 18,
            minZoom: 7
        },
        events: {
            markers: {
                enable: ['click'],
                logic: 'emit'
             }
        },
        markers:$scope.markers,
        paths: {

        }

  });

   
  $scope.project = new Array();
  var promiseProject = ProjectService.getProjectJS();
  promiseProject.then(function(data){
      $scope.project = data;
    }).then(function(){
      console.log ($scope.project);
      listOfStep  =  $scope.project.steps;

      if (listOfStep != undefined){
        listOfStep.sort(function(a,b){
            if(a.position < b.position)
              return(-1);
            else
              return(1);
        });
        listOfStep.forEach(function(entry) {
          //console.log (entry);
              var m = {};
              m['id'] = entry.position;
              m['lat'] = entry.lat;
              m['lng'] = entry.lng;
              m['isVisible'] = entry.isVisible;
              m['title'] = entry.title;
              m['position'] = entry.position;
              //m['message']   = entry.message;
              //m['draggable'] = true;
              m['focus']     = true;
              //console.log (m);
              latlngs.push(m);
              if (entry.isVisible){
                m['icon']     = iconA;
                marckers.push(m);
              }
        });
       
       
      }//fin if (listOfStep
    $scope.center = {
        lat:$scope.project.lat,//$scope.project.lat,
        lng:$scope.project.lng,//$scope.project.lng,
        zoom:$scope.project.zoom
     };
    $scope.defaults = {
        //tileLayer: openStreetMap,
        maxZoom: $scope.project.maxZoom,
        minZoom: $scope.project.minZoom,
        zoomControlPosition: 'bottomright',

        tileLayerOptions: {
          opacity: 0.9,
          detectRetina: true,
          reuseTiles: true,
        },
        scrollWheelZoom: true

    };

   
    $scope.markers = marckers;
    $scope.paths = {
            p1: {
                 color: '#404051',
                weight: 5,
                latlngs: latlngs
            }

    };    
     
 });

  $scope.vueMixte = function () {
      $location.path('/vuemixte/1');
  };

  
  $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modalContentHome.html' ,
        controller: 'ModalInstanceCtrl',
        scope : $scope,
      });
  };
  

   $scope.trustSrc = function(src) {

     return $sce.trustAsResourceUrl(src);

  }


});

 angular.module('urbanAppMobileApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});

