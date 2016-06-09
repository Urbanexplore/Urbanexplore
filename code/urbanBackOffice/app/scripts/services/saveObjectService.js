'use strict';


angular.module('urbanBackOfficeApp')
.service('saveObjectService', function ($filter, $http, jsonLD,graphService,urlStanbol,$q, utils,ProxyMediasService) {

	//note : jshint directive to remove "better written in dot notation warning"
	
	/*jshint -W069 */

  //TODO : check all the calling function, as the "graph" parameter is not still needed as it's cached by the "self.graph" parameter.
  this.saveObj = function(obj,graph){
	  
	  if(!graph){
		  graph = self.graph;
	  }
	  
	  console.log('start save obj');
	  console.log(graph);
	  
      var def = $q.defer();
      var uriBase = 'http://ooffee.eu/ns/urban#';
      var projectJSDataBase = [];
      var modif = false;

      console.warn(obj);
      //the object already exist
      
      Object.keys(obj).forEach(function(K){
        if(K.startsWith('_')){
          if(!(angular.equals(obj[K],obj[K.substring(1)]))){
            if((Array.isArray(obj[K.substring(1)]) || angular.isObject(obj[K.substring(1)])) && (obj[K.substring(1)]['@type'] !== 'xsd:double')){
                  console.warn('changement propriete array/object: ' + K);
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
                    if(K.substring(1)!== 'medias'){
                      console.log('ok');
                      obj[K.substring(1)].forEach(function(step){
                    	  if(!step['@id']){
                    		  var objStep = self.createStep(step);
                    		  step['@id'] = '';
                    		  console.log("%%%%%%%%%%%%%%%%%%% premier element");
                    		  var promiseChange = graphService.buildChanges(graph, [null,obj['@id']], uriBase + 'steps', [null,objStep['@id']]);
                    		  promiseChange.then(function(){
                    			  objStep.saveObj(objStep,graph);
                    			  def.resolve();
                    		  });
                    	  }
	                      else{
	                        console.log('ok2');
	                        // Cas d'une step déjà  existante qu'on modifie
	                        var objStep2 = self.createStep(step);
	                        console.log(step);
	                        console.log("=================");
	                        console.log(objStep2);
	                        
	                        step.saveObj(step,graph);
	                        //objStep2.saveObj(objStep2,graph);
	                        def.resolve();
	
	                      }
                      });
                    }
                    else{// objet non step -> medias des steps
                      console.warn('To do -> améliorer ce code pour le rendre plus générique... Rustine pas top ');
                      var medId = '';

                      obj[K.substring(1)].forEach(function(media){
                        var promiseChange = graphService.buildChanges(graph, [null,uriBase+'#step#'+obj['@id']], uriBase + 'medias', [null,media]);
                        promiseChange.then(function(){
                          console.log('ajout media');
                          obj[K] = obj[K.substring(1)];
                          def.resolve();

                        });
                      });
                    }

                  }

            }else{
              //console.log('changement propriete : ' + K);
              if((obj['@id']!=='' && (obj[K]!==obj[K.substring(1)]))){
                var oldV = obj[K];
                var newV = obj[K.substring(1)];
                //console.log(oldV);
                //console.log(newV);

                if(obj['type'] === 'Project'){
                  var promiseChange = graphService.buildChanges(graph, [obj['@id'],obj['@id']], uriBase + K.substring(1), [oldV,newV]);
                 // console.log('ok passage');
                }
                else{
                  var promiseChange = graphService.buildChanges(graph, [uriBase+'#step#'+obj['@id'],uriBase+'#step#'+obj['@id']], uriBase + K.substring(1), [oldV,newV]);
                }
              }
            else{
                if(obj['type'] === 'Project'){
                    var promiseChange = graphService.buildChanges(graph, [null,obj['@id']], uriBase + K.substring(1), [null,String(obj[K.substring(1)])]);
                  }
                else{
                    var promiseChange = graphService.buildChanges(graph, [null,uriBase+'#step#'+obj['@id']], uriBase + K.substring(1), [null,String(obj[K.substring(1)])]);
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
    };
    
    //TODO : remove when done, commented since 20160609
    //version du save dasn le proxy media 
    /*this.saveObj = function(obj,graph){
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
    }*/

    var self = this;
});
