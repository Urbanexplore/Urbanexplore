'use strict';


angular.module('urbanBackOfficeApp')
.service('saveObjectService', function ($filter, $http, jsonLD,graphService,urlStanbol,$q, utils,ProxyMediasService,stepModel) {

	//note : jshint directive to remove "better written in dot notation warning"
	
	/*jshint -W069 */

  this.saveObj = function(obj,graph){
	  
	  
	  console.log('start save obj');
	  console.log(graph);
	  console.warn(obj);
	  
      var def = $q.defer();
      var uriBase = 'http://ooffee.eu/ns/urban#';
      //var projectJSDataBase = [];
      //var modif = false;

     
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
                  }else{
                	  
                    if(K.substring(1)!== 'medias'){
                      //TODO : gestion des defered dans cette partie, c'est du grand n'importe quoi.
                      obj[K.substring(1)].forEach(function(step){
                    	  console.warn('cette partie de la fonction ne doit plus être utilisée.');
                    	  var objStep = stepModel.createStep(step);
                    	  
                    	  var promiseChange = $q.defer();
                    	  //création d'une nouvelle step, on ajoute alors sa référence dans le graph général
                    	  if(!step['@id']){
                    		  promiseChange = graphService.buildChanges(graph, [null,obj['@id']], uriBase + 'steps', [null,objStep['@id']]);
                    	  
                    	  }//sinon on sauvegarde les modidication de l'objet
                    	  
                		  promiseChange.then(function(){
                			  //objStep.saveObj(objStep,graph);
                			  self.saveObj(objStep,graph);
                			  def.resolve();
                		  });

                      });
                    }
                    else{// objet non step -> medias des steps
                      console.warn('TODO : code à supprimer comme pour les steps, la sauvegarde doit se faire en dehors');
                      //var medId = '';

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
            	 var promiseChange = null;
            	 
	              //console.log('changement propriete : ' + K);
	              if((obj['@id']!=='' && (obj[K]!==obj[K.substring(1)]))){
	                var oldV = obj[K];
	                var newV = obj[K.substring(1)];
	                //console.log(oldV);
	                //console.log(newV);
	
	               
	                if(obj['type'] === 'Project'){
	                  promiseChange = graphService.buildChanges(graph, [obj['@id'],obj['@id']], uriBase + K.substring(1), [oldV,newV]);
	                 // console.log('ok passage');
	                }
	                else{
	                  promiseChange = graphService.buildChanges(graph, [uriBase+'#step#'+obj['@id'],uriBase+'#step#'+obj['@id']], uriBase + K.substring(1), [oldV,newV]);
	                }
	              }else{
	                if(obj['type'] === 'Project'){
	                    promiseChange = graphService.buildChanges(graph, [null,obj['@id']], uriBase + K.substring(1), [null,String(obj[K.substring(1)])]);
	                  }
	                else{
	                    promiseChange = graphService.buildChanges(graph, [null,uriBase+'#step#'+obj['@id']], uriBase + K.substring(1), [null,String(obj[K.substring(1)])]);
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
