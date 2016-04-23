'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:StepCtrl
 * @description
 * # StepCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('StepCtrl', function ($scope, $sce, $timeout,$routeParams, $location, ProjectsService, graphService, MediasService, $http,  urlStanbol, FileUploader, ProxyProjectsService, ProxyMediasService) {

    console.log($scope);
    
    $scope.tinymceOptions = {
      menubar:false,
      statusbar: false,
      theme: "modern",
      plugins: [
          "advlist autolink lists link image charmap print preview hr anchor pagebreak",
          "searchreplace wordcount visualblocks visualchars code fullscreen",
          "insertdatetime media nonbreaking save table contextmenu directionality",
          "emoticons template paste textcolor"
      ],
      toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | preview media | forecolor backcolor emoticons",
      handle_event_callback: function (e) {
            // put logic here for keypress

      }
    };
    
 	$scope.titleView = "Step information";
 	$scope.subTitleView1 = "Search";
 	$scope.subTitleView2 = "Medias";


 	 var step_id    = $routeParams.stepId;
 	 var project_id = $routeParams.projectId;
 	 console.log(project_id);
 	 var listOfMedias = new Array();

 	 var step22 = [];
 	 
 	 //TOOD : review all this code can be mutch more simple and efficient (with the création of a good projet object directly)

    var promise = ProxyProjectsService.getProjectJsById(project_id, true, true);
   
    promise.then(function(data){
    	console.log("*********");
    	console.log(data);
    	$scope.project = data;
    })
    .then(function(){

	    var promiseStep =  ProjectsService.getStepByPosition($scope.project,step_id);
	    promiseStep.then(function(dataStep){
	      $scope.step = ProxyProjectsService.createStep(dataStep);
	      step22 = dataStep;
	    })
	    .then(function(){
		     //step22 = ProjectsService.getStepByPosition($scope.project,step_id);
		     console.log(step22);
		     console.log(step22.medias);

		     listOfMedias = step22.medias;
		     
		     if(listOfMedias){
		    	 listOfMedias.sort(function(a,b){
		             if(a.ordreDsStep < b.ordreDsStep)
		               return(-1);
		             else
		               return(1);
		           });
		
		         $scope.step.medias = listOfMedias; 
		     }      
	    });

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

   $scope.alertsStep = new Array();
    $scope.closeAlertStep = function(index) {
      $scope.alertsStep.splice(index, 1);
    };

    var closeAlertStep = function(){
       $timeout(function(){
        $scope.alertsStep.splice($scope.alertsStep.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
    };
  
    //var step = new Array();

   $scope.isVideo = function(input){


    if (input != undefined){

      if (input.toUpperCase().indexOf("VIDEO") > -1 )
          return true;
        else
         return false;
    }
  }



  //$scope.project = ProjectsService.get(project_id);


 //console.log ($scope.step);

  $scope.save = function() {
    //$scope.step.visible = true;
    //ProjectsService.saveStep($scope.project,$scope.step);
	  console.log('******seeeeeeeeeeeeeeeeeeeeeeeeeeeee********');
	  console.warn($scope.step);
	  $scope.step.saveObj($scope.step);
    
	  //ProjectsService.saveProject($scope.project, $scope.center);
    
    //$scope.project.step = {};
    //$location.path('/project/'+project_id);
  }

  $scope.editProjectRoute = function() {

      $location.path('/projectroute/'+project_id+'/step/'+step_id);
      ///project/a6ba1/step/1
  }

  $scope.editStepViewIpad = function() {

      $location.path('/stepViewIpad/'+project_id+'/step/'+step_id);
      console.warn("TODO : la page doit presenter un aperçu de la vue step pours l'app mobile");
  }

  $scope.goNext = function (hash) {
        $location.path(hash);
  }

  $scope.editStepGraph = function(step) {

        if(step != null){
          $location.path('/projectroutestep/'+project_id+'/step/'+step.id);
        }

  }

  $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

  $scope.deleteMediaFromStep = function(mediaId) {

      var promise= ProjectsService.deleteMediaFromStep($scope.step,mediaId, $scope.project);
       promise.then(function(){
         $scope.alerts.push ({type: 'success', msg: 'Well done! The media have been removed' });
        closeAlert();

      });
  }
//*************upload files*********************
  $scope.uploader = new FileUploader({

    });
$scope.uploadFile = function(){

        $http.defaults.headers.common['Authorization'] = urlStanbol.pwd;
        var file = $scope.myFile;
        //console.log(file.name);
        var extension = file.name.split(".").pop();
        var fileName = new Date().getTime()+'.'+extension;
        var uploadUrl = urlStanbol.address+"/mediamanagement/fileUpload?form="+file+"&fileName="+fileName;

        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(d){
          console.log (d);
          $scope.step.visual = "/images/"+fileName;
          $scope.showImage = true;
          ProjectsService.saveProject($scope.project, $scope.center);
          $scope.alertsStep.push ({ type: 'success', msg: 'The file uploaded with success.' });
          closeAlertStep();
        })
        .error(function(){
           $scope.alertsStep.push ({ type: 'danger', msg: 'Error '+error+'.' });
            closeAlertStep();
        });
};


$scope.updateMedia = function(mediaTmp){
    console.log(mediaTmp);
    var baseUrl = "http://tofix.uri/";


    var idGraph = baseUrl + mediaTmp.id;
    console.log(idGraph);


    var facetteName = "data";
    var userName = "myUser";

    var parameters = {
            scheme : '', //the default one
            queryFn : function(/*string*/ uri){
                return {
                    method : 'GET',
                    url : urlStanbol.address+'/graph/'+facetteName+'/'+userName+'/'+uri,
                };
            }
    };
    console.log(idGraph);
    var promiseGraph = graphService.getLazyGraph(idGraph,parameters,false);
    promiseGraph.then(function(dataGraph){
      var graph = dataGraph;
      console.log(graph);
      //var promiseSave = ProxyMediasService.saveObj(mediaTmp,graph);
      //var promiseSave = ProxyProjectsService.saveObj(mediaTmp,graph);
      var promiseSave = ProxyProjectsService.saveMediaJS(mediaTmp,graph);
      promiseSave.then(function(){
          console.log("update media done");
          $scope.alerts.push ({type: 'success', msg: 'Well done! The media have been updated' });
        closeAlert();

      });
    });




}

});
