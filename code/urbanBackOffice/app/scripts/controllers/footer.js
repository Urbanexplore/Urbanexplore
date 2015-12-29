'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('FooterCtrl', function ($scope,$timeout, $http,  urlStanbol, FileUploader, $routeParams, $location, ProjectsService, ProxyProjectsService) {

 	
    $scope.alerts = new Array();

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    var closeAlert = function(){
       $timeout(function(){
        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
    };
  $scope.titleView = "Management footer";

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
   // var promise = ProxyProjectsService.getProjectJS(project_id);
    var promise = ProxyProjectsService.getProjectJsById(project_id, true, false);
    promise.then(function(data){
     // $scope.projects = data;
      //$scope.project = ProjectsService.get(data,project_id);
      $scope.project = data;
      console.log ( $scope.project.footer);
    });


    $scope.save = function() {
    	ProjectsService.saveProject($scope.project);
    	//$location.path('/project/'+project_id);
  }

  $scope.uploader = new FileUploader({

  });
$scope.uploadFile = function(){

        
        $http.defaults.headers.common['Authorization'] = urlStanbol.pwd;
        var file = $scope.myFile;
        //console.log(file.name);
        var extension = file.name.split(".").pop();
        var fileName = new Date().getTime()+'.'+extension;
        var uploadUrl = urlStanbol.address+"/mediamanagement/fileUpload?fileName="+fileName;
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(d){
          console.log(d);
          $scope.project.footer.image = "images/"+fileName;
          ProjectsService.saveProject($scope.project);
          $scope.showImage = true;
          
          $scope.alerts.push ({ type: 'success', msg: 'The file uploaded with success.' });
          closeAlert();
        })
        .error(function(){
          console.log("upload error");
          $scope.alerts.push ({ type: 'danger', msg: 'Error '+error+'.' });
            closeAlert();
        });
};

});
