'use strict';

/**
 * @ngdoc function
 * @name urbanBackOfficeApp.controller:Search1Ctrl
 * @description
 * # Search1Ctrl
 * Controller of the urbanBackOfficeApp
 */


angular.module('urbanBackOfficeApp')
  .controller('SearchCtrl',  function($scope, $timeout,$http, urlStanbol, MediasService,ProjectsService, DTOptionsBuilder,$compile, DTColumnBuilder, DTColumnDefBuilder, ProxyMediasService, ProxyProjectsService) {

  $scope.titleView = "Search";
  $scope.subTitleView1 = "Results";

  $scope.searchParam = MediasService.getSearchParams();
  $scope.selectionParam = MediasService.getSearchParams();

  $scope.carts    = new Array();
  $scope.medias    = new Array();
  var stepsByProject = new Array();
  

  var promiseData = ProxyMediasService.getData();
  promiseData.then(function(dataAll){
    $scope.carts = ProxyMediasService.getCartsFromData(dataAll);
    $scope.medias = ProxyMediasService.getMediasFromData(dataAll);// pour la partie add to mediatheque
    var promiseP =  ProxyProjectsService.getProjectsFromData(dataAll);
    promiseP.then(function(dataP){
      $scope.projects = dataP;
      //console.log ($scope.projects);
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

 $scope.alertsSearch = new Array();
    $scope.closeAlertSearch = function(index) {
      $scope.alertsSearch.splice(index, 1);
  };

  var closeAlertSearch = function(){
       $timeout(function(){
        $scope.alertsSearch.splice($scope.alertsSearch.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
  };


 //selected types
  $scope.modelContainerT=[];
  angular.forEach($scope.searchParam.types,function(item){
    if (item.value != "IMAGE")
      $scope.modelContainerT.push({item:item,checked:false });
    else
      $scope.modelContainerT.push({item:item,checked:true });
  });
  ////selected sources
  $scope.modelContainerS=[];
  angular.forEach($scope.searchParam.sources,function(item){
    //console.log (item.value);
   if (item.value != "Europeana")
    $scope.modelContainerS.push({item:item,checked:false });
  else
    $scope.modelContainerS.push({item:item,checked:true });
  });

  $scope.modelContainerM=[];

  var valuesT = new Array();
  var valuesS = new Array();
  var valuesM = new Array();

  $scope.selectedType=function(id){
    valuesT.push(id);
  };

  $scope.selectedSource=function(id){
    valuesS.push(id);
  };

$scope.selectedMedia=function(id){
    //console.log ("idMediaScope"+id);
    valuesM.push(id);
  };

  var paramsT ="";
  var paramsS ="";
  var paramsM ="";
  var typesChecked = new Array();
  var sourcesChecked = new Array();
  var mediasChecked = new Array();

$scope.$watch("modelContainerT",function(v){
  //console.log(v);
  paramsT = "";
  typesChecked = [];

  v.forEach(function(d,i){
    if (d.checked){
      paramsT+="&type="+d.item.value;
      typesChecked.push(d.item.value);
    }
  });
 //console.log (paramsT);
},true);

$scope.$watch("modelContainerS",function(v){
  //console.log(v);
  paramsS = "";
  sourcesChecked = [];

  v.forEach(function(d,i){
    if (d.checked){
      paramsS+="&source="+d.item.value;
      sourcesChecked.push(d.item.value);
    }
  });
 //console.log (paramsS);
},true);

$scope.$watch("modelContainerM",function(v){
  paramsM = "";
  mediasChecked = [];
  //console.log(v);
  if (v != undefined){
    v.forEach(function(d,i){
      if (d.checked){
        paramsM +="&media="+d.item.value;
        mediasChecked.push(d.item.value);
      }
    });
  }
 // console.log(mediasChecked);
},true);



$scope.dtOptionsI = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });

$scope.dtOptionsEV = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });

$scope.dtOptionsS = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });

$scope.dtOptionsT = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });

$scope.dtOptions3D = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });

$scope.dtOptionsYV = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });
$scope.dtOptionsWT = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });


$scope.dtColumnsYV = [
  DTColumnBuilder.newColumn(null).withTitle('').notSortable()
    .renderWith(function(data, type, full, meta) {
      //dtOptionsYV.data['+meta.row+']
      return '<input type="checkbox" name="selected" ng-checked="isSelected(dtOptionsYV.data['+meta.row+'])" ng-click="updateSelection($event, dtOptionsYV.data['+meta.row+'])">';
      }),
  DTColumnBuilder.newColumn(null).withTitle('Video Youtube')
    .renderWith(function(data, type, full, meta) {
      return '<a href="#"><embed width="200" height="130" src="'+data.link+'"></a>';
    }),

  DTColumnBuilder.newColumn(null).withTitle('Title')
    .renderWith(function(data, type, full, meta) {
      return '<a target="_blank" href="'+data.link+'">'+truncate(data.title, 30)+'</a>';
    })
];

$scope.dtColumnsWT = [
  DTColumnBuilder.newColumn(null).withTitle('').notSortable()
    .renderWith(function(data, type, full, meta) {
      //dtOptionsYV.data['+meta.row+']
      return '<input type="checkbox" name="selected" ng-checked="isSelected(dtOptionsWT.data['+meta.row+'])" ng-click="updateSelection($event, dtOptionsWT.data['+meta.row+'])">';
      }),


  DTColumnBuilder.newColumn(null).withTitle('Text Wikipedia')
    .renderWith(function(data, type, full, meta) {
      return truncate(data.content, 300);
    }),

  DTColumnBuilder.newColumn(null).withTitle('Title')
    .renderWith(function(data, type, full, meta) {
      return '<a target="_blank" href="'+data.link+'">'+truncate(data.title, 30)+'</a>';
    })
];
$scope.dtColumnsEV = [
  DTColumnBuilder.newColumn(null).withTitle('').notSortable()
    .renderWith(function(data, type, full, meta) {
      return '<input type="checkbox" name="selected" ng-checked="isSelected(dtOptionsEV.data['+meta.row+'])" ng-click="updateSelection($event, dtOptionsEV.data['+meta.row+'])">';
     ;

    }),


    DTColumnBuilder.newColumn(null).withTitle('Video Europeana')
    .renderWith(function(data, type, full, meta) {
      return '<a target="_blank" href="'+data.link+'"><img width="200" height="130" src="'+data.link+'"/></a>';
      //return '<a target="_blank" href="'+data.guid+'"><img width="200" height="130" src="'+data.edmPreview+'"/></a>';

    }),


  DTColumnBuilder.newColumn(null).withTitle('Title')
    .renderWith(function(data, type, full, meta) {
      return '<a target="_blank" href="'+data.guid+'">'+truncate(data.title, 30)+'</a>';
    })

];
$scope.dtColumnsI = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
          .renderWith(function(data, type, full, meta) {
           return '<input type="checkbox" name="selected" ng-checked="isSelected(dtOptionsI.data['+meta.row+'])" ng-click="updateSelection($event, dtOptionsI.data['+meta.row+'])">';
     ;

        }),

        DTColumnBuilder.newColumn(null).withTitle('IMAGE link' )
            .renderWith(function(data, type, full, meta) {
              //return '<a target="_blank" href="'+data.guid+'"><img width="78" height="100" src="'+data.edmPreview+'"/></a>';
              return '<a target="_blank" href="'+data.link+'"><img width="78" height="100" src="'+data.link+'"/></a>';
            }),

        DTColumnBuilder.newColumn(null).withTitle('Title')
            .renderWith(function(data, type, full, meta) {
                return '<a target="_blank" href="'+data.guid+'">'+truncate(data.title, 30)+'</a>';
        })
];
$scope.dtColumnsS = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
          .renderWith(function(data, type, full, meta) {
            return '<input type="checkbox" name="selected" ng-checked="isSelected(dtOptionsS.data['+meta.row+'])" ng-click="updateSelection($event, dtOptionsS.data['+meta.row+'])">';
     ;
        }),
        DTColumnBuilder.newColumn(null).withTitle('SOUND' )
            .renderWith(function(data, type, full, meta) {
                //return '<a target="_blank" href="'+data.guid+'"><img width="78" height="100" src="'+data.edmPreview+'"/></a>';
                return '<a target="_blank" href="'+data.link+'"><img width="78" height="100" src="'+data.link+'"/></a>';
            }),

        DTColumnBuilder.newColumn(null).withTitle('Title')
            .renderWith(function(data, type, full, meta) {
                return '<a target="_blank" href="'+data.guid+'">'+truncate(data.title, 30)+'</a>';
        })


];
$scope.dtColumnsT = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
          .renderWith(function(data, type, full, meta) {
           return '<input type="checkbox" name="selected" ng-checked="isSelected(dtOptionsT.data['+meta.row+'])" ng-click="updateSelection($event, dtOptionsT.data['+meta.row+'])">';
     ;
        }),


        DTColumnBuilder.newColumn(null).withTitle('TEXT' )
          .renderWith(function(data, type, full, meta) {
            //return '<a target="_blank" href="'+data.guid+'"><img width="78" height="100" src="'+data.edmPreview+'"/></a>';
            return '<a target="_blank" href="'+data.link+'"><img width="78" height="100" src="'+data.link+'"/></a>';
          }),


        DTColumnBuilder.newColumn(null).withTitle('Title')
            .renderWith(function(data, type, full, meta) {
                return '<a target="_blank" href="'+data.guid+'">'+truncate(data.title, 30)+'</a>';
        })


];
$scope.dtColumns3D = [
        DTColumnBuilder.newColumn(null).withTitle('').notSortable()
            .renderWith(function(data, type, full, meta) {
             return '<input type="checkbox" ng-selected="" name="selected" ng-checked="isSelected(dtOptions3D.data['+meta.row+'])" ng-click="updateSelection($event, dtOptions3D.data['+meta.row+'])">';
     ;
        }),
        DTColumnBuilder.newColumn(null).withTitle('3D' )
            .renderWith(function(data, type, full, meta) {
              //return '<a target="_blank" href="'+data.guid+'"><img width="78" height="100" src="'+data.edmPreview+'"/></a>';
              return '<a target="_blank" href="'+data.link+'"><img width="78" height="100" src="'+data.link+'"/></a>';
            }),
        DTColumnBuilder.newColumn(null).withTitle('Title')
            .renderWith(function(data, type, full, meta) {
                return '<a target="_blank" href="'+data.guid+'">'+truncate(data.title, 30)+'</a>';
        })


];
$scope.selected = [];

var updateSelected = function(action, id) {
 //console.log($scope.selected);
  if (action === 'add') {
    $scope.selected.push(id);
    }
  if (action === 'remove' && $scope.selected.indexOf(id) !== -1) {
    $scope.selected.splice($scope.selected.indexOf(id), 1);
  }
};

$scope.updateSelection = function($event, id) {
  //console.log (id);
  //console.log($event);
  var checkbox = $event.target;
  var action = (checkbox.checked ? 'add' : 'remove');
  updateSelected(action, id);
};

$scope.selectAll = function($event) {
  var checkbox = $event.target;
  var action = (checkbox.checked ? 'add' : 'remove');
  for ( var i = 0; i < $scope.entities.length; i++) {
    var entity = $scope.entities[i];
    updateSelected(action, entity.id);
  }
};

$scope.getSelectedClass = function(entity) {
  return $scope.isSelected(entity.id) ? 'selected' : '';
};

$scope.isSelected = function(id) {
  return $scope.selected.indexOf(id) >= 0;
};

//something extra I couldn't resist adding :)
$scope.isSelectedAll = function() {
  return $scope.selected.length === $scope.entities.length;
};

//**************************************search********************
$scope.search = function(){
  if ($scope.searchParam.text != ""){
    //Europena
    $scope.dtOptionsI.data = {};
    $scope.dtOptionsEV.data = {};
    $scope.dtOptionsS.data = {};
    $scope.dtOptionsT.data  = {};
    $scope.dtOptions3D.data = {};
    //Youtube
    $scope.dtOptionsYV.data = {};
    //wikipedia
    $scope.dtOptionsWT.data = {};
    if (typesChecked.length == 0){
      $scope.alertsSearch.push ({ type: 'danger', msg: 'Types: required field' });
      closeAlertSearch();
      //console.warn ("Types: required field");
      return false;
    }

    if (sourcesChecked.length != 0){
      
      sourcesChecked.forEach(function(d,i){
          //console.log (d);
          if (d=="Youtube"){
            if (typesChecked.indexOf("VIDEO") != -1)
              getResultsYoutube($scope.searchParam.place, $scope.searchParam.date, $scope.searchParam.creator);

            else
                console.warn ("Seulement la recherche video pour Youtube")

          }else if(d=="Europeana"){

            if (typesChecked.size != 0){
              typesChecked.forEach(function(d,i){
                getResults(d, $scope.searchParam.place, $scope.searchParam.date, $scope.searchParam.creator);
              });

            }
          }else if (d=="Wikipedia"){
              //console.log ("search in wikipedia");
              if (typesChecked.indexOf("TEXT") != -1)
                getResultsWiki(d, "fr");
              else
                console.warn ("Seulement la recherche text pour wikipedia")
          }else {
            console.warn ("aucune source");
          }

      });


    }else{
      $scope.alertsSearch.push ({ type: 'danger', msg: 'Sources: required field' });
      closeAlertSearch();
      console.warn ("Sources: required field");
      return false;
    }
  }else{

    $scope.alertsSearch.push ({ type: 'danger', msg: 'Search text is required' });
    closeAlertSearch();
    return false;

  }
}



function getResultsYoutube( place, date, creator){

        var pw = "Basic YWRtaW46YWRtaW4=";
        $http.defaults.headers.common['Authorization'] = urlStanbol.pwd;
        var results = [];
        var youtubeURL =urlStanbol.address+"/mediamanagement/simpleQuery/youtube?generalTerms="+$scope.searchParam.text;

        $http({
            method: 'GET',
            url: youtubeURL,
            /*headers: {
                'Content-Type': 'application/json'
            }*/
        })
        .success(function (data, status, headers, config) {
          var index = 0;
            data.Uri.forEach(function(d,i){
                //console.log (d);
                //console.log (d.snippet.thumbnails.default);
                //console.log (d.id.videoId);
                var m = {};

                m['title'] = d.snippet.title;
                m['typeMedia'] = "VIDEO";
                m['source'] = "Youtube";
                m['description'] = '';
                m['url'] = d.snippet.thumbnails.default.url;
                m['idY'] = d.id.videoId;
                //m['id'] = index++;
                m['link'] = "http://www.youtube.com/v/"+d.id.videoId;
                //m['description'] =
                results.push(m);
            });


              $scope.dtOptionsYV.data = results;
              ////selected sources

              angular.forEach(results,function(item){
                //console.log (item);
                $scope.modelContainerM.push({item:item,checked:false });

              });

        }).error(function (data, status, headers, config) {
            console.log(status);
        });
}
function getResults  (type, place, date, creator){
        var pw = "Basic YWRtaW46YWRtaW4=";
        $http.defaults.headers.common['Authorization'] = pw;
        var results = [];
        var europanaURL = urlStanbol.address + "/mediamanagement/simpleQuery/europeana?generalTerms="+$scope.searchParam.text+"&type="+type+"&creator="+creator+"&date="+date+"&country="+place;

        $http({
            method: 'GET',
            url: europanaURL,
            /*headers: {
                'Content-Type': 'application/json'
            }*/
        })
        .success(function (data, status, headers, config) {
            data.Uri.forEach(function(d,i){
                 //console.log (d);
                var m = {};
                m['title'] = d.title[0], 30;
                m['typeMedia'] = d.type;//http://www.ina.fr/images_v2/320x240/CAB92071664.jpeg&size=LARGE&type=VIDEO
                m['source'] = "Europeana";
                //m['link'] = d.link;

                m['language'] = d.language[0];
                m['idE'] = d.id;
                m['guid'] = d.guid;
                m['description'] = '';
                //console.log(d.edmPreview);
                //m['europeanaCollectionName'] = d.europeanaCollectionName[0];
                if (d.edmPreview !=  undefined){
                  m['edmPreview'] = d.edmPreview[0];
                  //console.log (d.edmPreview[0]);
                  if (type == "IMAGE" || type == "VIDEO")
                    m['link']= extractLinkEuropeana(d.edmPreview[0], d.type);
                  else
                    m['link'] = d.edmPreview[0];
                }else{
                  m['link'] = "http://europeanastatic.eu/api/image?size=FULL_DOC&type="+type;
                  m['edmPreview'] = "http://europeanastatic.eu/api/image?size=FULL_DOC&type="+type;
                }
                results.push(m);
                //console.log (m);
            });
            angular.forEach(results,function(item){
                //console.log (item);
                $scope.modelContainerM.push({item:item,checked:false });

            });
            if (type == "IMAGE"){
              $scope.dtOptionsI.data = results;
            }else if (type == "VIDEO"){
              $scope.dtOptionsEV.data = results;
            }else if (type == "SOUND"){
              $scope.dtOptionsS.data = results;
            }else if (type == "TEXT"){
              $scope.dtOptionsT.data = results;
            }else if (type == "3D"){
             $scope.dtOptions3D.data = results;
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };

function getResultsWiki  (type, langue){
        var pw = "Basic YWRtaW46YWRtaW4=";
        $http.defaults.headers.common['Authorization'] = pw;
        var results = [];

        var wikipediaURL = urlStanbol.address+"/mediamanagement/simpleQuery/wikipedia?generalTerms="+$scope.searchParam.text+"&type="+type+"&langue="+langue;

        $http({
            method: 'GET',
            url: wikipediaURL,
            /*headers: {
                'Content-Type': 'application/json'
            }*/
        })
         .success(function (data, status, headers, config) {


            //console.log (data.Uri);
            //console.log (data.Uri[0])
            if (data.Uri[0] != undefined){
               var m = {};
              m['title']  = data.Uri[1] ;
              m['content']= data.Uri[2];
              m['typeMedia'] = "TEXT";
              m['source'] = "Wikipedia";
              m['link'] = "http://"+langue+".wikipedia.org/wiki?curid="+data.Uri[0];
              m['description'] = data.Uri[2];
              results.push(m);


              $scope.dtOptionsWT.data = results;
              ////selected sources

              angular.forEach(results,function(item){
                //console.log (item);
                $scope.modelContainerM.push({item:item,checked:false });

              });
            }
        }).error(function (data, status, headers, config) {
            console.log(status);
        });
    };
 //***************************alert*********************************
 $scope.alerts = new Array();
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  var closeAlert = function(){
       $timeout(function(){
        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);
      }, 3000);//' to avoid calling apply
  };
//*******************************cart**********************************
$scope.saveCart = function() {
   var promiseSaveCart = MediasService.saveCart($scope.newcart);
    promiseSaveCart.then(function(){

      $scope.newcart = {};
      $scope.alerts.push ({type: 'success', msg: 'Well done! the cart is created'});
      closeAlert();

    });

}

$scope.addToCart = function (cartId) {
  if ($scope.selected.length > 0){ //selected ids
    $scope.selected.forEach(function(p,i){
      //console.log (p);
      var promiseCreateMedia = MediasService.addMedia(p);
      promiseCreateMedia.then(function(id){
        MediasService.addToCartMedia(id, cartId);
      });
    });
    $scope.alerts.push ({ type: 'success', msg: 'Well done! The media(s) have been added to cart.' });
    closeAlert();

  }else{ //rien n'est selectionné
    //console.log ("selected id is null");
    $scope.alerts.push ({ type: 'warning', msg: 'No media selected.' });
    closeAlert();
  }

}
// ************************Add mediatheque*******************
$scope.addToMedias = function(){

  //ajouter à la médiatheque
 

  if ($scope.selected.size != 0){
    $scope.selected.forEach(function(d,i){
      //console.log (d);
      if (d.length != 0){
        MediasService.addMedia(d);

      }
    });
    $scope.alerts.push ({ type: 'success', msg: 'Well done! The media(s) have been added.' });
    closeAlert();


  }else{
    $scope.alerts.push ({ type: 'warning', msg: 'No media selected.' });
    closeAlert();
  }
}
// ************************ Add to step *******************

$scope.stepSelected = {};
$scope.$watch("dynModelStep",function(v){
 

  if (v != undefined || v != null){
    //console.log (v.id);
    //v.forEach(function(d,i){
      $scope.stepSelected = ProjectsService.getStepByProjectId(v.idProject,v.id, $scope.projects);
      //console.log (stepSelected);
      $scope.projectId = v.idProject;


      if ($scope.selected.length > 0){ //selected ids
        $scope.selected.forEach(function(p,i){
          //console.log (p);
          //MediasService.addToStepMedia(p, $scope.stepSelected);
          console.log(p);
          var promiseCreate = MediasService.addMedia(p);
          promiseCreate.then(function(id){
              //console.log (id);
              MediasService.addToStepMediaById(id, $scope.stepSelected, $scope.medias);

              var project = ProjectsService.get($scope.projects,v.idProject);
              //console.log(project);
              //console.log($scope.project);
              ProjectsService.saveProject(project);
         

          });
        });
        $scope.alerts.push ({type: 'success', msg: 'Well done! The media have been added to selected step : '+$scope.stepSelected.title });
        closeAlert();

      }else{ //rien n'est selectionné
        //console.log ("Nothing selected to add to step " + v.title);
        $scope.alerts.push ({ type: 'warning', msg: "Nothing selected to add to step " + v.title });
        closeAlert();
      }


    //});
  }

 //console.log (stepsSelected);
},true);

function extractLinkEuropeana(url, type){

  var uri = unescape(url.substring(1).split(/\?/)[1]);
  if (type =="VIDEO")
     var uri1 = uri.substring(4).split("&size=LARGE&type=VIDEO")[0];
  else
    var uri1 = uri.substring(4).split("&size=LARGE&type=IMAGE")[0];

 return (uri1);

}

function getURLargs (url){
  //console.log (url);
    var args = url.substring(1).split(/\&/);
   //console.log(args);
    var argsParsed = {};

    for (var i = 0; i < args.length; i++) {
      var arg = unescape(args[i]);

      if (arg.indexOf('=') == -1) {
        argsParsed[arg.trim()] = true;
      } else {
        var kvp = arg.split('=');
        argsParsed[kvp[0].trim()] = kvp[1].trim();
      }
    }

    return argsParsed;
  }
// ==============================================================================================
//  Truncate a string to the given length, breaking at word boundaries and adding an elipsis
//      @param str - String to be truncated
//      @param limit - integer Max length of the string
//      @returns a string
// ==============================================================================================

    function truncate(str, limit) {
        var chars;
        var i;

        // check if what was passed as a string is actually a string
        if ( typeof(str) != 'string') {
            return '';
        }

        // create an array of the chars in the string
        chars = str.split('');

        // if the length is greater than the set limit, process for truncating
        if (chars.length > limit) {
            // while the char count is greater than the limit,
            for (i = chars.length - 1; i > -1; --i) {
                // if char count is still greater, redefine the array size to the value of i
                if (i > limit) {
                    chars.length = i;
                }
                // if char count is less than the limit keep going until you hit a space
                // and redefine the array size to the value of i
                else if (' ' === chars[i]) {
                    chars.length = i;
                    break;
                }
            }
            // add elipsis to the end of the array
            chars.push('...');
        }
        // return the array as a string
        return chars.join('');
    }


});
