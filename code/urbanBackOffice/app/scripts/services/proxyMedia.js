'use strict';


angular.module('urbanBackOfficeApp')
.service('ProxyMediasService', function ($filter, $http, jsonLD,graphService,urlStanbol,$q) {

  var uriBase = "http://ooffee.eu/ns/urban#";
/*
* charge tout les graph data
*
*
*/
  this.getData = function(){
  //console.log ("getData");

  var initialisation = $q.defer();
    
  var dataAll = new Array();
  var parameters = {
            scheme : '', //the default one
            queryFn : function(/*string*/ uri){
                return {
                    method : 'GET',
                    url : urlStanbol.address+'/graph/list/typeGraph?typeGraph=data'

                };
            }
  };
  var uriBase = "http://ooffee.eu/ns/urban#"

    $http({
        method : 'GET',
        url : parameters.queryFn().url, //rdfuiConfig.server+'skosifier?uri='+uri,
    }).success(function(data){
      dataAll = data["@graph"];
      initialisation.resolve(dataAll);

      }).error(function(){
        console.log("error get data");
    })

     return(initialisation.promise);  

}

/*
* extract medias from graph data
*
*
*/
  this.getMediasFromData = function(dataAll){
   
  
    var mediasJS = new Array();
    var medias = new Array();
    dataAll.forEach(function(d,i){
      if(d[uriBase+"type"] == "Media"){
        medias.push(d);
      }
    });

    medias.forEach(function(d,i){
          var mediaJS = self.createMedia(d);
          mediasJS.push(mediaJS);

    });

    return(mediasJS);
 
}


 this.getMediaJsById = function(idMedia){
    var initialisation = $q.defer();
   
    var baseUrl = "http://tofix.uri/"+idMedia;
    var mediaJS = new Array();
    var media = new Array();
    var dataMedia;
    var parameters = {
            scheme : '', //the default one
            queryFn : function(/*string*/ uri){
                return {
                    method : 'GET',
                    url:urlStanbol.address+'/graph/data/myUser/'+baseUrl,
                };
            }
    };

    $http({
        method : 'GET',
        url : parameters.queryFn().url, 

    }).success(function(data){
      //console.log (data);
        media =data;
    }).error(function(){
        console.log("error");
    }).then(function(){

      var mediaJS = self.createMedia(media);
      //console.log (mediaJS);
      initialisation.resolve(mediaJS);
    });
    return(initialisation.promise);
  }
/*
**
* parse object Media to object json
*
*/
  this.createMedia = function(d){
    console.log ("createMedia");
    var mediaJS = {};

    Object.defineProperty(mediaJS, "_@id", {
        value : d["@id"],
        enumerable : true,
        writable : true
      });

    Object.defineProperty(mediaJS, "@id", {
      value : d["@id"],
      enumerable : true,
      writable : true
    });

   Object.defineProperty(mediaJS, "_id", {
      value : d[uriBase  + "id"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "id", {
      value : d[uriBase  + "id"],
      enumerable : true,
      writable : true
    });
    Object.defineProperty(mediaJS, "_title", {
      value : d[uriBase + "title"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "title", {
      value : d[uriBase + "title"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "_typeMedia", {
      value : d[uriBase + "typeMedia"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "typeMedia", {
      value : d[uriBase + "typeMedia"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "_source", {
      value : d[uriBase + "source"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "source", {
      value : d[uriBase + "source"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "_link", {
      value : d[uriBase + "link"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "link", {
      value : d[uriBase + "link"],
      enumerable : true,
      writable : true
    });
    Object.defineProperty(mediaJS, "_idY", {
      value : d[uriBase + "_idY"],
      enumerable : true,
      writable : true
    });

   

    Object.defineProperty(mediaJS, "idY", {
      value : d[uriBase + "idY"],
      enumerable : true,
      writable : true
    });
    Object.defineProperty(mediaJS, "_guid", {
      value : d[uriBase + "_guid"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "guid", {
      value : d[uriBase + "guid"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "_description", {
      value : d[uriBase  + "description"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(mediaJS, "description", {
      value : d[uriBase  + "description"],
      enumerable : true,
      writable : true
    });
    Object.defineProperty(mediaJS, "ordreDsStep", {
      value : d[uriBase + "ordreDsStep"],
      enumerable : true,
      writable : true
    });
    Object.defineProperty(mediaJS, "_ordreDsStep", {
      value : d[uriBase + "ordreDsStep"],
      enumerable : true,
      writable : true
    });


    mediaJS.saveObj = function(mediaJS, graph){
      self.saveObj(mediaJS,graph);
    }
    return mediaJS;
}




/*
* extract carts from graph data
*
*
*/
this.getCartsFromData = function(dataAll){
   var carts   = new Array();
   var cartsJS = new Array();

  dataAll.forEach(function(d,i){
    if(d[uriBase+"type"] == "Cart"){
      carts.push(d);
    }
  });

  carts.forEach(function(d,i){
    var cartJS = self.createCart(d);
    cartsJS.push(cartJS);

  });

  return(cartsJS);


}

/*
**
* parse object Cart to object json
*
*/




this.getCarts = function(){
    console.log("getCarts");
    var initialisation = $q.defer();
    var carts = new Array();
    var cartsJS = new Array();
    var dataAll = new Array();
    var parameters = {
            scheme : '', //the default one
            queryFn : function(/*string*/ uri){
                return {
                    method : 'GET',
                    url : urlStanbol.address+'/graph/list/typeGraph?typeGraph=data'

                };
            }
    };
    var uriBase = "http://ooffee.eu/ns/urban#"

    $http({
        method : 'GET',
        url : parameters.queryFn().url, //rdfuiConfig.server+'mediamanagement?uri='+uri,
    }).success(function(data){
        dataAll = data["@graph"];
        dataAll.forEach(function(d,i){
          if(d[uriBase+"type"] == "Cart"){
            carts.push(d);
          }
        });

    }).error(function(){
        console.log("error get carts");
    }).then(function(){

      carts.forEach(function(d,i){
        var cartJS = self.createCart(d);
        cartsJS.push(cartJS);

      });

      initialisation.resolve(cartsJS);

    });
    return(initialisation.promise);


}


this.createCart = function(d){

    var cartJS = {};

    Object.defineProperty(cartJS, "id", {
          value : d[uriBase + "id"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS, "_id", {
          value : d[uriBase + "id"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS, "created", {
          value : d[uriBase + "created"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS, "_created", {
          value : d[uriBase + "created"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS, "name", {
          value : d[uriBase + "name"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS, "_name", {
          value : d[uriBase + "name"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS,"medias", {
          value : d[uriBase + "medias"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS,"_medias", {
          value : d[uriBase + "_medias"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS, "type", {
          value : d[uriBase + "type"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(cartJS, "_type", {
          value : d[uriBase + "type"],
          enumerable : true,
          writable : true
        });

    cartJS.saveObj = function(cartJS, graph){
      self.saveObj(cartJS,graph);
    }
    return cartJS;
}

/*
**
* save general
*
*/
  this.save = function(graph,uri, mediaJS){

    var uriBase = "http://ooffee.eu/ns/urban#";
    var mediaJSDataBase = new Array();
    var modif = false;

    mediaJS.saveObj(mediaJS, graph);
  }

  this.saveObj = function(obj,graph){
    console.log (obj);

      var uriBase = "http://ooffee.eu/ns/urban#";
      var mediaJSDataBase = new Array();
      var modif = false;

       Object.keys(obj).forEach(function(K){
        if(K.startsWith("_")){
          if(!(angular.equals(obj[K],obj[K.substring(1)]))){
            if(Array.isArray(obj[K.substring(1)]) || angular.isObject(obj[K.substring(1)])){
                console.warn("changement propriete array/object: " + K);
                if(obj[K.substring(1)].isVirtualObj){
                        Object.keys(obj[K.substring(1)]).forEach(function(prop){
                          var p = uriBase+K.substring(1)+prop;
                          var promiseChange = graphService.buildChanges(graph, obj['@id'], p, [obj[K][prop],obj[K.substring(1)][prop]]);
                          promiseChange.then(function(){
                            });
                        });
                  }else{


                    obj[K.substring(1)].forEach(function(media){
                      console.log(media);
                      alert("ko");
                      if(media["@id"] == null){
                        var objMedia= self.createMedia(media);
                        media["@id"] = "";
                        var promiseChange = graphService.buildChanges(graph, [null,obj['@id']], uriBase + "medias", [null,objStep['@id']]);
                        promiseChange.then(function(){

                          objStep.saveObj(objStep,graph);

                        });
                    }
                  });
                }

            }else{

              var promiseChange = graphService.buildChanges(graph, [null,uriBase+"#media#"+obj['@id']], uriBase + K.substring(1), [null,obj[K.substring(1)]]);
              promiseChange.then(function(){

              });
              obj[K] = obj[K.substring(1)];

            }
          }
        }
      });



}

    this.addMediaToCart = function(graph, idC, idM){
      var def = $q.defer();
      var uriBase = "http://tofix.uri/";
      var uriProp = "http://ooffee.eu/ns/urban#";

      //var promiseChange = graphService.buildChanges(graph, [uriBase+"#step#"+obj['@id'],uriBase+"#step#"+obj['@id']], uriBase + K.substring(1), [oldV,newV]);
      console.warn("To do : fixer les uri et surtout l'uri du graph");
      var promiseChange2 = graphService.buildChanges(graph, [null,uriBase+idC +"##"+ idC], uriProp + "medias", [null,uriBase+idM+"##"+idM]);
      promiseChange2.then(function(){
        def.resolve();
      });
      return(def.promise);
    }


/*
**
* utilisé uniquement pour les tests unitaires
*
*/
  this.getMedias = function(){
    var initialisation = $q.defer();

    var mediasJS = new Array();
    var medias = new Array();
    var dataAll = new Array();

    var parameters = {
            scheme : '', //the default one
            queryFn : function(/*string*/ uri){
                return {
                    method : 'GET',
                    url : urlStanbol.address+'/graph/list/typeGraph?typeGraph=data'

                };
            }
    };


    $http({
        method : 'GET',
        url : parameters.queryFn().url, //rdfuiConfig.server+'skosifier?uri='+uri,
    }).success(function(data){
        dataAll = data["@graph"];
        dataAll.forEach(function(d,i){
          if(d[uriBase+"type"] == "Media"){
            medias.push(d);
          }
        });

    }).error(function(){
        console.log("error");
    }).then(function(){

      medias.forEach(function(d,i){
        var mediaJS = self.createMedia(d);
        mediasJS.push(mediaJS);

      });

      initialisation.resolve(mediasJS);

    });
    return(initialisation.promise);
  }
/*
**
* utilisé uniquement pour les tests unitaires
*
*/
  this.getCarts = function(){
    console.log("getCarts");
    var initialisation = $q.defer();
    var carts = new Array();
    var cartsJS = new Array();
    var dataAll = new Array();
    var parameters = {
            scheme : '', //the default one
            queryFn : function(/*string*/ uri){
                return {
                    method : 'GET',
                    url : urlStanbol.address+'/graph/list/typeGraph?typeGraph=data'

                };
            }
    };
    var uriBase = "http://ooffee.eu/ns/urban#"

    $http({
        method : 'GET',
        url : parameters.queryFn().url, //rdfuiConfig.server+'skosifier?uri='+uri,
    }).success(function(data){
        dataAll = data["@graph"];
        dataAll.forEach(function(d,i){
          if(d[uriBase+"type"] == "Cart"){
            carts.push(d);
          }
        });

    }).error(function(){
        console.log("error get carts");
    }).then(function(){

      carts.forEach(function(d,i){
        var cartJS = self.createCart(d);
        cartsJS.push(cartJS);

      });

      initialisation.resolve(cartsJS);

    });
    return(initialisation.promise);


}

    var self = this;
});
