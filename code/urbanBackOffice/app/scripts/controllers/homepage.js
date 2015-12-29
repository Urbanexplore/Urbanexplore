'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('HomepageCtrl', function ($scope,$sce, $timeout,$routeParams, $location, ProjectsService,$http,  urlStanbol, FileUploader, ProxyProjectsService) {

   	$scope.alerts = new Array();
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    var closeAlert = function(){
       $timeout(function(){
        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
    };
    $scope.titleView = "Management home page";
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

    var project_id = $routeParams.projectId;
    //var promise = ProxyProjectsService.getProjectJS(project_id);
    var promise = ProxyProjectsService.getProjectJsById(project_id, true, false);
    promise.then(function(data){
    
      $scope.project = data;
      
    });

  	$scope.save = function() {
      console.log("je save un truc");
    	ProjectsService.saveProject($scope.project);
    	$location.path('/project/'+project_id);
  	}

  	$scope.uploader = new FileUploader({

  });
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
  	$scope.uploadFile = function(){

       
        $http.defaults.headers.common['Authorization'] = urlStanbol.pwd;

        console.log($scope.myFile);

        var file = $scope.myFile;
        //console.log(file.name);
        var extension = file.name.split(".").pop();
        var fileName = new Date().getTime()+'.'+extension;
        var uploadUrl = urlStanbol.address+"/mediamanagement/fileUpload?fileName="+fileName;
        console.warn("TODO : attention Url en dure coté java");
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
          console.log(data);
          $scope.project.homepage.images = "images/"+fileName;
         
          console.warn ("penser a supprimer le fichier sur disque dur");
          var promise = ProjectsService.saveProject($scope.project);
          promise.then(function(d){
            $scope.showImage = true;
            console.log("upload success");
            $scope.alerts.push ({ type: 'success', msg: 'The file uploaded with success.' });
            closeAlert();
          });
          
        })
        .error(function(data){
          $scope.alerts.push ({ type: 'danger', msg: 'Error '+error+'.' });
          closeAlert();
          console.log(data);
          console.log("error ????")
        });
};


});
