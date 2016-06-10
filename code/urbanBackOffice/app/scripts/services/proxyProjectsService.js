'use strict';


angular.module('urbanBackOfficeApp')
.service('ProxyProjectsService', function ($filter, $http, jsonLD,graphService,urlStanbol,$q, utils,ProxyMediasService,saveObjectService,stepModel,ProjectsService) {

	//note : jshint directive to remove "better written in dot notation warning"
	
	/*jshint -W069 */
	
  var uriBase = 'http://ooffee.eu/ns/urban#';
  var dataAll = [];
  
  this.graph = null;

  this.getProjectJS = function(isSteps, isMedias){
    var initialisation = $q.defer();

    var projectsJS = [];
    var projects = [];
    var steps = [];


    var parameters = {
            scheme : '', //the default one
            queryFn : function(){
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
        dataAll = data['@graph'];
        if (dataAll  !== null){
          dataAll.forEach(function(d){
            if(d[uriBase+'type'] === 'Project'){
              projects.push(d);
            }
            if(d[uriBase+'type'] === 'step'){
              steps.push(d);
            }
          });
        }
        //projects = data['@graph'];
        //console.log(projectJS);
    }).error(function(){
        console.log('error');
    }).then(function(){

      projects.forEach(function(d){
        var projectJS = self.createProject(d);

        if (isSteps){
          if(d[uriBase+'steps']!==null){
            if(angular.isArray(d[uriBase+'steps'])){
              d[uriBase+'steps'].forEach(function(s){
                var step = self.getStep(s);
                if (isMedias){
                  var medias = self.getMedias(steps, step['@id']);
                  if (medias !== undefined && medias !== null){
                  if(angular.isArray(medias)){
                    medias.forEach(function(m){
                      var media = [];
                      media = self.getMediaObj(m);
                      step.medias.push(media);
                      step._medias.push(media);
                    });
                  }
                  else {
                    console.log('step 2');
                      var media = [];
                      media = self.getMediaObj(medias);
                      step.medias.push(media);
                      step._medias.push(media);
                    }
                  } 
                }
                projectJS.steps.push(step);
              });
            }
            else{
              var step = self.getStep(d[uriBase+'steps']);
              projectJS.steps.push(step);
            }

          }
        }  
        projectsJS.push(projectJS);
      });
      initialisation.resolve(projectsJS);
    });
    return(initialisation.promise);
  };


  this.getProjectsFromData = function(dataAll){
  var initialisation = $q.defer();
   var projects   = [];
   var projectsJS = [];
   var steps = [];

  dataAll.forEach(function(d){
   if(d[uriBase+'type'] === 'Project'){
      projects.push(d);
    }
    if(d[uriBase+'type'] === 'step'){
              steps.push(d);
    }
  });

  projects.forEach(function(d){
        var projectJS = self.createProject(d);
        if(d[uriBase+'steps']!==null){
          if(angular.isArray(d[uriBase+'steps'])){
            d[uriBase+'steps'].forEach(function(s){
              var step = self.getStepJsByProject(s,dataAll);

              projectJS.steps.push(step);
            });
          }
          else{
            var step = self.getStepJsByProject(d[uriBase+'steps'], dataAll);
            projectJS.steps.push(step);
          }
        }
        projectsJS.push(projectJS);
  });


  initialisation.resolve(projectsJS);
  return(initialisation.promise);

};


 this.getProjectJsById = function(idProject, isSteps, isMedias){
    var initialisation = $q.defer();
    var project = [];
    var steps = [];
    var dataProject;

    ProjectsService.setCurrentProject(idProject)
    .then(function(data){
    	
    	self.graph = data;
      //console.log (data);
        dataProject = data['@graph'];
        //console.log (data);
        //console.log (dataProject);
        if (dataProject){
          dataProject.forEach(function(d){
            if(d[uriBase+'type'] === 'Project'){
              project = d;
            }
            if(d[uriBase+'type'] === 'step'){
              steps.push(self.createStep(d));
            }
          });
        }else{
          //console.log(data);
          project = data;
        }
        
      //console.log (project);
        var projectJS = self.createProject(project);
        //console.log (projectJS);
        if (isSteps){
          if(project[uriBase+'steps']){
          	var stepsReferences = project[uriBase+'steps'];
          	if(!angular.isArray(stepsReferences)){
          		stepsReferences = [stepsReferences];
          	}
          	
          	
          	//note : if gardé pour pas tout casser, mais doit etre supprimé lors d'un refactoring
            if(stepsReferences){
          	  stepsReferences.forEach(function(s){
                var step = self.getStepJsByProject(s,dataProject);
                //console.log (steps);
                //TODO : a revoir mais cette partie "ismedia" ne semble rien à voir à faire ici... je sais même pas si c'est accessible
                if (isMedias){  
                  var medias = self.getMedias(steps, step['@id']);
                  //console.log (medias);
                  if (medias !== undefined && medias !== null){
                  if(angular.isArray(medias)){
                    medias.forEach(function(m){
                  	  if(typeof(m) === 'string'){
                  		  if (m.indexOf('BNode') === -1){ //les noeud vides
                                var promiseM = self.MediaJsById(m);
                                promiseM.then(function(media){
                                  console.log (media);
                                  step.medias.push(media);
                                  step._medias.push(media);
                                });  
                              } 
                  	  }else{
                  		  console.log('cas particulier où l\'on a un object à la place d\'un string.');
                  	  }
                    });
                  }
                  else {
                    console.log('step 2');
                    
                      var promiseM = self.MediaJsById(medias);
                        promiseM.then(function(media){
                          //console.log (media);
                          step.medias.push(media);
                          step._medias.push(media);
                      });  
                    }
                  }
                }  

                  projectJS.steps.push(step);
              }); //project.foreach
            }
            else{
          	  console.warn('on en doit pas aller normalement dans cette partie du code');
          	  //commenté depuis le 20151014
          	  //on est dans le cas du premier step, l'on a donc pas un tableau de référence mais juste un item seul.
//          	  if(project[uriBase+'steps']){
//          		  var step = self.getStep(project[uriBase+'steps']);
//                    projectJS.steps.push(step);
//          	  }
              
            }

          }
         
        }
        initialisation.resolve(projectJS);

    },
    function(){
        console.log('error');
    }
    );
    return(initialisation.promise);
  };



  this.getMedias = function(steps,id){
    //console.log (steps);
    var medias = [];
    steps.forEach(function(step){
      if(step['@id'] === uriBase +'#step#' +id){ // Je trouve la bonne étape
        medias = step[uriBase + 'medias'];
      }
    });
    //console.log (medias);
    return(medias);
  };

  this.MediaJsById = function(id){
    //console.log (id);
    var initialisation = $q.defer();
    var mediaJS = [];
    var media = [];
    var baseUrl = 'http://tofix.uri/'+id;
    var uriToFix = 'http://tofix.uri/';
    var parameters = {
            scheme : '', //the default one
            queryFn : function(){
                return {
                    method : 'GET',
                    url:urlStanbol.address+'/graph/data/myUser/'+baseUrl,
                };
            }
    };
    $http({
        method : 'GET',
        url : parameters.queryFn().url, //rdfuiConfig.server+'skosifier?uri='+uri,
   
    }).success(function(d){
      media = d;
      
    }).error(function(){
        console.log('error');
    }).then(function(){
      //console.log (media);
      if(media['@id']=== uriToFix +id + '##' +id){

        mediaJS = ProxyMediasService.createMedia(media);
        //console.log (mediaJS);
        
      }  
    initialisation.resolve(mediaJS);
    });
    return(initialisation.promise);
  };
       
  this.getMediaObj = function(id){
    var mediaJS = {};
    var uriToFix = 'http://tofix.uri/';
    dataAll.forEach(function(d){
      //console.log (d);
      if(d['@id'] === uriToFix +id + '##' +id){
    	  
    	  Object.defineProperty(mediaJS, '_@id', {
	          value : d[uriBase + '@id'],
	          enumerable : true,
	          writable : true
	      });
    	  
    	  Object.defineProperty(mediaJS, '@id', {
    		  value : d[uriBase + '@id'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, '_description', {
    		  value : d[uriBase + 'description'],
    		  enumerable : true,
    		  writable : true
    	  });
    	  
    	  Object.defineProperty(mediaJS, 'description', {
    		  value : d[uriBase + 'description'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, '_id', {
    		  value : d[uriBase + 'id'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, '_link', {
    		  value : d[uriBase + 'link'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, '_source', {
    		  value : d[uriBase + 'source'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, '_title', {
    		  value : d[uriBase + 'title'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, '_type', {
    		  value : d[uriBase + 'type'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, '_typeMedia', {
    		  value : d[uriBase + 'typeMedia'],
    		  enumerable : true,
    		  writable : true
    	  });
        
    	  Object.defineProperty(mediaJS, 'ordreDsStep', {
    		  value : d[uriBase + 'ordreDsStep'],
    		  enumerable : true,
    		  writable : true
    	  });
        
    	  Object.defineProperty(mediaJS, '_ordreDsStep', {
    		  value : d[uriBase + 'ordreDsStep'],
    		  enumerable : true,
    		  writable : true
    	  });
    	  
    	  Object.defineProperty(mediaJS, 'id', {
    		  value : d[uriBase + 'id'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, 'link', {
    		  value : d[uriBase + 'link'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, 'source', {
    		  value : d[uriBase + 'source'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, 'title', {
    		  value : d[uriBase + 'title'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, 'type', {
    		  value : d[uriBase + 'type'],
    		  enumerable : true,
    		  writable : true
    	  });

    	  Object.defineProperty(mediaJS, 'typeMedia', {
    		  value : d[uriBase + 'typeMedia'],
    		  enumerable : true,
    		  writable : true
    	  });
      }
    });
    return(mediaJS);
  };

  //TODO : see not usable
  this.getStep = function(id){
	  console.warn('20151014 : this function seems deprecated, please don\'t use it, and remove it.');
    var step = {};
    //graphService.findNode('http://ooffee.eu/ns/urban##step#1d6c');
    dataAll.forEach(function(d){
      if(d['@id']=== uriBase +'#step#' +id){
          Object.defineProperty(step, '_id',{
            value : d[uriBase + 'id'],
            enumerable : true,
            writable : true
          });


          Object.defineProperty(step, 'id',{
            value : d[uriBase + 'id'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '@id',{
            value : id,
            enumerable : true,
            writable : true
          });


          Object.defineProperty(step, '_lng',{
              value : d[uriBase + 'lng'],
              enumerable : true,
              writable : true
          });


          Object.defineProperty(step, 'lng',{
              value : d[uriBase + 'lng'],
              enumerable : true,
              writable : true
          });

          Object.defineProperty(step, '_message',{
              value : d[uriBase + 'message'],
              enumerable : true,
              writable : true
          });


          Object.defineProperty(step, 'message',{
              value : d[uriBase + 'message'],
              enumerable : true,
              writable : true
          });


          Object.defineProperty(step, '_lat',{
              value : d[uriBase + 'lat'],
              enumerable : true,
              writable : true
          });


          Object.defineProperty(step, 'lat',{
              value : d[uriBase + 'lat'],
              enumerable : true,
              writable : true
          });

          Object.defineProperty(step, 'position', {
            value : d[uriBase + 'position'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_position', {
            value : d[uriBase + 'position'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, 'title',{
            value : d[uriBase + 'title'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_title',{
            value : d[uriBase + 'title'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, 'description',{
            value : d[uriBase + 'description'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_description',{
            value : d[uriBase + 'description'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, 'learnMore',{
            value : d[uriBase + 'learnMore'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_learnMore',{
            value : d[uriBase + 'learnMore'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_isVisible',{
            value : d[uriBase + 'isVisible'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, 'isVisible',{
            value : d[uriBase + 'isVisible'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_type',{
            value : d[uriBase + 'type'],
            enumerable : true,
            writable : true
          });
          Object.defineProperty(step, 'type',{
            value : d[uriBase + 'type'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_visual',{
            value : d[uriBase + 'visual'],
            enumerable : true,
            writable : true
          });
          Object.defineProperty(step, 'visual',{
            value : d[uriBase + 'visual'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_medias',{
            value : [],
            enumerable : true,
            writable : true
          });
          Object.defineProperty(step, 'medias',{
            value : [],
            enumerable : true,
            writable : true
          });
      }
    });
    return(step);
  };

  
  //TODO : comment and remove this function
  this.getStepJsByProject = function(id, dataProject){
	  console.warn('deprecated function, please not use it');
    var step = {};
    //graphService.findNode('http://ooffee.eu/ns/urban##step#1d6c');
    dataProject.forEach(function(d){
      if(d['@id']=== uriBase +'#step#' +id){
          Object.defineProperty(step, '_id',{
            value : d[uriBase + 'id'],
            enumerable : true,
            writable : true
          });


          Object.defineProperty(step, 'id',{
            value : d[uriBase + 'id'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '@id',{
            value : id,
            enumerable : true,
            writable : true
          });


          Object.defineProperty(step, '_lng',{
              value : d[uriBase + 'lng'],
              enumerable : true,
              writable : true
          });


          Object.defineProperty(step, 'lng',{
              value : d[uriBase + 'lng'],
              enumerable : true,
              writable : true
          });

          Object.defineProperty(step, '_message',{
              value : d[uriBase + 'message'],
              enumerable : true,
              writable : true
          });


          Object.defineProperty(step, 'message',{
              value : d[uriBase + 'message'],
              enumerable : true,
              writable : true
          });


          Object.defineProperty(step, '_lat',{
              value : d[uriBase + 'lat'],
              enumerable : true,
              writable : true
          });


          Object.defineProperty(step, 'lat',{
              value : d[uriBase + 'lat'],
              enumerable : true,
              writable : true
          });

          Object.defineProperty(step, 'position', {
            value : d[uriBase + 'position'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_position', {
            value : d[uriBase + 'position'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, 'title',{
            value : d[uriBase + 'title'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_title',{
            value : d[uriBase + 'title'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, 'description',{
            value : d[uriBase + 'description'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_description',{
            value : d[uriBase + 'description'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, 'learnMore',{
            value : d[uriBase + 'learnMore'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_learnMore',{
            value : d[uriBase + 'learnMore'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_isVisible',{
            value : d[uriBase + 'isVisible'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, 'isVisible',{
            value : d[uriBase + 'isVisible'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_type',{
            value : d[uriBase + 'type'],
            enumerable : true,
            writable : true
          });
          Object.defineProperty(step, 'type',{
            value : d[uriBase + 'type'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_visual',{
            value : d[uriBase + 'visual'],
            enumerable : true,
            writable : true
          });
          Object.defineProperty(step, 'visual',{
            value : d[uriBase + 'visual'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(step, '_medias',{
            value : [],
            enumerable : true,
            writable : true
          });
          Object.defineProperty(step, 'medias',{
            value : [],
            enumerable : true,
            writable : true
          });
      }
    });
    return(step);
  };


  this.createProject = function(d){
    var projectJS = {};

    Object.defineProperty(projectJS, '_@id', {
        value : d['@id'],
        enumerable : true,
        writable : true
      });

    Object.defineProperty(projectJS, '@id', {
      value : d['@id'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_author', {
      value : d[uriBase + 'author'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'author', {
      value : d[uriBase + 'author'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_dateCreate', {
      value : d[uriBase + 'dateCreate'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'dateCreate', {
      value : d[uriBase + 'dateCreate'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_dateUpdate', {
      value : d[uriBase + 'dateUpdate'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'dateUpdate', {
      value : d[uriBase + 'dateUpdate'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_id', {
      value : d[uriBase  + 'id'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'id', {
      value : d[uriBase  + 'id'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_name', {
      value : d[uriBase + 'name'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'name', {
      value : d[uriBase + 'name'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_status', {
      value : d[uriBase + 'status'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'status', {
      value : d[uriBase + 'status'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_minZoom', {
      value : d[uriBase + 'minZoom'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'minZoom', {
      value : d[uriBase + 'minZoom'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_maxZoom', {
      value : d[uriBase + 'maxZoom'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'maxZoom', {
      value : d[uriBase + 'maxZoom'],
      enumerable : true,
      writable : true
    });


    Object.defineProperty(projectJS, '_lat', {
      value : d[uriBase + 'lat'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'lat', {
      value : d[uriBase + 'lat'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'lng', {
      value : d[uriBase + 'lng'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_lng', {
      value : d[uriBase + 'lng'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_zoom', {
      value : d[uriBase + 'zoom'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'zoom', {
      value : d[uriBase + 'zoom'],
      enumerable : true,
      writable : true
    });


    Object.defineProperty(projectJS, '_type', {
      value : d[uriBase + 'type'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'type', {
      value : d[uriBase + 'type'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_ishomePage', {
      value : d[uriBase + 'ishomePage'],
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, 'ishomePage', {
      value : d[uriBase + 'ishomePage'],
      enumerable : true,
      writable : true
    });

    var homePage = {
      description : d[uriBase + 'homepagedescription'],
      learnMore : d[uriBase + 'homepagelearnMore'],
      images : d[uriBase + 'homepageimages'],
      isVirtualObj : true
    };

    var _homePage = angular.copy(homePage);

    Object.defineProperty(projectJS, 'homepage', {
      value : homePage,
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_homepage', {
      value : _homePage,
      enumerable : true,
      writable : true
    });

    var footer = {
      about : d[uriBase + 'footerabout'],
      help : d[uriBase + 'footerhelp'],
      image : d[uriBase + 'footerimage'],
      isVirtualObj : true
    };

    var _footer = angular.copy(footer);

    Object.defineProperty(projectJS, 'footer', {
      value : footer,
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS, '_footer', {
      value : _footer,
      enumerable : true,
      writable : true
    });

    Object.defineProperty(projectJS,'steps', {
      value : [],
      enumerable : true,
      writable : true
    });


    Object.defineProperty(projectJS,'_steps', {
      value : [],
      enumerable : true,
      writable : true
    });

    projectJS.saveObj = function(projectJS, graph){
    	return saveObjectService.saveObj(projectJS,graph);
    };
    
    return projectJS;
};


this.createStep = function(stepInProgress){
	console.warn('TODO : remove call to this function, better call directly the model');
	return stepModel.createStep(stepInProgress);
	/*
	console.log(stepInProgress);
  var step = {};

  Object.defineProperty(step, '_id',{
    value : stepInProgress['_id'] !== '' ? stepInProgress['_id'] : '',
    enumerable : true,
    writable : true
  });


  Object.defineProperty(step, 'id',{
    value : stepInProgress['id'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, '@id',{
    value : stepInProgress['@id'] ? stepInProgress['@id'] : utils.guid()+'',
    enumerable : true,
    writable : true
  });


  Object.defineProperty(step, '_lng',{
      value : stepInProgress['_lng'] !== '' ? stepInProgress['_lng'] : '',
      enumerable : true,
      writable : true
  });


  Object.defineProperty(step, 'lng',{
      value : stepInProgress.markers ?  stepInProgress.markers['lng'] : stepInProgress['lng'],
      enumerable : true,
      writable : true
  });


  Object.defineProperty(step, '_lat',{
      value : stepInProgress['_lat'] !== '' ? stepInProgress['_lat'] : '',
      enumerable : true,
      writable : true
  });


  Object.defineProperty(step, 'lat',{
      value : stepInProgress.markers ?  stepInProgress.markers['lat'] : stepInProgress['lat'],
      enumerable : true,
      writable : true
  });

  Object.defineProperty(step, 'position', {
    value : stepInProgress['position'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, '_position', {
    value : stepInProgress['_position'] !== '' ? stepInProgress['_position'] : '',
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, '_message', {
    value : stepInProgress['_message'] !== '' ? stepInProgress['_message'] : '',
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, 'message', {
    value : stepInProgress['message'],
    enumerable : true,
    writable : true
  });


  Object.defineProperty(step, '_title',{
    value : stepInProgress['_title'] !== '' ? stepInProgress['_title'] : '',
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, 'title',{
    value : stepInProgress['title'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, '_isVisible',{
    value : stepInProgress['_isVisible'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, 'isVisible',{
    value : stepInProgress['isVisible'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, '_type',{
    value : stepInProgress['_type'],
    enumerable : true,
    writable : true
  });
  Object.defineProperty(step, 'type',{
    value : stepInProgress['type'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, '_description',{
    value : stepInProgress['_description'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, 'description',{
    value : stepInProgress['description'],
    enumerable : true,
    writable : true
  });


  Object.defineProperty(step, '_learnMore', {
    value : stepInProgress['_learnMore'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, 'learnMore', {
    value : stepInProgress['learnMore'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, '_visual',{
    value : stepInProgress['_visual'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, 'visual',{
    value : stepInProgress['visual'],
    enumerable : true,
    writable : true
  });


  Object.defineProperty(step, '_medias',{
    value : stepInProgress['_medias'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, 'medias',{
    value : stepInProgress['medias'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(step, 'position', {
    value : stepInProgress['position'],
    enumerable : true,
    writable : true
  });
  Object.defineProperty(step, 'title',{
    value : stepInProgress['title'],
    enumerable : true,
    writable : true
  });


  step.saveObj = function(step, graph){
	  return saveObjectService.saveObj(step,graph);
  };

  return step;
  */
};


  /******************************** JVX : 17/03/15***************************/
  /* Fonction non utilisÃ©e pour le moment. Pour le moment tous les projects */
  /* sont remontÃ©s en mÃªme temps. Cette fonction permettrait de remonter    */
  /* qu'un seul projet. A voir si par la suite c'est vraiment utile.        */
  /*                                                                        */
  /**************************************************************************/

  //function deprecated à commenter puir remove
  this.getProject = function(uri){
	  console.warn('deprecated since 20151014');
      var project = [];
      var uriBase = 'http://ooffee.eu/ns/urban#';
      var parameters = {
      scheme : '', //the default one
      queryFn : function(/*string*/ uri){
        return {
          method : 'GET',
          url : urlStanbol.address+'/graph/data/myUser/'+uri,
          };
        }
      };

    //uri = {{uri}};

      var promiseProject = graphService.getLazyGraph(uri,parameters,'');
      promiseProject.then(function(data){
    	  
    	  console.warn('Deprecated code, read the comments in the code');
    	  //TODO : use the self.toJsObject function here.
    	  //This is a previous implementation, and not clean about how this is really works.
        project = data['@graph'];
        
        project.forEach(function(d){
          var projectJS = {};

          Object.defineProperty(projectJS, '_author', {
            value : d[uriBase + 'author'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'author', {
            value : d[uriBase + 'author'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_dateCreate', {
            value : d[uriBase + 'dateCreate'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'dateCreate', {
            value : d[uriBase + 'dateCreate'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_dateUpdate', {
            value : d[uriBase + 'dateUpdate'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'dateUpdate', {
            value : d[uriBase + 'dateUpdate'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_id', {
            value : d[uriBase  + 'id'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'id', {
            value : d[uriBase  + 'id'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_name', {
            value : d[uriBase + 'name'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'name', {
            value : d[uriBase + 'name'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_status', {
            value : d[uriBase + 'status'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'status', {
            value : d[uriBase + 'status'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_minZoom', {
            value : d[uriBase + 'minZoom'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'minZoom', {
            value : d[uriBase + 'minZoom'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_maxZoom', {
            value : d[uriBase + 'maxZoom'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'maxZoom', {
            value : d[uriBase + 'maxZoom'],
            enumerable : true,
            writable : true
          });


          Object.defineProperty(projectJS, '_lat', {
            value : d[uriBase + 'lat'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'lat', {
            value : d[uriBase + 'lat'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'lng', {
            value : d[uriBase + 'lng'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_lng', {
            value : d[uriBase + 'lng'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_zoom', {
            value : d[uriBase + 'zoom'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'zoom', {
            value : d[uriBase + 'zoom'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_ishomePage', {
            value : d[uriBase + 'ishomePage'],
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, 'ishomePage', {
            value : d[uriBase + 'ishomePage'],
            enumerable : true,
            writable : true
          });

          var center = {
            lng : d[uriBase + 'lng'],
            lat : d[uriBase + 'lat'],
            zoom : d[uriBase + 'zoom'],
          };

          Object.defineProperty(projectJS, 'center', {
            value : center,
            enumerable : true,
            writable : true
          });

          Object.defineProperty(projectJS, '_center', {
            value : center,
            enumerable : true,
            writable : true
          });
        });

        return(project);
    });
  };


  this.save = function(graph,uri, projectJS){
    return projectJS.saveObj(projectJS, graph);
  };

  this.delete = function(graph, idProject){
    var def = $q.defer();
    var uriAll = 'http://www.culture-terminology.org/ontologies/history#all';
    var promiseChange = graphService.buildChanges(graph, idProject, uriAll, [uriAll]);
    promiseChange.then(function(){
        console.log('fini');
        def.resolve();
    });
    return(def.promise);
  };

  this.deleteLienProjectStep = function(graph, uriProject, idStep){
    var def = $q.defer();
    
    var promiseChange = graphService.buildChanges(graph, uriProject, uriBase + 'steps', [idStep, null]);
    promiseChange.then(function(){
      console.log('step supprimÃ©e');

      def.resolve();
    });
    return(def.promise);
  };

  this.deleteLienStep = function(graph,  idMedia){
    var def = $q.defer();
    var uriAll = 'http://www.culture-terminology.org/ontologies/history#all';
    
    var promiseChange = graphService.buildChanges(graph, uriAll, uriBase + 'medias', [idMedia, null]);
    promiseChange.then(function(){
      console.log('media supprimée from step');
      def.resolve();
    });
    return(def.promise);
  };


  this.getCartJS = function(){
    var initialisation = $q.defer();
    var carts = [];
    var cartsJS = [];
    var dataAll = [];
    var parameters = {
            scheme : '', //the default one
            queryFn : function(){
                return {
                    method : 'GET',
                    url : urlStanbol.address+'/graph/list/typeGraph?typeGraph=data'

                };
            }
    };
    var uriBase = 'http://ooffee.eu/ns/urban#';

    $http({
        method : 'GET',
        url : parameters.queryFn().url, //rdfuiConfig.server+'mediamanagement?uri='+uri,
    }).success(function(data){
        dataAll = data['@graph'];
        dataAll.forEach(function(d){
          if(d[uriBase+'type'] === 'Cart'){
            carts.push(d);
          }
        });
        //projects = data['@graph'];
        //console.log(projectJS);
    }).error(function(){
        console.log('error');
    }).then(function(){

      carts.forEach(function(d){
        var cartJS = self.createCart(d);
        //console.log(cartJS);
        if(d[uriBase+'medias']!==null){
          if(angular.isArray(d[uriBase+'medias'])){
            d[uriBase+'medias'].forEach(function(s){
              var media = self.getMedia(s,dataAll);
              //console.log(media);
              cartJS.medias.push(media);
              //console.log(cartJS);
            });
          }
          else{
            var media = self.getMedia(d[uriBase+'medias'], dataAll);
            cartJS.medias.push(media);
            //cartJS.medias.push(media);
            //console.log(cartJS);
          }
        }
        cartsJS.push(cartJS);
      });
      initialisation.resolve(cartsJS);
    });
  return(initialisation.promise);
};

this.getMedia = function(mediaId, dataAll){
  console.log('To do amÃ©liorer ce dataAll pas top du tout');
  var media = [];

  dataAll.forEach(function(d){

        //console.log(uriBase +'#step#' +mediaId);
        if(d[uriBase + 'type'] === 'Media'){
        }
        //console.log(uriToFix +mediaId +'##' +mediaId)
        if(d['@id'] === mediaId){
          media = self.createMedia(d);

        //  cart.medias.push(media);
    }
  });
  return(media);
};


//@TODO : idem remarque fonction suivante : cette fonction ne doit pas être dupliquée entre proxyProjet et proxyMedia.
this.createCart = function(d){
  var cartJS = {};
  //console.log(d);
  Object.defineProperty(cartJS, 'id', {
    value : d[uriBase + 'id'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, '_id', {
    value : d[uriBase + 'id'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, 'created', {
    value : d[uriBase + 'created'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, '_created', {
    value : d[uriBase + 'created'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, 'name', {
    value : d[uriBase + 'name'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, '_name', {
    value : d[uriBase + 'name'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, 'type', {
    value : d[uriBase + 'type'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, '_type', {
    value : d[uriBase + 'type'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, 'medias', {
    value : [],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(cartJS, '_medias', {
    value : [],
    enumerable : true,
    writable : true
  });

  return(cartJS);
};

//TODO : pourquoi cette fonction semble dupliquée avec celle de proxyMedia.createMedia ??
//Il ne faut en laisser qu'une, apparement dans proxyMedia
this.createMedia = function(d){
  
  //var mediaJS = ProxyMediasService.toJson(d);

 var mediaJS = {};

  Object.defineProperty(mediaJS, '_@id', {
    value : d[uriBase + '_@id'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, '_description', {
    value : d[uriBase + 'description'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, '_id', {
    value : d[uriBase + 'id'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, '_link', {
    value : d[uriBase + 'link'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, '_source', {
    value : d[uriBase + 'source'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, '_title', {
    value : d[uriBase + 'title'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, '_type', {
    value : d[uriBase + 'type'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, '_typeMedia', {
    value : d[uriBase + 'typeMedia'],
    enumerable : true,
    writable : true
  });


  Object.defineProperty(mediaJS, '@id', {
    value : d[uriBase + '@id'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, 'description', {
    value : d[uriBase + 'description'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, 'id', {
    value : d[uriBase + 'id'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, 'link', {
    value : d[uriBase + 'link'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, 'source', {
    value : d[uriBase + 'source'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, 'title', {
    value : d[uriBase + 'title'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, 'type', {
    value : d[uriBase + 'type'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, 'typeMedia', {
    value : d[uriBase + 'typeMedia'],
    enumerable : true,
    writable : true
  });

  Object.defineProperty(mediaJS, 'ordreDsStep', {
      value : d[uriBase + 'ordreDsStep'],
      enumerable : true,
      writable : true
    });
    Object.defineProperty(mediaJS, '_ordreDsStep', {
      value : d[uriBase + 'ordreDsStep'],
      enumerable : true,
      writable : true
    });
  
  //console.log(mediaJS);
  return(mediaJS);
};

this.saveMediaJS = function(obj,graph){
  var def = $q.defer();
  var uriFixe = 'http://tofix.uri/';
  var uriBase = 'http://ooffee.eu/ns/urban#';
  
  Object.keys(obj).forEach(function(K){
    if(K.startsWith('_')){
      if(!(angular.equals(obj[K],obj[K.substring(1)]))){
        var oldV = obj[K];
        var newV = obj[K.substring(1)];
        console.warn('To do : corriger le pb obj[@id] vide ');
        var promiseChange = graphService.buildChanges(graph, [uriFixe + obj['id']+'##'+obj['id'],uriFixe + obj['id']+'##'+obj['id']], uriBase + K.substring(1), [oldV,newV]);
        promiseChange.then(function(){
          def.resolve();
        });
      }
    }
  });
  return(def.promise);
};



    var self = this;
});
