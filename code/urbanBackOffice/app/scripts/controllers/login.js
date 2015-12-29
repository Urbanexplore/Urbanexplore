'use strict';

angular.module('urbanBackOfficeApp')
  .controller('LoginCtrl', function ($scope, $timeout,$sce, $routeParams,$location){

$scope.loginT = function(){

  if ($scope.credentials != null){

    var tableLogin = new Array  ();
    tableLogin["julien.brouillard@dedale.info"] = "passwordDedale";
    tableLogin["barbara@packed.be"] = "urbanpacked";

    if (tableLogin[$scope.credentials.username] == $scope.credentials.password){
      $location.path('/projects');
    }
    else{
      console.log("login ko");
      alert("Le couple Login/Password n'a pas été reconnu");
    }
  }
  else{
    console.log("login ko");
    alert("Veuillez saisir un couple Login/Password");
  }

};

});
