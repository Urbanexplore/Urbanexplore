'use strict';


angular.module('urbanBackOfficeApp')
.service('stepModel', function (utils) {

	//note : jshint directive to remove "better written in dot notation warning"
	
	/*jshint -W069 */


	this.createStep = function(stepInProgress){
		
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
	
	
	  //suppression de l'ajout de la fonction save à ce niveau à cause de la création de step dans la fonction saveObject qui créé une dépendance circulaire
	  //cette création au niveau du save object ne devrait pas être présente normalement.
	  //supprimer cette partie de l'algorithme pour avoir une structure d'objet "normale" avec un save.
	  /*
	  step.saveObj = function(step, graph){
		  return saveObjectService.saveObj(step,graph);
	  };*/
	
	  return step;
	};


    //var self = this;
});
