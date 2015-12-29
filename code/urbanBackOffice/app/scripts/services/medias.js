'use strict';

/**
 * @ngdoc service
 * @name sitejsApp.Media
 * @description
 * # Media
 * Service in the sitejsApp.
 */
angular.module('urbanBackOfficeApp')
	 .service('MediasService', function ($filter, $http, jsonLD, graphService, urlStanbol, ProxyMediasService, ProxyProjectsService, $q, utils) {

    var carts = [];
    var medias =[];
/**
 * retourne le nom des paniers ds lesquel un media donné à été ajouté 
 *
 * @param {string} mediaId : l'id du media
 * @param {array} carts : tous les paniers
 * @return {array} liste des paniers
 */

    this.getCartsInside = function(mediaId, carts){

        var listCarts = new Array();
        var mediaId = "http://tofix.uri/"+mediaId+"##"+mediaId;
        for (var i in carts) {
            var cart = carts[i];


            if (cart.medias == undefined) { //premier media ajouté
                cart.medias = new Array();
            }
            if (angular.isArray(cart.medias)){

                cart.medias.forEach(function(media,i){


                    if (media == mediaId)
                        listCarts.push(cart);

                });
            }else{
                if (cart.medias == mediaId)
                    listCarts.push(cart);

            }
        }

        return listCarts;

    }

//****************CRUD Cart***********************
    this.getCart= function (data,id) {
				carts = data;


        for (var i in carts) {
            if (carts[i].id == id) {
                return carts[i];
            }
        }
    }


    this.saveCart = function (cart, mediaId) {
				var def = $q.defer();
        if (cart.id == null) {

            var now = new Date();
            var nowFormat = $filter('date')(now, 'dd/MM/yyyy');
            cart.id = utils.guid();
            cart.created = nowFormat;
            cart.medias = new Array();
			cart.type  = "Cart";
			carts.push(cart);
						var baseUrl = "http://tofix.uri/"
						var graphUri = baseUrl + cart.id;

						var cartLD = jsonLD.toLD(cart, "http://tofix.uri/" + cart.id + "#");
						var facetteName = "data";
						var userName = "myUser";

						var parameters = {
							scheme : '', //the default one
							queryFn : function(/*string*/ uri){
			    				return {
			    					method : 'POST',
			    					url : urlStanbol.address+'/graph/'+facetteName+'/'+userName+'/'+uri,
			    					data : cartLD
			    				};
						    }
					    };

						var promiseCreateGraph = graphService.createGraph(graphUri,parameters,cartLD);
						promiseCreateGraph.then(function(){
							def.resolve();
						});
        }
				else{
					def.resolve();
				}
				return(def.promise);
    }

    this.deleteCart = function (id, carts) {
        console.log("deleteCart");
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

        carts.forEach(function(cart,i){
            if (cart.id == id) {
				console.log(cart.id);
				console.log(cart["@id"]);
				var promiseGraph = graphService.getLazyGraph(uriToFix + cart.id,parameters,false);
				promiseGraph.then(function(dataGraph){
					console.warn("To do : faire en sorte de charger ce graphe une seule fois. ");
					var graph = dataGraph;
					var promiseDelete = ProxyProjectsService.delete(graph, cart["id"]);
					promiseDelete.then(function(){
					   carts.splice(i, 1);
					   def.resolve();
					});
				});
            }
        });
	   return(def.promise);
    }

    this.emptyCart = function (cart) {
        var def = $q.defer();
      // console.log (cart);
        var uriAll = "http://www.culture-terminology.org/ontologies/history#all";
        var uriGraph = "http://tofix.uri/"+cart.id;
        var uriCart = "http://ooffee.eu/ns/urban##cart#";
        var uriBase = "http://ooffee.eu/ns/urban#"

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
        console.warn("To do : retirer ce chargement du graph ne le chargeait qu'une fois");
        console.warn("To do : comprendre le step['@id'] qui ne semble pas être bon");
        var promiseGraph = graphService.getLazyGraph(uriGraph,parameters,false);

        promiseGraph.then(function(data){
            var graph = data;
          //  console.log (uriCart+cart.id+" ****  "+uriBase + "medias" + "*****"+ cart['@id']);

            var promiseChange = graphService.buildChanges(graph, uriGraph+"##"+cart.id, uriBase + "medias", [uriAll, null]);

            promiseChange.then(function(){
                cart.medias = [];
                def.resolve();


            });
        });

        return(def.promise);



    }


///******************************************media action ************************
    this.addMedia = function (media) {
		var def = $q.defer();
    	console.log (media);
        media.id = utils.guid();
        media.type="Media";
        media.ordreDsStep="Un";
        medias.push(media);

		var baseUrl = "http://tofix.uri/"

        var graphUri = baseUrl + media.id;

				//media["@id"] = baseUrl + media.id +"##" +media.id;

        var mediaLD = jsonLD.toLD(media, "http://tofix.uri/" + media.id + "#");
        var facetteName = "data";
        var userName = "myUser";

        var parameters = {
            scheme : '', //the default one
            queryFn : function(/*string*/ uri){
                return {
                    method : 'POST',
                    url : urlStanbol.address+'/graph/'+facetteName+'/'+userName+'/'+uri,
                    data : mediaLD
                };
            }
        };

		var promiseCreateMedia = graphService.createGraph(graphUri,parameters,mediaLD);
		promiseCreateMedia.then(function(){
			def.resolve(media.id);
		});
		return(def.promise);
    }


this.getMedia= function (medias,id) {
    console.warn ("a renommer , utiliser pour cart et media");
			console.log("this.getMedia()");
        for (var i in medias) {
            if (medias[i].id == id) {
                return medias[i];
            }
        }
    }

 function getMedia ( medias, id) {
                console.log("function getMedia");
                console.log(medias)
                console.log(id);

        for (var i in medias) {
            if (medias[i].id == id) {
                                console.log("trouve");
                return medias[i];
            }
        }
    }
   


    this.deleteMedia = function (id, medias) {
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
        //for (var i in medias) {

        medias.forEach(function(media,i){
            if (media.id == id) {
                medias.splice(i, 1);
				//var media = medias[i];
    			console.log(media.id);
    			var promiseGraph = graphService.getLazyGraph(uriToFix + media.id,parameters,false);
    			promiseGraph.then(function(dataGraph){
    			    console.warn("To do : faire en sorte de charger ce graphe une seule fois. ");
    				var graph = dataGraph;

    				var promiseDelete = ProxyProjectsService.delete(graph, media["id"]);
                     console.warn("To do : Supprimer les liens de ce media in carts et steps s'ils existent ");
                     promiseDelete.then(function(){
                        //TODO: delete lien in step/cart
                        var promiseL = ProxyProjectsService.deleteLienStep(graph, media["@id"]);
                        promiseL.then(function(){
    				        def.resolve();
                        });    
                    });


    			});

            }
        });
				return(def.promise);
    }

    this.deleteAllMedia = function (medias) {
        //console.log ("deleteAllMedia");
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
        //for (var i in medias) {
        medias.forEach(function(media,i){
           medias.splice(i, 1);
            //var media = medias[i];
            console.log(media.id);
            var promiseGraph = graphService.getLazyGraph(uriToFix + media.id,parameters,false);
            promiseGraph.then(function(dataGraph){
                console.warn("To do : faire en sorte de charger ce graphe une seule fois. ");
                var graph = dataGraph;

                var promiseDelete = ProxyProjectsService.delete(graph, media["id"]);
                console.warn("To do : Supprimer les liens de ce media in carts et steps s'ils existent ");
                promiseDelete.then(function(){

                    def.resolve();
                });


            });

        });

        return(def.promise);

    }


//ajout d'un media ds un chariot
this.addToCartMedia = function (media, cart) {
        var def = $q.defer();
        console.log("add media "+ media.id+" cart id :" + cart.id);

        var baseUrl = "http://tofix.uri/"

        var idGraph = baseUrl + cart.id;
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


                var promiseGraph = graphService.getLazyGraph(idGraph,parameters,false);
                promiseGraph.then(function(dataGraph){
                    var graph = dataGraph;
                    var promise = ProxyMediasService.addMediaToCart(graph,cart.id,media.id);
                        promise.then(function(){
                            //
                            console.warn ("TODO: declarer medias en tant que tableau au moment de la creation de la cart");
                            if (cart.medias == undefined) { //premier media ajouté
                                cart.medias = new Array();
                                cart.medias.push(media);
                            }
                            else if (angular.isArray(cart.medias))
                                cart.medias.push(media);
                            else{
                                console.log (cart.medias);
                                console.warn ("TODO: je ne sais pas comment faire");
                                console.warn ("TODO: declarer medias en tant que tableau au moment de la creation de la cart");
                            }

                           def.resolve();
                        });
                });


        return(def.promise);
    }



this.addToStepMediaById = function (mediaId, step, medias) {
		console.log(mediaId);
		console.log(medias);
		console.log(step);
    var media = getMedia(medias, mediaId);

		if(step.medias == null || step.medias == undefined || step.medias =="undefined"){
			console.log("???")
			step.medias = new Array();
			console.log(step.medias);
		}

		if(angular.isArray(step.medias)){

			console.warn("corriger le filtre qui pose pb");
			//console.log(step.medias.filter(function(e) e.id == media.id));



			var find = false;
			step.medias.forEach(function(med){
				console.log(med.id);
				console.log(media.id);
				if(med.id == media.id){
					find = true;

				}
			});

			if(!find){
				return(step.medias.push(mediaId));
			}
		else{
			return(step.medias);
		}


		}

		else{
				console.log(step.medias);
				return(step.medias.push(mediaId));
		}

}

this.addToStepMedia = function (media, step, medias) {
        if(step.medias == null || step.medias == undefined || step.medias =="undefined"){
            console.log("???")
            step.medias = new Array();
            console.log(step.medias);
        }

        if(angular.isArray(step.medias)){
            console.warn("corriger le filtre qui pose pb");
            //console.log(step.medias.filter(function(e) e.id == media.id));


            var find = false;
            step.medias.forEach(function(med){
                console.log(med.id);
                console.log(media.id);
                if(med.id == media.id){
                    find = true;
                }
            });

            if(!find){
                return(step.medias.push(media.id));
            }
        else{
            return(step.medias);
        }


        }

        else{ 
            console.log(step.medias);
            return(step.medias.push(media.id));
        }

}





this.getSearchParams= function () {

        return {text :"",
            types:[
                {name: 'Image', value:'IMAGE'},
                {name: 'Video', value:'VIDEO'},
                {name: 'Text',  value:'TEXT'},
                {name: 'Sound', value:'SOUND'},
                {name: '3D',    value:'3D'}
            ],
            sources:[
                {name: 'Europeana',          value:'Europeana',       selected: true, disabled:false},
                {name: 'Wikipedia',   value:'Wikipedia',    selected: false, disabled:true},
                {name: 'Youtube', value:'Youtube',   selected: true, disabled:false},
                {name: 'Flicker',    value:'Flicker',     selected: false, disabled:true},
                {name: 'Twitter',      value:'Twitter',       selected: false,  disabled:true},
                {name: 'Instagram',     value:'Instagram',      selected: false,disabled:true}
            ],
            place:"", date: "", creator:"" };
    }



  });
