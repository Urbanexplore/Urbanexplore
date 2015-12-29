'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:MediaCtrl
 * @description
 * # MediaCtrl
 * Controller of the sitejsApp
 */


angular.module('urbanBackOfficeApp')
  //.controller('MediasCtrl',  function ($scope, $sce, $routeParams,$location, urlStanbol, MediasService, ProjectsService) {
  .controller('MediasCtrl', MediasCtrl);

function MediasCtrl($scope, $timeout, $sce, $routeParams,$location, urlStanbol, MediasService, ProjectsService, $compile,DTOptionsBuilder, DTColumnDefBuilder,DTColumnBuilder, ProxyProjectsService,ProxyMediasService, FileUploader, $http) {

  $scope.dtOptionsMedia = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
  $scope.dtOptionsCart  = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');


  $scope.titleView = "MÉDIATHÈQUE & PANIERS";
 	$scope.subTitleView1 = "Medias"
 	$scope.subTitleView2 = "Paniers"

 	//$scope.medias = MediasService.listMedias();
  $scope.medias    = new Array();
  $scope.carts    = new Array();
  var stepsByProject = new Array();
  

  var promiseData = ProxyMediasService.getData();
  promiseData.then(function(dataAll){
    $scope.carts = ProxyMediasService.getCartsFromData(dataAll);
    $scope.medias = ProxyMediasService.getMediasFromData(dataAll);
    
    var promiseP =  ProxyProjectsService.getProjectsFromData(dataAll);
    promiseP.then(function(dataP){
      $scope.projects =dataP;
      console.log ($scope.projects);
    }).then(function(){  
    
      $scope.projects.forEach(function(p,i){

          if(p.steps.length != 0){
            var namep = p.name;
            var idp = p.id;
            p.steps.forEach(function(d,i){
                if (d.isVisible){
                  var m = {};
                  m['id'] = d["@id"];
                  m['idProject'] = idp;
                  m['title'] = d.title;
                  m['group']= namep;
                  m['selected'] = false;

                  stepsByProject.push(m);
                }
            });
        }
      });
    $scope.stepsOption = stepsByProject;
  });
});    


 	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  }

  $scope.goNext = function (hash) {
		$location.path(hash);
 	}

//***************************carts***********************************
  $scope.alertsCart = new Array();
  $scope.closeAlertCart = function(index) {
    $scope.alertsCart.splice(index, 1);
  };

  var closeAlertCart = function(){
       $timeout(function(){
        $scope.alertsCart.splice($scope.alertsCart.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
  };


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




//****************************Select  medias******************************************

//$scope.isSelectedAll = false;
//$scope.checkoxes = true;
$scope.selected = [];

//fonctions utiles : selection
var updateSelected = function(action, id) {

  if (action === 'add' && $scope.selected.indexOf(id) === -1) {
    $scope.selected.push(id);
  }
  if (action === 'remove' && $scope.selected.indexOf(id) !== -1) {
    $scope.selected.splice($scope.selected.indexOf(id), 1);
  }
};

$scope.updateSelection = function($event, id) {
  //console.log ("updateSelection "+ id);
  var checkbox = $event.target;
  var action = (checkbox.checked ? 'add' : 'remove');
  //var action = (!$scope.checkoxes ? 'add' : 'remove');//updateCheckboxes
  //console.log (action);
  updateSelected(action, id);
};

$scope.selectAll = function($event) {
  //$scope.checkoxes = !$scope.checkoxes;


  var checkbox = $event.target;
  var action = (checkbox.checked ? 'add' : 'remove');
  for ( var i = 0; i < $scope.medias.length; i++) {
    var entity = $scope.medias[i];
    updateSelected(action, entity);
  }
};



$scope.getSelectedClass = function(entity) {
  return $scope.isSelected(entity) ? 'selected' : '';
};

$scope.isSelected = function(id) {
  return $scope.selected.indexOf(id) >= 0;
};


$scope.isSelectedAll = function() {
  //console.log ($scope.medias.length);
  if ($scope.medias.length != 0)
    return $scope.selected.length === $scope.medias.length;
  else
    return 0;
};

//******************************CRUD Media*******************************

$scope.alerts = new Array();
$scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
};

var closeAlert = function(){
       $timeout(function(){
        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
};

$scope.deleteMedia = function (id, medias) {

  if (id != null){
    console.log(id);
    var promiseDelete = MediasService.deleteMedia(id, medias);
    promiseDelete.then(function(){

      $scope.alerts.push ({ type: 'success', msg: 'Well done! The selected media has been removed.' });
      closeAlert();
    });
  }else{
    $scope.alerts.push = ({ type: 'warning', msg: 'No media selected.' });
    closeAlert();
  }

}
//bouton commun : selection multiple
$scope.deleteMedias = function (medias) {
  console.log ($scope.selected);//return;
 if($scope.isSelectedAll()){ //all seleted
      var promise =MediasService.deleteAllMedia(medias);
      promise.then(function(){
        $scope.alerts.push ({ type: 'success', msg: 'All medias have been removed.' });
        closeAlert();
      });
  }else if ($scope.selected.length > 0){ //selected objects medias
    $scope.selected.forEach(function(p,i){
      console.log (p);
      MediasService.deleteMedia(p.id, medias);


     });
    $scope.alerts.push({ type: 'success', msg: 'Well done! The selected media have been removed.' });
    closeAlert();

  }else{ //rien n'est selectionné
    console.log ("selected id is null");
    $scope.alerts.push ({type: 'warning', msg: 'No media selected.' });
    closeAlert();

  }

}

//ajout multiple de media(s) to cart : bouton commun
$scope.addToCart = function (cart) {
  console.log (cart.id);

  //console.log ($scope.selected);
  if ($scope.selected.length > 0){ //selected objects medias
    $scope.selected.forEach(function(p,i){
      console.log (p); //l'objet media
      var promise = MediasService.addToCartMedia(p, cart);
      promise.then(function(){
        $scope.alerts.push ({ type: 'success', msg: 'Well done! The media(s) have been added to cart.' });
        closeAlert();
      });
    });


  }else{ //rien n'est selectionné
    console.log ("selected id is null");
    $scope.alerts.push ({ type: 'warning', msg: 'No media selected.' });
    closeAlert();
  }

}
//Ajout d'un seul media
$scope.addMediaToCart = function (media, cart) {

  console.log (media.id +"  "+ cart.id +"  "+$scope.carts.length);

  if (media.id != null && cart.id != null){
    //addToCartMedia
    //MediasService.addToCartMedia(media, cartId);
    var promise = MediasService.addToCartMedia(media, cart);
    //addMediaToCartById(media,cartId, $scope.carts);
    promise.then(function(){

      //loadCarts(); //mettre à jour les paniers
      $scope.alerts.push ({ type: 'success', msg: 'Well done! The media have been added to cart :' +cart.name });
      closeAlert();
    });

  }else{
    console.log ("Nothing selected to add to cart " + cart.id);
    $scope.alerts.push ({ type: 'warning', msg: 'No media selected to add to cart.' });
    closeAlert();

  } //rien n'est selectionné


}


//****************************** Ajouter un media à une etape*****************
/*
var promise = ProxyProjectsService.getProjectJS(true, false);

promise.then(function(data){
  $scope.projects = data;
  
  //console.log ($scope.projects);
  var stepsByProject = new Array();
  $scope.projects.forEach(function(p,i){

      if(p.steps.length != 0){
        var namep = p.name;
        var idp = p.id;
        p.steps.forEach(function(d,i){
            if (d.isVisible){
              var m = {};
              m['id'] = d["@id"];
              m['idProject'] = idp;
              m['title'] = d.title;
              m['group']= namep;
              m['selected'] = false;

              stepsByProject.push(m);
            }
        });
    }
  });
  $scope.stepsOption = stepsByProject;
});
*/

//ajouter media(s) à une etape selectionnée

var stepsSelected = new Array();

$scope.$watch("dynModelAll",function(v){
 // console.log ("coucou All");
  var uriToFix = "http://tofix.uri/";
  stepsSelected = [];
  if (v != undefined || v != null){
    v.forEach(function(d,i){
      console.log(d.idProject + "," + d.id);
      console.log(d);
      var step = ProjectsService.getStepByProjectId(d.idProject,d.id, $scope.projects);
      console.log(step);

      if ($scope.selected.length > 0){ //selected ids
        $scope.selected.forEach(function(p,i){
          console.log (p)// p represente tout l'objet media

          MediasService.addToStepMedia(p, step, $scope.medias);

          var project = ProjectsService.get($scope.projects,d.idProject);
          console.log (project);
          ProjectsService.saveProject(project);


        });

        $scope.alerts.push ({type: 'success', msg: 'Well done! The media have been added to selected step : '+step.title });
        closeAlert();

      }else{ //rien n'est selectionné
        console.log ("Nothing selected to add to step " + v.title);
        $scope.alerts.push ({type: 'warning', msg: 'Nothing selected to add to step ' + v.title});
        closeAlert();
      }


    });
  }

 //console.log (stepsSelected);
},true);

//************* uploader une image depuis le disque dur *********
$scope.uploader = new FileUploader({

});

$scope.uploadFile = function(){

        $http.defaults.headers.common['Authorization'] = urlStanbol.pwd;
        if ($scope.myFile != undefined){
          var file = $scope.myFile;
          console.log($scope.myFile);
          var extension = file.name.split(".").pop();
          var fileName = new Date().getTime()+'.'+extension;
          //fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          var uploadUrl = urlStanbol.address+"/mediamanagement/fileUpload?form="+file+"&fileName="+fileName;
          
         var fd = new FormData();
          fd.append('file', file);
          $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          })
          .success(function(){

            var m = {title: file.name,typeMedia: file.type, source :'interne',  link :'/images/'+fileName, description:''};
            //console.log(m);
            var promiseAddMedia = MediasService.addMedia(m);
            promiseAddMedia.then(function(){
              $scope.showImage = true;
              $scope.isUploadFormOpen = false;
              $scope.medias.push(m);
             
            });

            //$scope.medias = "images/"+fileName;

          })
          .error(function(error){
            $scope.alerts.push ({ type: 'danger', msg: 'Error '+error+'.' });
            closeAlert();
          });
        }else{
          $scope.alerts.push ({ type: 'warning', msg: 'No file selected to upload.' });
          closeAlert();

        }

}


}
