'use strict';

/**
 * @ngdoc function
 * @name sitejsApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the sitejsApp
 */
angular.module('urbanBackOfficeApp')
  .controller('TestCtrl', function ($scope,$routeParams, $location, ProxyMediasService, ProjectsService, MediasService, $http,  urlStanbol, FileUploader, ProxyProjectsService, graphService, PublishService) {

  //console.log("testCtrl");
  //$scope.project.message = "coucou";
var graphUriCree = "";

var mockProject = {
  name : "aProject Test Unitaire 3"
};

 QUnit.test("Création d'un project", function( assert ) {
   assert.expect(14);
   var done = new Array();
   for(var i,i=0;i<13;i++){
     done[i]= assert.async();
   }
   assert.ok(true == true, "Debut creation graph project");
   var promiseCreate = ProjectsService.saveProject(mockProject);
   promiseCreate.then(function(graphUri){
     console.log(graphUri);
     assert.ok(true == true, "Création du project ok !");
     done[0]();
     graphUriCree = graphUri;
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
     console.log(graphUriCree);

     var promiseGraph = graphService.getLazyGraph(graphUriCree,parameters,false);
     promiseGraph.then(function(data){
         console.log(data);
         assert.ok(true == true, "chargement du project ok !");
         done[1]();
         var graph = data;


         var promise = ProxyProjectsService.getProjectJS();
         promise.then(function(data){
           var project = ProjectsService.get(data, mockProject.id);
           assert.ok(project.name == mockProject.name, "Propriete name : ok");
           done[2]();
           project.author = "JVX 3";
           var promiseSave = ProjectsService.saveProject(project);
           promiseSave.then(function(){
               var promiseReload = ProxyProjectsService.getProjectJS();
               promiseReload.then(function(data2){
                 console.log(data2);
                 var projectReload = ProjectsService.get(data2, project.id);
                 assert.ok(projectReload.author == project.author, "Changement prop author : OK");
                 done[3]();
               });
           });

           project.lat = 37.75;
           project.lng = -122.41;
           project.zoom = 15;
           var promiseDefineArea = ProjectsService.saveProject(project);
           promiseDefineArea.then(function(){
             var promiseReload2 = ProxyProjectsService.getProjectJS();
             promiseReload2.then(function(data3){
               var projectReloadArea = ProjectsService.get(data3, project.id);
               assert.ok(projectReloadArea.lat == project.lat, "Changement prop lat : OK");
               done[4]();
               assert.ok(projectReloadArea.lng == project.lng, "Changement prop lng : OK");
               done[5]();
               assert.ok(projectReloadArea.zoom == project.zoom, "Changement prop zoom : OK");
               done[6]();

               if(projectReloadArea.steps == null){
                 projectReloadArea.steps = new Array();
               }

              var iconC = {
                   type: 'awesomeMarker',
                   icon: 'tag',
                   markerColor: 'red'
               };

               var m1 = {
                   id : 1,
                   lat: 37.80,
                   lng: -122.42,
                   message: "SF",
                   focus: true,
                   draggable: true,
                   icon: iconC,
                   isVisible : true,
                   type : "step"

               };

                var step = ProjectsService.createNewStep(projectReloadArea,m1);
                ProjectsService.saveStep(projectReloadArea, step);
                step.title = "Etape 1 SF";

              //  console.log(step);

                var promiseUpdateProject = ProjectsService.saveProject(projectReloadArea);

                promiseUpdateProject.then(function(){
                  var promiseReload3 = ProxyProjectsService.getProjectJS();
                  promiseReload3.then(function(data){
                    var projectSteps = ProjectsService.get(data, project.id);
                    console.log(projectSteps);

                    var projectSteps = ProjectsService.get(data, project.id);
                    //var projectSteps = ProjectsService.get(data, project.id);

                    //var projectSteps = ProjectsService.get(data, project.id);
                    assert.ok(projectSteps.steps.length == 1, "Creation step ok");
                    done[7]();
                    console.log(projectSteps.steps);
                    assert.ok(projectSteps.steps[0].lat == 37.80, "La latitude de la step est bonne");
                    done[8]();
                    assert.ok(projectSteps.steps[0].lng == -122.42, "La longitude de la step est bonne");
                    done[9]();
                    console.log(projectSteps.steps[0]);
                    var idStep = projectSteps.steps[0]["@id"];
                    console.log(idStep);
                    var promiseDelete = ProjectsService.deleteStep(projectSteps, 1);
                    promiseDelete.then(function(){
                        var promiseReload4 = ProxyProjectsService.getProjectJS();
                        promiseReload4.then(function(data){
                          var projectStepDeleted = ProjectsService.get(data, project.id);
                          assert.ok(projectStepDeleted.steps.length==0, "Etape bien supprimee");
                          done[10]();
                        });
                    });

                  });
                  console.log(projectReloadArea);
                  projectReloadArea.homepage.description = "Description du projet";
                  projectReloadArea.homepage.learnMore = "Pour en savoir plus";
                  var promiseVirtualObject = ProjectsService.saveProject(projectReloadArea);
                  promiseVirtualObject.then(function(){
                    var promiseReload = ProxyProjectsService.getProjectJS();
                    promiseReload.then(function(data){
                      var projectVirtualTest = ProjectsService.get(data, project.id);
                      console.log(projectVirtualTest);
                      console.log(projectVirtualTest.homepage.description);
                      console.log(projectVirtualTest.homepage.learnMore);
                      assert.ok(projectVirtualTest.homepage.description == "Description du projet", "Test maj object virtuel, description : OK");
                      done[11]();
                      assert.ok(projectVirtualTest.homepage.learnMore == "Pour en savoir plus", "Test maj object virtuel, learnMore : OK");
                      done[12]();
                    });
                  });
                });
             });
           });
         });
         promise.catch(function(error){
           assert.ok(true == false, "proxy pb");
         });
     });
     promiseGraph.catch(function(){
       assert.ok(true == false, "Chargement du projet ko !");
     });


   });
   promiseCreate.catch(function(error){
     console.log(error);
     assert.ok(true == false, "Création du project ko !");
   });
});

QUnit.test("Création d'un Chariot", function( assert ) {
  assert.expect(4);
  var done1 = assert.async();
  var done2 = assert.async();
  var done3 = assert.async();


  assert.ok(true == true, "Debut creation graph chariot");

  var mockCart = {
    name :"Cart test unitaire"
  };

  var promiseSaveCart = MediasService.saveCart(mockCart);
  promiseSaveCart.then(function(){
    assert.ok(true == true, "création du chariot : ok");
    done1();
    var promise = ProxyMediasService.getCarts();
    promise.then(function(data){
      var carts = data;
      var nbCarts = carts.length;

      var cart = MediasService.getCart(carts,mockCart.id);
      assert.ok(cart.name == mockCart.name, "Function MediasService.getCart() : ok");
      done3();

      var promiseDeleteCart = MediasService.deleteCart(mockCart.id, carts);
      promiseDeleteCart.then(function(){
        var promiseAfterDelete = ProxyMediasService.getCarts();
        promiseAfterDelete.then(function(data){
          var carts2 = data;
          assert.ok(carts2.length == nbCarts - 1, "suppression du carts : ok");
          done2();
        }); //promiseAfterDelete
        promiseAfterDelete.catch(function(){
          assert.ok(true == false, "Suppression ko : event jamais atteint.");
        });
      });//promiseDeleteCart
    }); //promise


  });//promiseSaveCart
  promiseSaveCart.catch(function(){
    assert.ok(true == false, "création du chariot : ko");
  });

});

QUnit.test("Création d'un Média", function( assert ) {
  assert.expect(8);
  assert.ok(true == true, "Debut creation graph média");

  var m = {title: "test.jpg",typeMedia: "jpg", source :'interne',  link :'/images/test.JPG', description:'Photo pour un test unitaire'};
  /* A ajouter lorsqu'on fait des tests asynchrones */
  var done1 = assert.async();
  var done2 = assert.async();
  var done3 = assert.async();
  var done4 = assert.async();
  var done5 = assert.async();
  var done6 = assert.async();
  var done7 = assert.async();

  var promiseMedia = ProxyMediasService.getMedias();
  promiseMedia.then(function(data){
    var medias = data;
    var nbMedias = medias.length;
    var promiseAddMedia = MediasService.addMedia(m);
    promiseAddMedia.then(function(idMedia){
      assert.ok(true == true, "creation graph media : OK");
      done1();
      var promiseMedia = ProxyMediasService.getMedias();
      promiseMedia.then(function(data){
        var mediasAfterAdded = data;
        assert.ok(nbMedias == mediasAfterAdded.length-1, "media bien ajoute");
        done2();
        var media = MediasService.getMedia(data,idMedia);
        assert.ok(media.title == "test.jpg", "getMedia(), titre : ok");
        done3();
        assert.ok(media.link == "/images/test.JPG", "getMedia(), link : ok");
        done4();

        var mockCart = {
          name :"a Cart test unitaire"
        };

        var promiseSaveCart = MediasService.saveCart(mockCart);
        promiseSaveCart.then(function(){
          var promise = ProxyMediasService.getCarts();
          promise.then(function(data){
            var carts = data;
            var cart = MediasService.getCart(carts,mockCart.id);
            console.log(media.id);
            console.log(mockCart.id);
            var promiseAdd = MediasService.addToCartMedia(media.id,mockCart);
            promiseAdd.then(function(){
              console.log(cart);
              var promise = ProxyMediasService.getCarts();
              promise.then(function(data){
                var cart = MediasService.getCart(data,mockCart.id);
                console.log(cart);
                assert.ok(cart.medias.length > 0, "MediasService.addToCartMedia : Ok");
                done6();
                var promiseDeleteMedia = MediasService.deleteMedia(idMedia, mediasAfterAdded);
                promiseDeleteMedia.then(function(){
                  var promiseMedia = ProxyMediasService.getMedias();
                  promiseMedia.then(function(data){
                    var mediasAfterDeleted = data;
                    assert.ok(nbMedias = mediasAfterDeleted.length, "Suppression du média : ok");
                    done5();
                    var promiseDeleteCart = MediasService.deleteCart(mockCart.id, carts);
                    promiseDeleteCart.then(function(){
                        assert.ok(true == true, "Suppression du cart : Ok");
                        done7();
                        // Leave no trace
                      });



                  });
                });
              });
            });
          });
        });


      });

    });

  



});



});

QUnit.test("Publish", function( assert ) {
  assert.expect(4);
  assert.ok(true == true, "Debut download tiles");
  var project = { id : "idProjectTest", name : "aProject Test Unitaire 3", 
        lat:56.94951, lng :24.10810, zoomLimit: 20,minZoom : 15, maxZoom : 18,radius : 1,
        steps :[
          { id :1,
            medias:{ id:"a1b7d",  link:"http://www.youtube.com/v/EWARIVknp30",  source:"Youtube",  typeMedia:"VIDEO"}
          }
        ]
      };
  
  var doneP1 = assert.async();
  var doneP2 = assert.async();
  var doneP3 = assert.async();
  
  
   var promisePublishMap = PublishService.publishMap(project);
   promisePublishMap.then(function(d){
      assert.ok(true == true, "download tiles : OK");
      doneP1();
    
      var promiseDYoutube = PublishService.downloadVideoYoutube("http://www.youtube.com/v/EWARIVknp30","idProjectTest");
      promiseDYoutube.then(function(d){
        assert.ok(true == true, "download youtube : OK");
        doneP2();
        var promiseDYoutube = PublishService.downloadImage("http://biblio.unibe.ch/adam/ryhiner/2618/Ryh_2618_20_A.jpg","aeff0","idProjectTest");
        promiseDYoutube.then(function(d){
          assert.ok(true == true, "download image : OK");
          doneP3();
        });
      });
    });    
});








});
