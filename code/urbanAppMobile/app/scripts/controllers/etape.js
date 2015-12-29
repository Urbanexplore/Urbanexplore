'use strict';

/**
 * @ngdoc function
 * @name urbanAppMobileApp.controller:EtapeCtrl
 * @description
 * # EtapeCtrl
 * Controller of the urbanAppMobileApp
 */
angular.module('urbanAppMobileApp')
  .controller('EtapeCtrl', function ($scope, $sce, $routeParams, $location,ProjectService, leafletEvents, $modal) {

    var step_id    = $routeParams.stepId;
    var options = {
        preventDefault: true
    };
    var element = document.getElementById('content');
    var hammertime = new Hammer(element, options);
    hammertime.on("dragup dragdown swipeup swipedown", function(ev){ });
    $scope.isCollapsed = true;

    var listOfStep = new Array();
    var marckers   = new Array();
    var latlngs    = new Array();
    var center = {} ;
    var nbSteps;

    $scope.project = new Array();

    var promiseProject = ProjectService.getProjectJS();
    promiseProject.then(function(data){
      $scope.project = data;
    //$scope.project = ProjectService.get(); 
    }).then(function(){ 
   
      $scope.step    = ProjectService.getStep(step_id, $scope.project);

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
              m['isVisible'] = entry.isVisible;
              m['position'] = entry.position;
              if (entry.isVisible){
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

      nbSteps = marckers.length;
      $scope.nbSteps = marckers.length;
      $scope.lastStepId = marckers[nbSteps-1].id;
      $scope.firstStepId = marckers[0].id;

  }); 

  $scope.next = function () {
       // console.log(marckers);
        var nextId =marckers[0];
        for (var i = marckers.length - 1; i >= 0; i--) {
          if (marckers[i].id == step_id){
            nextId = marckers[i+1].id;
            break;
          }
        }  
       if (nextId > marckers[nbSteps -1])
          nextId = marckers[nbSteps-1];
      $location.path('/etape/'+nextId);
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
       
        $location.path('/etape/'+previousId);
      }
  }

  $scope.trustSrc = function(src) {

     return $sce.trustAsResourceUrl(src);

  }

  $scope.getClass = function getClass(idx) {
    //console. log (idx);
    if (idx % 2 == 0 ) return "pull-right";
    else return "pull-left";

  }

  $scope.goHome = function(){
     $location.path('/home/');
  };

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


});
