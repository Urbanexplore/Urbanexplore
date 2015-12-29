'use strict';


angular.module('urbanBackOfficeApp')
.service('PublishService', function ($filter, $http, jsonLD,graphService,urlStanbol,$q) {

	  
	/* 
	* Les ressoucres du project ( medias, tiles et data) sont enregistré ds
	* publish/[idProject] 
	* medias  [idProject]/images
	* tiles   [idProject]/site
	* data    [idProject]/project.json
	*
	*/

	
    /*
    Ok telechargement ds publish/[idProject]/site
    */
    this.publishMap = function(project){
      var def = $q.defer();
      /*
      To do utiliser ce service avec les valeurs du project
      http://127.0.0.1:8080/mediamanagement/downloadTiles?lat=48.8763241&lon=2.315&zoomLimit='+zoomLimit+'&minZoom='+minZoom+'&maxZoom='+maxZoom+'&radius='+radius
      Copier les images obtenus dans le repertoire dist/images/site/cache/
      */
      var lat = project.lat || 56.94951;
      var lng = project.lng || 24.10810;
      var zoomLimit = project.maxZoom || 20;
      var minZoom = project.minZoom || 10;
      var maxZoom = project.maxZoom || 18;
      var radius = project.radius || 8;
      console.log (lat);
      $http.defaults.headers.common.Authorization = urlStanbol.pwd;
      $http({
        method: 'GET',
        url: urlStanbol.address+'/mediamanagement/downloadTiles?idProject='+project.id+'&lat='+lat+'&lon='+lng+'&zoomLimit='+zoomLimit+'&minZoom='+minZoom+'&maxZoom='+maxZoom+'&radius='+radius,

      })
      .success(function (data, status) {
        console.log(status);
        def.resolve({ message: 'This is great!' });
      }).error(function (data, status) {
        console.log(status);
         def.reject({ message: 'Really bad' });
      });

      return def.promise;
    };
  /*
  downloadVideoYoutube from youtube
  valable que pour les video youtube
  tres tres long le telechargement
  telechargement ds publish/[idProject]/medias
  */

   this.downloadVideoYoutube =  function  (linkVideo, idProject){
      var def = $q.defer();
      //extraire id from url
      //console.log (linkVideo);
      var videoId = linkVideo.split('/v/')[1];
      console.log (videoId);
     /* var ampersandPosition = video_id.indexOf('&');
      if(ampersandPosition !=== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      */
      console.log(videoId);
      if (videoId !== undefined){
        //linkVideo :'http://www.youtube.com/v/o5KsFRSwPAU'
        $http.defaults.headers.common.Authorization = urlStanbol.pwd;
        $http({
          method: 'GET',
          url: urlStanbol.address+'/mediamanagement/upload/youtube?idProject='+idProject+'&id='+videoId,
        })
        .success(function (data, status) {
            console.log(status);
            def.resolve({ message: 'This is great!' });
        }).error(function (data, status) {
            console.log(status);
            def.reject({ message: 'Really bad' });
        });
         return def.promise;
      }
    };

    /*
    download image from url
    Ok telechargement ds publish/[idProject]/medias

    */
    this.downloadImage =  function (urlImage, destinationFile, idProject){
      console.log (idProject);
      var def = $q.defer();
      urlImage = urlImage.replace('&', '%26');
      $http.defaults.headers.common.Authorization = urlStanbol.pwd;
      $http({
        method: 'GET',
        url: urlStanbol.address+'/mediamanagement/uploadImages?idProject='+idProject+'&url='+urlImage+'&destinationFile='+destinationFile,

      })
      .success(function (data, status) {
        console.log(status);
         def.resolve({ message: 'This is great! downloadImage' });
      }).error(function (data, status) {
        console.log(status);
        def.reject({ message: 'Really bad: downloadImage' });
      });
      return def.promise;

    };

    this.copyFiles =  function (link, idProject){
      console.log (idProject);
      var def = $q.defer();
      if(!link){
    	  def.reject({message : "The link passed is a null object"});
    	  return def.promise;
      }
      
      var title = link.replace('images/', '');
      console.log (title);
      $http.defaults.headers.common.Authorization = urlStanbol.pwd;
      $http({
        method: 'GET',
        url: urlStanbol.address+'/mediamanagement/copyFiles?idProject='+idProject+'&title='+title,

      })
      .success(function (data, status) {
        console.log(status);
         def.resolve({ message: 'This is great! copyFiles' });
      }).error(function (data, status) {
        console.log(status);
        def.reject({ message: 'Really bad: copyFiles' });
      });
      return def.promise;

    };

    //TODO : la gestion des deferer n'est pas bonne dans cette fonction. Ils ne servent à rien.
    this.publishMedias = function(Project){
      var def = $q.defer();
      /* uploader les medias selon leur type et leurs sources
      /* Copier coller les médias du projet dans le repertoire dist/images/ */

      Project.steps.forEach(function(entry) { // download media selon leur types est sources
        if (entry.medias.length > 0){
          entry.medias.forEach(function(d) {
            //console.log (d);

            if (d.id !== undefined){
              if (d.typeMedia === 'VIDEO' && d.source === 'Youtube'){

                var promiseYV = self.downloadVideoYoutube(d.link, Project.id);
                promiseYV.then(function(){


                });
              } else if (d.typeMedia.toUpperCase().indexOf('IMAGE') > -1 && d.source === 'Europeana'){
                var promiseIE = self.downloadImage(d.link, d.id, Project.id);
                promiseIE.then(function(){


                });

              }
              else if (d.source === 'interne'){
                //faire une copie, puisque l'image/video est déja sur le disque dur
                console.log (d);
                console.warn ('faire une copie, puisque l\'image/video est déja sur le disque dur');
                var promiseIM = self.copyFiles(d.link, Project.id);
                promiseIM.then(function(){


                });

              }
            }
          });
        }
      });//scope.project.steps.forEach


      return(def.promise);
    };

    this.publishRessources = function(Project){
      var def = $q.defer();
      /* uploader les medias selon leur type et leurs sources
      /* Copier coller les médias du projet dans le repertoire dist/images/ */

      Project.steps.forEach(function(entry) {// download media selon leur types est sources
        if (entry.visual !== undefined && entry.visual.length > 0){
          console.log (entry.visual);
            var promiseIS = self.copyFiles(entry.visual, Project.id);
                promiseIS.then(function(){


                });
        }
      });
       console.log (Project.homepage.images);
      if (Project.homepage.images !== ''){
        var promiseIH = self.copyFiles(Project.homepage.images, Project.id);
        promiseIH.then(function(){


        });
      }
      console.log (Project.footer.image);
      if (Project.footer.image !== ''){
        var promiseIF = self.copyFiles(Project.footer.image, Project.id);
        promiseIF.then(function(){


        });
      }
      return(def.promise);   
    };

    this.publishProject = function(ProjectJS){
      var def = $q.defer();
      console.log (ProjectJS.id);
      var facetteName = 'data';
      var userName = 'myUser';

      var baseUrl = 'http://tofix.uri/'+ProjectJS.id;
      //var uri = 'http://tofix.uri/'+ProjectJS.id;

      //var idGraph = baseUrl + ProjectJS.id;

      var parameters = {
              scheme : '', //the default one
              queryFn : function(){
                  return {
                      method : 'GET',
                      url : urlStanbol.address+'/graph/writerdf/'+facetteName+'/'+userName+'/'+baseUrl,
                  };
              }
      };
      $http({
        method : 'GET',
        url : parameters.queryFn().url,
     
      })
      .success(function (data, status) {
        console.log(status);
         def.resolve({ message: 'This is great! ' });
      }).error(function (data, status) {
        console.log(status);
        def.reject({ message: 'Really bad: ' });
      });


      return(def.promise);
    };
    
    
    this.publishGlobal = function(Project){
      var def = $q.defer();

      var promisePublishMap = self.publishMap(Project);
      var promisePublishMedias = self.publishMedias(Project);
      var promisePublishProject = self.publishProject(Project);

      var promisePublishRessources = self.publishRessources(Project);
       
      Promise.all([promisePublishRessources,promisePublishProject, promisePublishMap, promisePublishMedias]).then(function(){

        def.resolve();
        
      });  


      return(def.promise);
    };

    var self = this;
});
