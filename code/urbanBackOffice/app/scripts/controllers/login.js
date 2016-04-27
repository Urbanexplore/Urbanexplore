'use strict';

angular.module('urbanBackOfficeApp')
  .controller('LoginCtrl', function ($scope, $timeout,$sce, $routeParams,$location){

$scope.loginT = function(){

  if ($scope.credentials != null){

    var tableLogin = new Array  ();
    tableLogin["julien.brouillard@dedale.info"] = "passwordDedale";
    tableLogin["barbara@packed.be"] = "urbanpacked";
    tableLogin["anna.desantis@ingv.it"] = "61atTannybau";

    if (tableLogin[$scope.credentials.username] == $scope.credentials.password){
      $location.path('/projects');
    }
    else{
      console.log("login ko");
      alert("Your login and/or password is not recognized");
    }
  }
  else{
    console.log("login ko");
    alert("Please fill your Login/Password");
  }

};

});
