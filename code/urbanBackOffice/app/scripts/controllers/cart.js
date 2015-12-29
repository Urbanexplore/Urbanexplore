'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('CartCtrl', function ($scope,$http,$timeout,$routeParams,$location, $resource,$sce, urlStanbol, ProjectsService, MediasService,DTOptionsBuilder, DTColumnDefBuilder,  ProxyProjectsService) {



    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    var cart_id = $routeParams.cartId;

    var promise = ProxyProjectsService.getCartJS();
    promise.then(function(data){

      $scope.carts = data;
      $scope.cart = MediasService.getCart(data,cart_id);
      console.log($scope.cart);

    });

     $scope.isVideo = function(input){
    console.log (input);
    if (input.toUpperCase().indexOf("VIDEO") > -1 )
        return true;
      else
       return false;
    }

    $scope.goNext = function (hash) {
    	$location.path(hash);
  	}
  	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	}

  });
