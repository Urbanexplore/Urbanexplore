'use strict';

/**
 * @ngdoc function
 * @name urbanAppMobileApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the urbanAppMobileApp
 */
angular.module('urbanAppMobileApp')
  .controller('MapCtrl',  function ($scope, $routeParams,$route,$location,ProjectService, leafletEvents) {

    var step_id    = $routeParams.stepId;
    var openStreetMap = 'images/site/{z}/{x}_{y}.png';
    var listOfStep = new Array();
    var marckers   = new Array();
    var latlngs    = new Array();
    var center = {} ;
    var nbSteps;
    var iconA = {

      type: 'awesomeMarker',
      icon: 'tag',
      markerColor: 'blue',
      size : 'large'
    };


    var iconB= {
            type: 'awesomeMarker',
            icon: 'tag',
            markerColor: 'Encours',
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
            tileLayer:openStreetMap,
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
    //$scope.project = ProjectService.get(); 
  }).then(function(){ 
    $scope.step    = ProjectService.getStep(step_id, $scope.project);
    console.log ($scope.step);
   
   

    listOfStep =  $scope.project.steps;

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
            m['id'] = entry.id;
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
              if (entry.id == step_id){
                m['icon']    = iconB;
                m['focus']   = true;

                $scope.center =  {

                    lat:entry.lat,
                    lng: entry.lng,
                    zoom: 17};
              }else{
               m['icon']    = iconA;
              }
             marckers.push(m);  

            }  
      });
     
     
    }//fin if (listOfStep

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
    $scope.$on('leafletDirectiveMarker.click', function(event, args){
       
         var objClicked = marckers[args.markerName];
        //var cmpt = eval(args.markerName) + 1;
        $location.path('/map/' + objClicked.id);
    });


    nbSteps = marckers.length;
    $scope.nbSteps = marckers.length;
    $scope.lastStepId = marckers[nbSteps-1].id;
    $scope.firstStepId = marckers[0].id;  

  });   
    
  console.log (marckers);

    $scope.goHome = function(){
      $location.path('/home/');
    };

    $scope.initialiser = function(){
      $scope.center= {
                lat:$scope.project.lat,
                lng:$scope.project.lng,
                zoom:$scope.project.zoom
      };
          // $route.reload();
    }  

   
     $scope.next = function () {
        console.log(marckers);
        var nextId =marckers[0];
        for (var i = marckers.length - 1; i >= 0; i--) {
          if (marckers[i].id == step_id){
            nextId = marckers[i+1].id;
            break;
          }
        }  
       if (nextId > marckers[nbSteps -1])
          nextId = marckers[nbSteps-1];
      $location.path('/map/'+nextId);
    }

    $scope.previous = function () {
      var previousId = marckers[0];
      if (step_id != marckers[0]){
        for (var i = marckers.length - 1; i >= 0; i--) {
          if (marckers[i].id == step_id){
            previousId = marckers[i-1].id;
            break;
          }
        }
        if (previousId < marckers[0])
          nextId = marckers[0];  
       
        $location.path('/map/'+previousId);
      }
    }





});
