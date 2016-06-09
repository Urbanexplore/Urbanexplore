'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:ProjectrouteCtrl
 * @description
 * # ProjectrouteCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('ProjectrouteCtrl', function ($scope ,$routeParams, $location,leafletEvents,leafletDirective, ProjectsService, ProxyProjectsService, $q, utils,stepModel,graphService,confUri,saveObjectService) {

    var project_id = $routeParams.projectId;
    $scope.myCssVar = "col-md-12";

    var initPath = {
      id : 0,
      lat : 0,
      lng : 0
    }


    angular.extend($scope, {
        // set up map center
        center: {
        lat:0,
        lng:0,
        zoom: 10

        },
        defaults: {
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

        },

    });


  //var promise = ProxyProjectsService.getProjectJS(project_id);
  var promise = ProxyProjectsService.getProjectJsById(project_id, true, false);
  promise.then(function(data){
    //$scope.project = ProjectsService.get(data, project_id);
    $scope.project = data;

  }).then(function(){


    $scope.titleView = $scope.project.name;
    $scope.center.zoom = $scope.project.zoom;
    $scope.defaults.zoom = $scope.project.zoom;
    $scope.defaults.minZoom = $scope.project.zoom -3 ;
    $scope.defaults.maxZoom = $scope.project.zoom +3 ;

    var maxZoom = $scope.project.maxZoom;
    var minZoom = $scope.project.minZoom;
    var lat     = $scope.project.lat;
    var lng     = $scope.project.lng;
    var zoom    = $scope.project.zoom;

    var marckers = new Array();
    var latlngs = new Array();

    var listOfStep = new Array();
    listOfStep =  $scope.project.steps;


    //ordre des etapes, tri sur step.title Etape 1
    if (listOfStep != undefined){

      var listOfMarkers = "";
      var index = 0;
      listOfStep.forEach(function(entry) {
            var m = {};
            m['id'] = entry.id;
            m['lat'] = entry.lat;
            m['lng'] = entry.lng;
            m['isVisible'] = entry.isVisible;
            m['title'] = entry.title;
            m['position'] = entry.position;
            m['message']   = entry.message;
            m['draggable'] = true;
            m['focus']     = true;

            latlngs.push(m);
            if (entry.isVisible){
              marckers.push(m);
            }
            //}
      });
      $scope.markers = marckers;
      updatePath();
    }//fin if (listOfStep

    $scope.markers = marckers;

    //lorsque on vient de page step: step Zoom
    var step_id = $routeParams.stepId;
    if (step_id != undefined){
      $scope.step = ProjectsService.getStepByPosition($scope.project,step_id);
      //centrer la carte sur cette etape
      console.log ("step lat :"+ $scope.step.lat);
      //centrer la carte par rapport au step
      $scope.center.lat = $scope.step.lat;
      $scope.center.lng = $scope.step.lng;
      $scope.showme=true;
      $scope.myCssVar ="col-md-8";
      //$scope.markers.m1 = {"lat":lat,"lng":lng};
      //$scope.markers.m1.id = step_id;

    }else{
      console.log ("project lat :"+ $scope.project.lat)
      $scope.center.lat = $scope.project.lat;
      $scope.center.lng = $scope.project.lng;

    }

 console.log ($scope.project);
    $scope.$on('leafletDirectiveMap.click', function(event, args){
             $scope.showme = true;
             $scope.myCssVar = "col-md-8";
             var latlng = args.leafletEvent.latlng;
             var leafEvent = args.leafletEvent;
             console.warn('id pas unique avec $scope.markers.length +1');
             var m1 = {
                 id : $scope.markers.length +1,
                 lat: leafEvent.latlng.lat,
                 lng: leafEvent.latlng.lng,
                 focus: true,
                 draggable: true,
                 isVisible : true,
                 type : "step"
             };
             $scope.markers.push(m1);
             //centrer la carte ou on a cliqué
             $scope.center.lat = m1.lat;
             $scope.center.lng = m1.lng;
             if($scope.project.steps == null){
               $scope.project.steps = new Array();
             }
             $scope.step = ProjectsService.createNewStep($scope.project,m1);

     });

$scope.$on('leafletDirectiveMarker.click', function(event, args){
      console.log("leafletDirectiveMarker.click");

      $scope.showme=true;
      $scope.myCssVar ="col-md-8";
      console.log($scope.markers);

      var obj = args.model;
      //centrer la carte ou on a cliqué
      $scope.center.lat = obj.lat;
      $scope.center.lng = obj.lng;
      ProjectsService.getStepByPosition($scope.project,obj.id).then(function(data){
    	  $scope.step = data;
      });

    });



    $scope.$on('leafletDirectiveMarker.dragend',function(event, args){
        console.log("leafletDirectiveMarker.dragend");

        $scope.showme=true;
        $scope.myCssVar ="col-md-8";
        var obj = $scope.markers[args.markerName];
        console.log (obj);
        //center la carte
        $scope.center.lat = obj.lat;
        $scope.center.lng = obj.lng;
         console.log ($scope.project);
         console.log (obj.id);

        $scope.step = ProjectsService.getStepByPosition($scope.project,obj.id);
        console.log ($scope.step)
        $scope.step.lat = Math.round(obj.lat*10000)/10000;
        $scope.step.lng = Math.round(obj.lng*10000)/10000;

        console.log ($scope.step)
         /*

        $scope.markers.m1 = $scope.markers[args.markerName];
        $scope.step.markers = $scope.markers[args.markerName];
        */
    });

});//fin then promise

  	//TODO : revoir la gestion de defered, c'est n'importe quoi.
     $scope.save = function() {
    	 
    	 //TODO : remove this tricks with projectService when the graph retrieve is correctly managed.
    	 if(ProjectsService.getCurrentProject() != null){
    		 var objStep = stepModel.createStep($scope.step);
        	 
        	 var promiseChange = $q.defer();
        	 //création d'une nouvelle step, on ajoute alors sa référence dans le graph général
    	   	 if(!$scope.step['@id']){
    	   		  promiseChange = graphService.buildChanges(ProjectsService.getCurrentProject(), [null,$scope.project['@id']], confUri.urbanNS + 'steps', [null,objStep['@id']]);
    	   	  
    	   	 }else{
    	   		promiseChange.resolve();
    	   	 }
    	   	 
    	   	 //sinon on sauvegarde directement les modidication de l'objet
    	   	 
    		  promiseChange.then(function(){
    			  //objStep.saveObj(objStep,graph);
    			  saveObjectService.saveObj(objStep,ProjectsService.getCurrentProject());
    		  });
    	
            //ProjectsService.saveStep($scope.project,$scope.step);

            //ProjectsService.saveProject($scope.project, $scope.center);
            
            updatePath();

            $scope.myCssVar ="col-md-12";
            $scope.showme = false;
    	 }else{
    		 
    		 ProjectsService.setCurrentProject($scope.project.id).then($scope.save);
    	 }
    	 
    	 
    }

    $scope.delete = function(id) {
       ProjectsService.deleteStep($scope.project, id);
       $location.path('/project/'+project_id);
    }


    function updatePath(){
      console.log ("updatePath");
        var latlngs = new Array();
        var marckers = new Array();
        var listOfStep = $scope.project.steps;
        //console.log(listOfStep);
        listOfStep.sort(function(a,b){
          if(a.position < b.position)
            return(-1);
          else
            return(1);
        });

        listOfStep.forEach(function(entry) {

                var m = {};
                m['id'] = entry.id;
                m['lat'] = entry.lat;
                m['lng'] = entry.lng;
                latlngs.push(m);
                if (entry.isVisible == 0)
                  console.log ("vgfdbgfhbfghgfhgf  " +entry);
                if (entry.isVisible){
                  marckers.push(m);
                }

            $scope.markers = marckers;
        });

        $scope.paths = {
            p1: {
                color: '#008000',
                weight: 4,
                latlngs: latlngs
            }

        };
    }
});
