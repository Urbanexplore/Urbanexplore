'use strict';

/**
 * @ngdoc function
 * @name urbanAppMobileApp.controller:VuemixteCtrl
 * @description
 * # VuemixteCtrl
 * Controller of the urbanAppMobileApp
 */
angular.module('urbanAppMobileApp')
  .controller('VuemixteCtrl', function ($scope, $log, $sce,$route, $routeParams, leafletData, $location, $anchorScroll, $modal, ProjectService, leafletEvents) {

    var step_id    = $routeParams.stepId;
    var openStreetMap =  'images/site/{z}/{x}_{y}.png';
    $location.hash('content');
    $anchorScroll();

    $scope.isCollapsed = true;

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

    //move the content to the top when changing step on map
    

    listOfStep     =  $scope.project.steps;

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
     
     var listOfMedias = $scope.step.medias;

     if (listOfMedias.length != 0){
      
      listOfMedias.sort(function(a,b){
          if(a.ordreDsStep < b.ordreDsStep)
            return(-1);
          else
            return(1);
        });

      $scope.step.medias = listOfMedias;
    }
     
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
        console.log("leafletDirectiveMarker.click");
        //console.log(args.markerName);
        //console.log (marckers);
        //console.log (marckers[args.markerName]);
        var objClicked = marckers[args.markerName];
         
          //var cmpt = eval(args.markerName) + 1;
          $location.path('/vuemixte/' + objClicked.id);
    });

    nbSteps = marckers.length;
    $scope.nbSteps = marckers.length;
    $scope.lastStepId = marckers[nbSteps-1].id;
    $scope.firstStepId = marckers[0].id;  

});



      $(".awesome-marker-icon-blue .glyphicon-tag:before").html("1");
      $(".awesome-marker-icon-blue .glyphicon-tag:before").css("content","2");


     $scope.initialiser = function(){
      $scope.center= {
                lat:$scope.project.lat,
                lng:$scope.project.lng,
                zoom:$scope.project.zoom
      };
      
           //$route.reload();
    } 

      $scope.goHome = function(){
       $location.path('/home/');
     };
     

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
      $location.path('/vuemixte/'+nextId);
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
       
        $location.path('/vuemixte/'+previousId);
      }
    }

    $scope.trustSrc = function(src) {
     return $sce.trustAsResourceUrl(src);

   }
   $scope.getClass = function getClass(idx, list) {
    //console. log (idx);
    if (idx % 2 == 0 ) return "pull-right";
    else return "pull-left";
}

    $scope.viewMap = function(step_id){
      $location.path('/map/'+step_id);
    }

    $scope.viewEtape = function(step_id){
      $location.path('/etape/'+step_id);
    }

    $scope.isImage = function(src){
      var extension = src.substr(src.lastIndexOf('.') + 1);


      var bool = false;
      if(extension == "jpg" || extension=="jpeg" || extension=="bmp" || extension == "gif"){
        bool = true;
      }
      return(bool);
    }


    $scope.open = function () {
    	var modalInstance = $modal.open({
	      templateUrl: 'views/modalContent.html' ,
	      controller: 'ModalInstanceCtrl',
	      scope : $scope,
	    });
    };



    $(".zoom").click(function(){
      console.warn("TODO améliorer le fonctionnement du bouton pour qu'il soit plus réactif.");
      $scope.project.zoom = $scope.project.zoom + 1;

      angular.extend($scope, {
          // TODO calculate centter from differents positions of marckers
          center: {
              lat:$scope.step.lat,//$scope.project.lat,
              lng:$scope.step.lng,//$scope.project.lng,
              zoom:$scope.project.zoom +1
            },
            defaults: {
               tileLayer: openStreetMap,
                maxZoom: $scope.project.maxZoom,
                minZoom: $scope.project.minZoom,
                zoomControlPosition: 'bottomright',
                layerOptions: {
                    opacity: 0.9,
                    detectRetina: true,
                    reuseTiles: true,
                },
                scrollWheelZoom: true

            },
            events: {
                markers: {
                    enable: ['click'],
                    logic: 'emit'
                 }
            },
            markers:marckers,
            paths: {
                p1: {
                    color: '#008000',
                    weight: 3,
                    latlngs: latlngs
                },

            }

          });

    });


});
