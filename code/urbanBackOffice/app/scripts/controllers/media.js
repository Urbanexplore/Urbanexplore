'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:MediaCtrl
 * @description
 * # MediaCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('MediaCtrl', function ($scope, $timeout,$sce, $routeParams,$location, MediasService,  ProxyMediasService, $http, DTOptionsBuilder, DTColumnDefBuilder) {
                                  
    $scope.dtOptionsCart = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

  	var media_id = $routeParams.mediaId;
   
    $scope.medias    = new Array();
    $scope.media    = new Array();
    $scope.carts    = new Array();
    $scope.getCarts = new Array();
    $scope.video = false;
    
    var promiseData = ProxyMediasService.getData();
 
    promiseData.then(function(dataAll){
      $scope.carts = ProxyMediasService.getCartsFromData(dataAll);
    }).then(function(){
      var promiseMedia= ProxyMediasService.getMediaJsById(media_id);
      promiseMedia.then(function(d){
      $scope.media = d;
       
       
        if ($scope.media.typeMedia.toUpperCase().indexOf("VIDEO") > -1)
          $scope.video == true;
        else{
          
          $scope.video == false;
        }

      console.log($scope.video);
      if ($scope.carts.length != 0)
        $scope.getCarts = MediasService.getCartsInside(media_id, $scope.carts);

      });
    });



 	//************** Partie panier *******************
   $scope.alertsCart = new Array();

  $scope.closeAlertCart = function(index) {
    $scope.alertsCart.splice(index, 1);
  };

  var closeAlertCart = function(){
       $timeout(function(){
        $scope.alertsCart.splice($scope.alertsCart.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
  };


  $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
  }
  $scope.viewCart = function (id) {
    $location.path('cart/'+id);
  }


  $scope.deleteCart = function (id) {

    if( id != undefined){
      var promiseDelete = MediasService.deleteCart(id, $scope.carts);
      promiseDelete.then(function(){
        $scope.alertsCart.push ({ type: 'success', msg: 'Well done! The selected cart has been removed.' });
        closeAlertCart();
      })
    }else{
      $scope.alertsCart.push = ({ type: 'warning', msg: 'No cart selected.' });
      closeAlertCart();
    }


  }

  $scope.emptyCart = function (cart) {
      console.log (cart);
      if (cart.medias != undefined){
          var promiseEmpty = MediasService.emptyCart(cart);
          promiseEmpty.then(function(){
            $scope.alertsCart.push ({ type: 'success', msg: 'Well done! The cart is empty.' });
            closeAlertCart();
          });

        }else{
          $scope.alertsCart.push ({ type: 'warning', msg: 'The cart is already empty.' });
          closeAlertCart();

        }
  }

  $scope.saveCart = function() {
    //la datatable en ng-isolate-scope, cette fonction bug a partir du <tr>
    var promiseSaveCart = MediasService.saveCart($scope.newcart);
    promiseSaveCart.then(function(){
      $scope.carts.push($scope.newcart);
      $scope.newcart = {};
      $scope.alertsCart.push ({type: 'success', msg: 'Well done! the cart is created'});
      closeAlertCart();

    });

  }
});
