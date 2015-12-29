'use strict';

/**
 * @ngdoc service
 * @name urbanAppMobileApp.objectsProxy
 * @description
 * # objectsProxy
 * Service in the urbanAppMobileApp.
 */
angular.module('urbanAppMobileApp')
  .service('objectsProxy', function ($filter, $http, jsonLD,$q) {

  var uriBase = "http://ooffee.eu/ns/urban#";	

  this.getMedias = function(steps,id){
    var medias = new Array();

    steps.forEach(function(step){
      if(step["@id"] == uriBase +"#step#" +id){ // Je trouve la bonne Ã©tape
        medias = step[uriBase + "medias"];
      }
    });
    return(medias);
  }

  this.getMediaObj = function(id, dataAll){
    var mediaJS = {};
    var uriToFix = "http://tofix.uri/";
    dataAll.forEach(function(d,i){
      if(d["@id"]== uriToFix +id + "##" +id){

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

      }
    });
    return(mediaJS);
  }

  this.getStep = function(id, dataAll){
  
    var step = {};
  
    //graphService.findNode("http://ooffee.eu/ns/urban##step#1d6c");
    dataAll.forEach(function(d,i){
      if(d["@id"]== uriBase +"#step#" +id){
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
            value : id,
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
      	}
    });
    return(step);
  }

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
      value : new Array(),
      enumerable : true,
      writable : true
    });


    Object.defineProperty(projectJS,"_steps", {
      value : new Array(),
      enumerable : true,
      writable : true
    });


    
    return projectJS;

  } 


    var self = this;
});
