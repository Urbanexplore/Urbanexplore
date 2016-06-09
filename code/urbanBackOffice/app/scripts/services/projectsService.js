'use strict';

/**
 * @ngdoc service
 * @name sitejsApp.Projects
 * @description
 * # Projects
 * Service in the sitejsApp.
 */
angular.module('urbanBackOfficeApp')
  .service('ProjectsService', function ($filter, $http, jsonLD,graphService,urlStanbol, confUri, ProxyProjectsService, MediasService, $q, utils) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //to create unique project id
    var uid  = 1;
    var uidS = 1;
    var iconC ={
            type: 'awesomeMarker',
            icon: 'tag',
            markerColor: 'blue'
        };
    var projects =[];

    this.toJsonLd = function(obj){

    }
    
    var currentProject = null;

    //TODO : manage get and set CurrentProject in a better way when uniques call to "GET" procedure is cleanned
    
    this.setCurrentProject = function(projectID){
    	//TODO : make baseUrl a real parameter and put it globally
    	//var baseUrl = "http://tofix.uri/"

        var idGraph = confUri.baseUrl + projectID;
        //console.log(idGraph);


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
        //console.log(idGraph);
        var promiseGraph = graphService.getLazyGraph(idGraph,parameters,false);
        promiseGraph.then(function(dataGraph){
          currentProject = dataGraph;
          console.log(currentProject);
        });
        
        return promiseGraph;
    }
    
    this.getCurrentProject = function(){
    	console.warn("............");
    	console.log(currentProject);
    	if(currentProject != null) return currentProject;
    	return null;
    }
    

    //saveProject method create a new project if not already exists
    //else update the existing object
    this.saveProject = function (project, center) {
        var initialisation = $q.defer();
        var now = new Date();
        var nowFormat = $filter('date')(now, 'dd/MM/yyyy');
        if (project.id == null) {
            //if this is new project, add it in projects array

            project.id = utils.guid();
            project.dateCreate = nowFormat;
            project.dateUpdate = nowFormat;
            project.author = 'Julien';
            project.status ='App';

            console.warn("TODO : supprimer ces chiffres d'initilisation et surtout tester avec des float ou des doubles")
            project.lat = 0.12345;

            project.lng = 0.12345;

            //console.log(project.lat);
            //console.log(project.lng);
            project.zoom = 1;

            project.type = 'Project';

            console.warn("******** save new graph *****");

            //1) transform to ld
            var baseUrl = "http://tofix.uri/"
            var projectLD = jsonLD.toLD(project, baseUrl + project.id + "#");

            //console.log(projectLD);

            //TODO ?? Remplacement des caractères spéciaux du nom pour construire l'url ?
            var graphUri = baseUrl + project.id;
            var facetteName = "data";
            var userName = "myUser";

            var parameters = {
                    scheme : '', //the default one
                    queryFn : function(/*string*/ uri){
                        return {
                            method : 'POST',
                            url : urlStanbol.address+'/graph/'+facetteName+'/'+userName+'/'+uri,
                            data : projectLD
                        };
                    }
            };


            var promiseCreateGraph = graphService.createGraph(graphUri,parameters,projectLD);

            promiseCreateGraph.then(function(){
              initialisation.resolve(graphUri);
            });




        } else {
        	console.error('Cette partie de la fonction n\' est pas à utiliser');
            console.log("update");
            console.log(project.id);

            var baseUrl = "http://tofix.uri/"

            var idGraph = baseUrl + project.id;
            //console.log(idGraph);


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
            //console.log(idGraph);
            var promiseGraph = graphService.getLazyGraph(idGraph,parameters,false);
            promiseGraph.then(function(dataGraph){
              var graph = dataGraph;
              var promise = ProxyProjectsService.save(graph,project.id,project, center);
              promise.then(function(){
                initialisation.resolve();
              });

            });

        }
        return(initialisation.promise);
    }

    //@deprecated ? 
    this.saveStep = function (project, step) {
    	console.warn("TODO : see if this function is called. If not, remove it");
        if (step.id == null) {
            //if this is new project, add it in projects array

            step.id = utils.guid();
            project.steps.push(step);
        }else {
            //for existing project, find this project using id
            //and update it.
            for (var i in project.steps) {
                if (project.steps[i].id == step.id) {
                    project.steps[i] = step;
                }
            }
        }

    }

     this.getNbSteps= function (project){
        return project.steps.length;
    }



    this.get = function (data, id) {
        //var test = new Array();
        //console.log (data);
        projects = data;

        for (var i,i=0;i< projects.length; i++) {
            if (projects[i].id == id) {
                console.log("trouve");
                return projects[i];
            }
        }

    }

   

    this.getSteps = function(project){

        return(project.steps);
    }


     this.getNbMediaFromSteps = function(steps) {
         console.log("getNbMediaFromSteps");
        var nbMedia = 0;
        console.log(steps);
        steps.forEach(function(step){
           // console.log (step);
           // console.log (step.medias.length);
           // console.log (step.visual);
            
            if (step.medias && step.medias.length != 0){
                console.log (step.medias);
                for (var i in step.medias) {
                
                    if (media[i].id != undefined)
                        nbMedia++;
                }
            }    
        });    
        console.log (nbMedia);
       return nbMedia;

    }
    this.getStep = function(project, step_id){
        console.log("getStep");
        if(step_id == null) return createNewStep(project);
        else{
            for (var i in project.steps) {
                if (project.steps[i].id == step_id) {

                    return project.steps[i];
                }
            }
        }
    }

    //TODO : l'utilisation des promises est vraiment nécessaire sur cette fonction ? L'object project est déjà chargé normalement
    this.getStepByPosition = function(project, step_id){
        var initialisation = $q.defer();
        var step = new Array();
        console.log("getStepByPosition" + step_id);
       for (var i in project.steps) {
        console.warn("pq comparer position à id ??")
            if (project.steps[i].id == step_id) {
                step = project.steps[i];
                   
            }
        } 
         initialisation.resolve(step);
         return(initialisation.promise);   

    }

    this.getStepByProjectId = function(project_id, step_id, projects){
        //console.log (project_id  + " "+ step_id);
       // console.log(project_id);
       // console.log(step_id);
        //console.log(projects);
        var project;
        for (var i in projects) {
            if (projects[i].id == project_id) {
                project = projects[i];
                console.log("je trouve bien un projet")
                break;
            }
        }
        //console.log(project);
        //console.log(project.steps);
        for (var i in project.steps) {
            if (project.steps[i]["@id"] == step_id) {
                //console.log("je trouve bien la step");
                return project.steps[i];
            }

        }
    }

    //iterate through projects list and delete
    //project if found
    this.delete = function(id, projects){
        var def = $q.defer();
        var uriToFix = "http://tofix.uri/";
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

        console.log(id);
        //console.log(projects);
       //for (var i in projects) {
        projects.forEach(function(project,i){
            //console.log(project);    
            if (project.id == id) {    
                //var idGraph = id;
                console.log("project à supprimer trouver");
               // project = projects[i];
                var promiseGraph = graphService.getLazyGraph(uriToFix + project.id,parameters,false);
                promiseGraph.then(function(dataGraph){
                    //console.log(project);
                    //console.log(dataGraph);
                    var graph = dataGraph;
                    var promiseDelete = ProxyProjectsService.delete(graph, project["id"]);
                    promiseDelete.then(function(){
                        //console.warn (" le refresh des datatables n'est pas bon");
                        projects.splice(i, 1);
                        def.resolve();
                    });

                 
                
                });
            }
        });
        return(def.promise);
    }

    this.deleteStep = function (project, id) {
        var def = $q.defer();
        var uriToFix = "http://tofix.uri/";
        var uriStep ="http://ooffee.eu/ns/urban##step#";
        //for (var i in project.steps) {
        project.steps.forEach(function(step,i){       
            console.log(step.id);
            console.log(id);
            //if (project.steps[i].id == id) {
            if (step.id == id) {    
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

                //var step = project.steps[i];
                var promiseGraph = graphService.getLazyGraph(uriToFix + project.id,parameters,false);
                promiseGraph.then(function(dataGraph){
                    console.warn("To do : faire en sorte de charger ce graphe une seule fois. ");
                    var graph = dataGraph;
                    var promise = ProxyProjectsService.delete(graph, uriStep + step["@id"]);
                    promise.then(function(){
                      var promiseL = ProxyProjectsService.deleteLienProjectStep(graph,project["@id"], step["@id"]);
                      promiseL.then(function(){
                        project.steps.splice(i, 1);
                        def.resolve();
                      });
                    });
                });
            } //fin if
        });
        return(def.promise);
    }

    this.deleteMediaFromStep= function(step,mediaId, project){
        var def = $q.defer();
        var uriToFix = "http://tofix.uri/";
        var uriStep = "http://ooffee.eu/ns/urban##step#";
        var uriBase = "http://ooffee.eu/ns/urban#"
        //for (var i in step.medias) {
        step.medias.forEach(function(media,i){  
            if (media.id == mediaId) {
                    console.log("media à retirer de la step trouvé");
                    console.warn("To do : retirer ce chargement du graph ne le chargeait qu'une fois");
                    console.warn("To do : comprendre le step['@id'] qui ne semble pas être bon");
                    console.log(project["@id"]);
                    step.medias.splice(i, 1);
                    var promiseChargeGraph = chargementGraphProjet(uriToFix + project.id);
                    promiseChargeGraph.then(function(data){
                          var graph = data;
                          var promiseChangeStep = graphService.buildChanges(graph, uriStep + step["@id"],uriBase + "medias", [mediaId,null]);
                          promiseChangeStep.then(function(){
                                console.log("lien step media supprimé");
                                console.log(step["@id"]);
                                console.log(step);
                                 def.resolve();
                          });
                    });
            }
        });
        return(def.promise);
    }

    function chargementGraphProjet(uriGraph){
      var def = $q.defer();
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
      var promiseGraph = graphService.getLazyGraph(uriGraph,parameters,false);
      promiseGraph.then(function(dataGraph){
        console.log("graph charge");
        def.resolve(dataGraph);
      });
      return(def.promise);
    }

    this.getMediasByStep = function(medias, mediasId){
        var mediasObj = new Array();
        var media = new Array();
        console.log(medias);
        if(angular.isArray(mediasId)){
          mediasId.forEach(function(mediaId){
              console.log(mediaId);

              media = MediasService.getMedia(medias,mediaId);
              mediasObj.push(media);
            });
          }
        else{
          media = MediasService.getMedia(medias,mediasId);
          mediasObj.push(media);
        }
        return(mediasObj);
    }



    this.createNewStep  = function(project, m1){
        //fabriquer un id et retourner le step
        console.log (m1);
        var position = 0;
            if (project.steps != undefined)
                position =  project.steps.length;
        uidS = position +1.0;
        var step = {id : uidS, title:'New step', isVisible : m1.isVisible,
            position :position +1.0 ,
            lat :m1.lat,
            lng :m1.lng,
            type : m1.type
        };
        project.steps.push(step);
        return(step);
    }

    function createNewProject (){
        console.log ("createNewProject");
        var now = new Date();
        var nowFormat = $filter('date')(now, 'dd/MM/yyyy');
        var project = {id : utils.guid(),
            dateCreate: nowFormat,
            dateUpdate : nowFormat,
            author : "Julien",
            status :'App',

            steps:[],
            ishomePage : [
                    {name: 'Yes',  value:'option1',   ischecked: 'false'},
                    {name: 'No',   value:'option2',   ischecked: 'true'}
            ],
            isfooter : [
                    {name: 'Yes',  value:'option1',   ischecked: 'false'},
                    {name: 'No',   value:'option2',   ischecked: 'true'}
            ],
            advertising:[
                {name: 'App IPAD',    value:'ipad',    selected: true},
                {name: 'Version Web', value:'web',     selected: true},
                {name: 'SmartMap',    value:'smartmap',selected: true}

            ]
        };
        //console.log (project.steps);
        projects.push(project);
        return(project);
    }





});
