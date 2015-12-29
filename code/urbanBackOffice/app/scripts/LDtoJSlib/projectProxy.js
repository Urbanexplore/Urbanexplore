'use strict';


angular.module('ldToJsLib')
.service('projectProxy', function () {

  var uriBase = "http://ooffee.eu/ns/urban#";
  var dataAll = new Array();

  //all of this commented on 20151005,
  //mostly a copy of services/proxyProject.js
  //refactor to use this service instead of old code duplicated in proxyProject.js and proxyMedia.js
  
  
  /*this.getProjectJS = function(){
    var initialisation = $q.defer();

    var projectsJS = new Array();
    var projects = new Array();
    var steps = new Array();


    var parameters = {
            scheme : '', //the default one
            queryFn : function( uri){
                return {
                    method : 'GET',
                    url : urlStanbol.address+'/graph/list/typeGraph?typeGraph=data'

                };
            }
    };


    $http({
        method : 'GET',
        url : parameters.queryFn().url, //rdfuiConfig.server+'mediamanagement?uri='+uri,
    }).success(function(data){
        dataAll = data["@graph"];
        if (dataAll  != null){
          dataAll.forEach(function(d,i){
            if(d[uriBase+"type"] == "Project"){
              projects.push(d);
            }
            if(d[uriBase+"type"] == "step"){
              steps.push(d);
            }
          });
        }
        //projects = data["@graph"];
        //console.log(projectJS);
    }).error(function(){
        console.log("error");
    }).then(function(){

      projects.forEach(function(d,i){
        var projectJS = self.createProject(d);
        var stepsTmp = new Array();
        if(d[uriBase+"steps"]!=null){
          if(angular.isArray(d[uriBase+"steps"])){
            d[uriBase+"steps"].forEach(function(s,i){
              var step = self.getStep(s);
              var medias = self.getMedias(steps, step["@id"]);

              if (medias != undefined && medias != null){
              if(angular.isArray(medias)){
                medias.forEach(function(m){
                  var media = new Array();
                 console.log (m);
                  media = self.getMediaObj(m);
                  console.log (media);
                  if (media.id != undefined){
                    step.medias.push(media);
                    step._medias.push(media);
                  }

                    
                });
              }
              else {
                console.log("step 2");
                  var media = new Array();
                  media = self.getMediaObj(medias);
                  if (media.id != undefined){
                    step.medias.push(media);
                    step._medias.push(media);
                  }
                }
              }
              console.log(step);
              projectJS.steps.push(step);
            });
          }else{
            var step = self.getStep(d[uriBase+"steps"]);
            console.log(step);
            projectJS.steps.push(step);
          }
        }
        projectsJS.push(projectJS);
      });
      initialisation.resolve(projectsJS);
    });
    return(initialisation.promise);
  }

*/
/*

this.getProjectsFromData = function(dataAll){
   var projects   = new Array();
   var projectsJS = new Array();

  dataAll.forEach(function(d,i){
   if(d[uriBase+"type"] == "Project"){
      projects.push(d);
    }
  });

  projects.forEach(function(d,i){
   var projectJS = self.createProject(d);
    projectsJS.push(projectJS);

  });

  return(projectsJS);


}
  this.getMedias = function(steps,id){
    var medias = new Array();

    steps.forEach(function(step){
      if(step["@id"] == uriBase +"#step#" +id){ // Je trouve la bonne étape
        medias = step[uriBase + "medias"];
      }
    });
    return(medias);
  }

  this.getMediaObj = function(id){
    var mediaJS = {};
    var uriToFix = "http://tofix.uri/";
    dataAll.forEach(function(d,i){
      //console.log (d);
      if(d["@id"]== uriToFix +id + "##" +id){
    	  
    	  Object.defineProperty(mediaJS, "_@id", {
	          value : d[uriBase + "@id"],
	          enumerable : true,
	          writable : true
	      });
    	  
    	  Object.defineProperty(mediaJS, "@id", {
    		  value : d[uriBase + "@id"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "_description", {
    		  value : d[uriBase + "description"],
    		  enumerable : true,
    		  writable : true
    	  });
    	  
    	  Object.defineProperty(mediaJS, "description", {
    		  value : d[uriBase + "description"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "_id", {
    		  value : d[uriBase + "id"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "_link", {
    		  value : d[uriBase + "link"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "_source", {
    		  value : d[uriBase + "source"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "_title", {
    		  value : d[uriBase + "title"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "_type", {
    		  value : d[uriBase + "type"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "_typeMedia", {
    		  value : d[uriBase + "typeMedia"],
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
    	  
    	  Object.defineProperty(mediaJS, "id", {
    		  value : d[uriBase + "id"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "link", {
    		  value : d[uriBase + "link"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "source", {
    		  value : d[uriBase + "source"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "title", {
    		  value : d[uriBase + "title"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "type", {
    		  value : d[uriBase + "type"],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, "typeMedia", {
    		  value : d[uriBase + "typeMedia"],
    		  enumerable : true,
    		  writable : true
    	  });


      }
    });
    return(mediaJS);
  }

  this.getStep = function(id){

    var step = {};
    //graphService.findNode("http://ooffee.eu/ns/urban##step#1d6c");
    dataAll.forEach(function(d,i){
      if(d["@id"]== uriBase +"#step#" +id){
          
      }
    });
    return(step);
  }*/

  this.createProject = function(d){
    var projectJS = {};

    Object.defineProperty(projectJS, "_@id", {
        value : d["@id"],
        enumerable : true,
        writable : true
      });

    Object.defineProperty(projectJS, "@id", {
      value : d["@id"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_author", {
      value : d[uriBase + "author"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "author", {
      value : d[uriBase + "author"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_dateCreate", {
      value : d[uriBase + "dateCreate"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "dateCreate", {
      value : d[uriBase + "dateCreate"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_dateUpdate", {
      value : d[uriBase + "dateUpdate"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "dateUpdate", {
      value : d[uriBase + "dateUpdate"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_id", {
      value : d[uriBase  + "id"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "id", {
      value : d[uriBase  + "id"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_name", {
      value : d[uriBase + "name"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "name", {
      value : d[uriBase + "name"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_status", {
      value : d[uriBase + "status"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "status", {
      value : d[uriBase + "status"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_minZoom", {
      value : d[uriBase + "minZoom"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "minZoom", {
      value : d[uriBase + "minZoom"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_maxZoom", {
      value : d[uriBase + "maxZoom"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "maxZoom", {
      value : d[uriBase + "maxZoom"],
      enumerable : true,
      writable : true
    });


    Object.defineProperty(projectJS, "_lat", {
      value : d[uriBase + "lat"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "lat", {
      value : d[uriBase + "lat"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "lng", {
      value : d[uriBase + "lng"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_lng", {
      value : d[uriBase + "lng"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_zoom", {
      value : d[uriBase + "zoom"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "zoom", {
      value : d[uriBase + "zoom"],
      enumerable : true,
      writable : true
    });


        Object.defineProperty(projectJS, "_type", {
          value : d[uriBase + "type"],
          enumerable : true,
          writable : true
        });

        Object.defineProperty(projectJS, "type", {
          value : d[uriBase + "type"],
          enumerable : true,
          writable : true
        });

    Object.defineProperty(projectJS, "_ishomePage", {
      value : d[uriBase + "ishomePage"],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "ishomePage", {
      value : d[uriBase + "ishomePage"],
      enumerable : true,
      writable : true
    });

    var homePage = {
      description : d[uriBase + "homepagedescription"],
      learnMore : d[uriBase + "homepagelearnMore"],
      images : d[uriBase + "homepageimages"],
      isVirtualObj : true
    };

    var _homePage = angular.copy(homePage);

    Object.defineProperty(projectJS, "homepage", {
      value : homePage,
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_homepage", {
      value : _homePage,
      enumerable : true,
      writable : true
    });

    var footer = {
      about : d[uriBase + "footerabout"],
      help : d[uriBase + "footerhelp"],
      image : d[uriBase + "footerimage"],
      isVirtualObj : true
    };

    var _footer = angular.copy(footer);

    Object.defineProperty(projectJS, "footer", {
      value : footer,
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, "_footer", {
      value : _footer,
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS,"steps", {
      value : [],
      enumerable : true,
      writable : true
    });


    Object.defineProperty(projectJS,"_steps", {
      value : [],
      enumerable : true,
      writable : true
    });

    //TODO : add this when this code is clean and when this is re-integrated in the backOffice module
    /*
    projectJS.saveObj = function(projectJS, graph){
      var def = $q.defer();
      var promiseObj = self.saveObj(projectJS,graph);
      promiseObj.then(function(){
        def.resolve();
      });
      return(def.promise);
    };
    */
    
    return projectJS;
}

  this.createStep = function(d){
	  var step = {};
	  
	  Object.defineProperty(step, "_id",{
          value : d[uriBase + "id"],
          enumerable : true,
          writable : true
      });
	  
	  Object.defineProperty(step, "id",{
	      value : d[uriBase + "id"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "@id",{
	      value : d['@id'],
	      enumerable : true,
	      writable : true
	  });
	
	
	  Object.defineProperty(step, "_lng",{
		  value : d[uriBase + "lng"],
	      enumerable : true,
	      writable : true
	  });
	
	
	  Object.defineProperty(step, "lng",{
	      value : d[uriBase + "lng"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "_message",{
	      value : d[uriBase + "message"],
	      enumerable : true,
	      writable : true
	  });
	
	
	  Object.defineProperty(step, "message",{
	      value : d[uriBase + "message"],
	      enumerable : true,
	      writable : true
	  });
	
	
	  Object.defineProperty(step, "_lat",{
	      value : d[uriBase + "lat"],
	      enumerable : true,
	      writable : true
	  });
	
	
	  Object.defineProperty(step, "lat",{
	      value : d[uriBase + "lat"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "position", {
		  value : d[uriBase + "position"],
		  enumerable : true,
		  writable : true
	  });
	
	  Object.defineProperty(step, "_position", {
	      value : d[uriBase + "position"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "title",{
	      value : d[uriBase + "title"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "_title",{
	      value : d[uriBase + "title"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "description",{
	      value : d[uriBase + "description"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "_description",{
	      value : d[uriBase + "description"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "learnMore",{
	      value : d[uriBase + "learnMore"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "_learnMore",{
	      value : d[uriBase + "learnMore"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "_isVisible",{
	      value : d[uriBase + "isVisible"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "isVisible",{
	      value : d[uriBase + "isVisible"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "_type",{
	      value : d[uriBase + "type"],
	      enumerable : true,
	      writable : true
	  });
	  
	  Object.defineProperty(step, "type",{
	      value : d[uriBase + "type"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "_visual",{
	      value : d[uriBase + "visual"],
	      enumerable : true,
	      writable : true
	  });
	  
	  Object.defineProperty(step, "visual",{
	      value : d[uriBase + "visual"],
	      enumerable : true,
	      writable : true
	  });
	
	  Object.defineProperty(step, "_medias",{
	      value : new Array(),
	      enumerable : true,
	      writable : true
	  });
	  
	  Object.defineProperty(step, "medias",{
	      value : new Array(),
	      enumerable : true,
	      writable : true
	  });
	    
	  return step;
	}
  
  
  this.toJsObject = function(jsonLDData){
	  
	  
	  //TODO : reprendre ici en ajoutant ce service dans le truc de traitement du fichier
	  var projectJS = null;
	  var stepsId = null;
	  
	  jsonLDData['@graph'].forEach(function(d,i){
		   if(d[uriBase+"type"] == "Project"){
			   projectJS = self.createProject(d);
			   console.log('première version du projet créé');
			   console.log(projectJS);
			   console.log('il faut maintenant rajouter les liens vers les étapes et les médias');
			   
			   stepsId = d[uriBase+"steps"];
		    }
	  });
	  
	  //note : for now, steps are added as a post process in the projetJs object, after it's have to be done in the object creation.
	  var stepsObjects = [];
	  stepsId.forEach(function(stepId){
		  
		  var finded = false;
		  
		  jsonLDData['@graph'].forEach(function(d){
			  
			  if(d['@id'] == uriBase+"#step#"+stepId){
				  finded = true;
				  //console.log(d);
				  var stepObject = self.createStep(d);
				  //console.log(stepObject);
				  stepsObjects.push(stepObject);
				  
				  //idem for medias array construction, here it's done on post-process, but after it has to be manage in the creation.
				  var mediasID = d[uriBase+"medias"];
				  
				  if(!Array.isArray(mediasID)){
					  if(mediasID != null){
						  mediasID = [mediasID];
					  }else{
						  mediasID = [];
					  }
				  };
				  
				  var mediaObjects = [];
				  
				  mediasID.forEach(function(mediaId){
					  
					  var mediaFinded = false;
					  
					  jsonLDData['@graph'].forEach(function(k){
						 if(k['@id'] == 'http://tofix.uri/'+mediaId+'##'+mediaId){
							 
							 mediaFinded = true;
							 //console.log(k);
							 var mediaObject = self.createMedia(k);
							 //console.log(mediaObject);
							 
							 mediaObjects.push(mediaObject);
							 
						 } 
					  });
					  
					  if(!mediaFinded){
						  console.warn('no media LD object finded for stepid = '+mediaId);
					  }
					  
				  });
				  
				  
				  
				  stepObject.medias = mediaObjects;
				  stepObject._medias = mediaObjects;
				  
			  }
			  
		  });
		  
		  if(!finded){
			  console.warn('no step LD object finded for stepid = '+stepId);
		  }
		  
	  });
	  
	  projectJS.steps = stepsObjects;
	  projectJS._steps = stepsObjects;
	  
	  return projectJS;
  }

/*
  this.save = function(graph,uri, projectJS, center){
    var def = $q.defer();
    var uriBase = "http://ooffee.eu/ns/urban#";
    var projectJSDataBase = new Array();
    var modif = false;
    var promise = projectJS.saveObj(projectJS, graph);
    promise.then(function(){
      def.resolve();
    });

    return(def.promise);

  }

  this.delete = function(graph, idProject){
    var def = $q.defer();
    var uriAll = "http://www.culture-terminology.org/ontologies/history#all";
    var uriDelete = "http://www.culture-terminology.org/ontologies/history#delete";
    var promiseChange = graphService.buildChanges(graph, idProject, uriAll, [uriAll]);
    promiseChange.then(function(){
        console.log("fini");
        def.resolve();
    });
    return(def.promise);
  }

  this.deleteLienProjectStep = function(graph, uriProject, idStep){
    var def = $q.defer();
    var uriAll = "http://www.culture-terminology.org/ontologies/history#all";
    var uriDelete = "http://www.culture-terminology.org/ontologies/history#delete";

    var promiseChange = graphService.buildChanges(graph, uriProject, uriBase + "steps", [idStep, null]);
    promiseChange.then(function(){
      console.log("step supprimÃ©e");

      def.resolve();
    });
    return(def.promise);
  }

  this.deleteLienStep = function(graph,  idMedia){
    var def = $q.defer();
    var uriAll = "http://www.culture-terminology.org/ontologies/history#all";
    var uriDelete = "http://www.culture-terminology.org/ontologies/history#delete";

    var promiseChange = graphService.buildChanges(graph, uriAll, uriBase + "medias", [idMedia, null]);
    promiseChange.then(function(){
      console.log("media supprimée from step");
      def.resolve();
    });
    return(def.promise);
  }

  this.saveObj = function(obj,graph){

      var def = $q.defer();
      var uriBase = "http://ooffee.eu/ns/urban#";
      var projectJSDataBase = new Array();
      var modif = false;

      Object.keys(obj).forEach(function(K){
        if(K.startsWith("_")){
          if(!(angular.equals(obj[K],obj[K.substring(1)]))){
            if((Array.isArray(obj[K.substring(1)]) || angular.isObject(obj[K.substring(1)])) && (obj[K.substring(1)]["@type"] != "xsd:double")){
                  console.warn("changement propriete array/object: " + K);
                  if(obj[K.substring(1)].isVirtualObj){
                        Object.keys(obj[K.substring(1)]).forEach(function(prop){
                          var p = uriBase+K.substring(1)+prop;
                          var promiseChange = graphService.buildChanges(graph, obj['@id'], p, [obj[K][prop],obj[K.substring(1)][prop]]);
                          promiseChange.then(function(){
                            def.resolve();
                          });
                        });
                  }
                else{
                    if(K.substring(1)!= "medias"){
                      console.log("ok");
                      obj[K.substring(1)].forEach(function(step){
                        if(step["@id"] == null){
                          var objStep = self.createStep(step);
                          step["@id"] = "";
                          var promiseChange = graphService.buildChanges(graph, [null,obj['@id']], uriBase + "steps", [null,objStep['@id']]);
                          promiseChange.then(function(){

                             objStep.saveObj(objStep,graph);

                              def.resolve();


                          });
                        }
                      else{
                        console.log("ok2")
                        // Cas d'une step dÃ©jÃ  existante qu'on modifie
                        var objStep = self.createStep(step);
                          objStep.saveObj(objStep,graph);

                            def.resolve();

                        }
                      });
                    }
                    else{// objet non step -> medias des steps
                      console.warn("To do -> amÃ©liorer ce code pour le rendre plus gÃ©nÃ©rique... Rustine pas top ");
                      var medId = "";

                      obj[K.substring(1)].forEach(function(media){
                        var promiseChange = graphService.buildChanges(graph, [null,uriBase+"#step#"+obj['@id']], uriBase + "medias", [null,media]);
                        promiseChange.then(function(){
                          console.log("ajout media");
                          obj[K] = obj[K.substring(1)];
                          def.resolve();

                        });
                      });
                    }

                  }

            }else{
              console.log("changement propriete : " + K);
              if((obj["@id"]!="" && (obj[K]!=obj[K.substring(1)]))){
                var oldV = obj[K];
                var newV = obj[K.substring(1)];
                console.log(oldV);
                console.log(newV);

                if(obj["type"]=="Project"){
                  var promiseChange = graphService.buildChanges(graph, [obj['@id'],obj['@id']], uriBase + K.substring(1), [oldV,newV]);
                  console.log("ok passage");
                }
                else{
                  var promiseChange = graphService.buildChanges(graph, [uriBase+"#step#"+obj['@id'],uriBase+"#step#"+obj['@id']], uriBase + K.substring(1), [oldV,newV]);
                }
              }
            else{
                if(obj["type"]=="Project"){
                    var promiseChange = graphService.buildChanges(graph, [null,obj['@id']], uriBase + K.substring(1), [null,String(obj[K.substring(1)])]);
                  }
                else{
                    var promiseChange = graphService.buildChanges(graph, [null,uriBase+"#step#"+obj['@id']], uriBase + K.substring(1), [null,String(obj[K.substring(1)])]);
                  }
                }
              promiseChange.then(function(){
                obj[K] = obj[K.substring(1)];
                def.resolve();
              });

            }
          }
        }
      });
      return(def.promise);
    }
*/
  
  /* To do utiliser cette fonction pour sauvegarder chaque steps */

/*
  this.getCartJS = function(){
    var initialisation = $q.defer();
    var carts = new Array();
    var cartsJS = new Array();
    var dataAll = new Array();
    var parameters = {
            scheme : '', //the default one
            queryFn : function( uri){
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
        //projects = data["@graph"];
        //console.log(projectJS);
    }).error(function(){
        console.log("error");
    }).then(function(){

      carts.forEach(function(d,i){
        var cartJS = self.createCart(d);
        console.log(cartJS);
        if(d[uriBase+"medias"]!=null){
          if(angular.isArray(d[uriBase+"medias"])){
            d[uriBase+"medias"].forEach(function(s,i){
              var media = self.getMedia(s,dataAll);
              //console.log(media);
              cartJS.medias.push(media);
              //console.log(cartJS);
            });
          }
          else{
            var media = self.getMedia(d[uriBase+"medias"], dataAll);
            cartJS.medias.push(media);
            //cartJS.medias.push(media);
            //console.log(cartJS);
          }
        }
        cartsJS.push(cartJS);
      });
      initialisation.resolve(cartsJS);
    });
  return(initialisation.promise)
};

this.getMedia = function(mediaId, dataAll){
  console.log("To do amÃ©liorer ce dataAll pas top du tout")
  var uriToFix ="http://tofix.uri/";
  var media = new Array();

  dataAll.forEach(function(d,i){

        //console.log(uriBase +"#step#" +mediaId);
        if(d[uriBase + "type"] == "Media"){
        }
        //console.log(uriToFix +mediaId +"##" +mediaId)
        if(d["@id"] == mediaId){
          media = self.createMedia(d);

        //  cart.medias.push(media);
    }
  });
  return(media);
}


//@TODO : idem remarque fonction suivante : cette fonction ne doit pas être dupliquée entre proxyProjet et proxyMedia.
this.createCart = function(d){
  var cartJS = {};
  console.log(d);
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

  Object.defineProperty(cartJS, "medias", {
    value : new Array(),
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, "_medias", {
    value : new Array,
    enumerable : true,
    writable : true
  });

  return(cartJS);
}

*/
  //TODO : pourquoi cette fonction semble dupliquée avec celle de proxyMedia.createMedia ??
  //Il ne faut en laisser qu'une, apparement dans proxyMedia
  this.createMedia = function(d){
	  
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
		    value : d[uriBase + "id"],
		    enumerable : true,
		    writable : true
	  });
	  
	  Object.defineProperty(mediaJS, "id", {
		    value : d[uriBase + "id"],
		    enumerable : true,
		    writable : true
	  });
	  
	  Object.defineProperty(mediaJS, "_description", {
		  value : d[uriBase + "description"],
		  enumerable : true,
		  writable : true
	  });
	  
	  Object.defineProperty(mediaJS, "description", {
		  value : d[uriBase + "description"],
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
	  
	  Object.defineProperty(mediaJS, "_type", {
		  value : d[uriBase + "type"],
		  enumerable : true,
		  writable : true
	  });
	  
	  Object.defineProperty(mediaJS, "type", {
		  value : d[uriBase + "type"],
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
	 
	 return(mediaJS);
  }

/*
this.saveMediaJS = function(obj,graph){
  var def = $q.defer();
  var uriFixe = "http://tofix.uri/";
  var uriBase = "http://ooffee.eu/ns/urban#";
  var projectJSDataBase = new Array();
  var modif = false;
  Object.keys(obj).forEach(function(K){
    if(K.startsWith("_")){
      if(!(angular.equals(obj[K],obj[K.substring(1)]))){
        var oldV = obj[K];
        var newV = obj[K.substring(1)];
        console.warn("To do : corriger le pb obj[@id] vide ");
        var promiseChange = graphService.buildChanges(graph, [uriFixe + obj['id']+"##"+obj['id'],uriFixe + obj['id']+"##"+obj['id']], uriBase + K.substring(1), [oldV,newV]);
        promiseChange.then(function(){
          def.resolve();
        });
      }
    }
  });
  return(def.promise)
};
*/


    var self = this;
});
