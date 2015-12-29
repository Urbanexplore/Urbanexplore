'use strict';

/**
 * @ngdoc service
 * @name urbanAppMobileApp.Project
 * @description
 * # Project
 * Service in the urbanAppMobileApp.
 */
angular.module('urbanAppMobileApp').service('ProjectService', 
    function ($filter, $http, $q,projectProxy) {

	var project = {};
 
  $http.get('resources/projectdata/project.json').success(function(response){
       //project = response;
       console.log(response);
       var res = projectProxy.toJsObject(response);
       console.log(res);
       project = res;
  });
  
/* commented on 20151005
 var project =
        {
		 id : 'a76ca',
         name: "MEMOIRE, ART ET TERRITOIRE",
         dateCreate :'22/05/2015',
         dateUpdate :'22/05/2015' ,
         author :'julien' ,
         status :'App',

        steps : [
            {   
            	id : 1, 
                position: 1, 
                title :"ETAPE 1 // PONT DE RECOUVRANCE", 
                isVisible :true,
                description:"Là où Recouvrance rime avec Marine...<br>Face au pont de Recouvrance, c’est là que tout commence puisque Recouvrance (la « populaire\") s’est érigée face àBrest (l’ \"officielle\").<br>Recouvrance se construit autour de  3 pôles  d’activités liés à la Marine :<br>- La caserne du 2ème dépôt (la Cayenne) qui accueille les nouveaux conscrits avant leur affectation <br>- Les Ateliers du plateau ou Capucins, ancien convent acheté par Louis XVI et attribué à la Marine en 1791 pour la construction navale, que l’on couvre des 3 grandes halles entre 1858 et 1864, avec le développement des bateaux en métal et des sous-marin.<br>- La prison de Pontaillou, prison militaire de la Marine\nEntre marins et ouvriers, ses activités vont favoriser l’établissement d’une population pauvre. En parallèle, de nombreux petits commerces voient le jour.",
                learnMore :"<p>Le prolongement du T3 à l\'est a nécessité la division de la ligne en deux tronçons pour permettre un focntionnement optimal. C'est sur le Cours de Vincennes que les voyageurs sont invités à changer de tram pour continuer leur trajet. Les artistes anglais Langlands & Bell ont mis en scène ce ballet de va-et-vient ds vaoyageurs, de part et d'autre de l\'axe royal, au rythme des trams arrivant et partant. Ils ont conçu des bouches de passages souterrains se répondant par des jeux de lumière en fonction des départs et des arrivés des trams.</p>",
                lat: 48.383934,
                lng: -4.498054,
                clickable:false,
                visuel:"images/1442401848017.jpeg",
                opacity:0,
                medias:[
                    {
                    	id :"1a",
                        title: 'Carte de Recouvrance en 1670',
                        type: 'image/jpeg', 
                        source :'interne', 
                        link :'images/ETAPE1/CARTE_DE_RECOUVRANCE1_1.jpeg',
                        description:'',
                        src:'images/ETAPE1/CARTE_DE_RECOUVRANCE1_1.jpeg'
                    },
                    
                    {   
                	   id :"1b",
                       title: "Vue aérienne de Brest et Recouvrance en 1925",
                       type: 'image/jpeg', 
                       source :'interne', 
                       link :'images/ETAPE1/BREST_RECOUVRANCE19251_2.jpeg',
                       description:'',
                       src:'images/ETAPE1/BREST_RECOUVRANCE19251_2.jpeg'
                   },
                    {   
                    	id :"1c",
                        title: "Pont Tournant",
                        type: 'image/jpeg', 
                        source :'interne', 
                        link :'images/ETAPE1/LEpontTournant1_3.jpeg',
                        description: "1856 marque une date importante pour Recouvrance avec la construction du Pont Impérial (rebaptisé par la suite Pont National). Pendant toute la fin du XIXème et début XXème,  il est emprunté quotidiennement par des centaines de marins qui quittent la Cayenne pour rejoindre l’Arsenal et à l’inverse des centaines d’ouvriers passent de Brest à Recouvrance pour aller aux Ateliers.",
                        src:'images/ETAPE1/LEpontTournant1_3.jpeg'
                   },
                   
                   
                   {   
                    	id :"1d",
                        title: "La Marine et le 2e dépôt",
                        type: 'video/x-m4v', 
                        source :'interne', 
                        link :'images/ETAPE1/Diapo_1_Etape_1_BREST_SD _480p.m4v',
                        description:'',
                        src:'images/ETAPE1/Diapo_1_Etape_1_BREST_SD _480p.m4v'
                   },
                   
                   {   
                    	id :"1e",
                        title: "La vie autour de la Marine",
                        type: 'video/x-m4v', 
                        source :'interne', 
                        link :'images/ETAPE1/Diapo_2_Etape_1_BRES_SD_480p.m4v',
                        description:'',
                        src:'images/ETAPE1/Diapo_2_Etape_1_BRES_SD_480p.m4v'
                   }
              ]
           },
           
           {
	            id : 2, 
	            position: 2, 
	            title :'New step', 
	            isVisible :false,
	            description: '',
	            learnMore :'',
	            lat: 48.38355,
	            lng: -4.497995,
	            clickable:false,
	            opacity:0 
            },
            {   
                id : 3, 
                position: 3, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.382755,
                lng: -4.4973993,
                clickable:false,
                opacity:0
                
            },
            {   
                id : 4, 
                position: 4, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.382534,
                lng: -4.4975924,
                clickable:false,
                opacity:0
            },
            {   
                id : 5, 
                position: 5, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.382233,
                lng: -4.498268,
                clickable:false,
                opacity:0
            },
            
            {   
            	id : 6, 
                position: 6, 
                title :"ETAPE 2 // MAISON DE LA FONTAINE", 
                isVisible :true,
                description:"Ici une trace du passé réchappée du chaos… <br> <br> Brest connaitra 165 raids aériens de 1940 à 1944 avec un siège de l’aviation anglaise et américaine du 7 aout au 18 septembre, avec relativement peu de morts compte tenu de l’ampleur des attaques mais une ville entièrement détruite qui laisse à Recouvrance des images de chaos où des montagne de briques, de pierre et gravas ont remplacé les habitations.\nLe film de Jean Lazennec datant 1962, laisse pourtant voir un quartier plein de joie, qui reprend vie entre des baraques provisoires et un cadre urbain totalement renouvelé.<br>C’est cette énergie populaire qui n’a pas pu être de détruite que nous retrouvons bientôt au XXIème siècle.",
                learnMore :"",
                lat: 48.382084,
                lng: -4.499341,
                clickable:false,
                visuel:"images/ETAPE2/header2.jpg",
                opacity:0,
                medias:[
                
                {
                    	id :"2a",
                        title: 'Recouvrance détruit et reconstruit',
                        type: 'video/x-m4v', 
                        source :'interne', 
                        link :'images/ETAPE2/Diapo_1_Etape_2_BREST_SD_480p.m4v',
                        description:'',
                        src:'images/ETAPE2/Diapo_1_Etape_2_BREST_SD_480p.m4v'
                    },
                
                   {
                    	id :"2b",
                        title: " Recouvrante / Jean Lazennec / 1962",
                        type: 'video/x-m4v', 
                        source :'interne', 
                        link :'images/ETAPE2/film2_1.m4v',
                        description:'',
                        src:'images/ETAPE2/film2_1.m4v'
                    },
                
                
                   
                        ]
                      
            },
            {   
                id : 7, 
                position: 7, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.38209,
                lng: -4.4999905,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 8, 
                position: 8, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.38214,
                lng: -4.5010524,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 9, 
                position: 9, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.382236,
                lng: -4.5020556,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 10, 
                position: 10, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.384003,
                lng: -4.5024743,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 11, 
                position: 11, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.384678,
                lng: -4.502635,
                clickable:false,
                opacity:0
            },
            
            {   
            	id : 12, 
                position: 12, 
                title :"ETAPE 3 // PARKING SUPER U", 
                isVisible :true,
                description:"En octobre 2012, les élèves des Beaux Arts investissent le parking du Super U pour une journée au contact de la population de Recouvrance. <br><br> Le groupe d’élèves qui a choisi Recouvrance,  fait ce choix parce qu’ils habitent ce quartier et qu’ils l’apprécient. Ils choisissent en particulier le parking du Super U comme un des points de passage les plus fréquentés de Recouvrance. Le travail à partir des images d’archives leur permet d’abord de déterminer certaines caractéristiques propre au quartier qui leur donnent les clefs de leur projet artistique : <br>Typologie d’architecture et tonalité pastel <br> Convivialité <br> Difficulté sociale <br> Le travail se concrétise par la mise en place d’une installation qui forme une sorte de « zone de discussion » avec assise et espace de lecture ou de repos, aux couleurs de Recouvrance : vert pastel. Leur travail se base aussi la mise en place d’outils de médiation affiches, flyer et T-shirt dont le slogan « Recouvrance est vieux mais sexy », suscite la curiosité et invite au dialogue. <br> Si l’œuvre d’art dans la ville existe depuis toujours pour glorifier la cité ou magnifier les puissances dirigeantes, l’œuvre aux services des habitants est apparue plus récemment à la fin des années 80 avec des collectifs comme Critical Art Ensemble (US) ou Stalkers(IT) suivi bientôt par des artistes plus grand public qui travaillent la performance comme la danseuse Maguy Marin par exemple  ou encore sur la photo comme l’artiste JR.",
                learnMore :"",
                lat: 48.38474,
                lng: -4.5036864,
                clickable:false,
                visuel:"images/ETAPE3/header3.jpg",
                opacity:0,
                medias:[
                    {
                    	id :"3a",
                        title: 'Le travail du photographe JR',
                        type: 'image/jpeg', 
                        source :'interne', 
                        link :'images/ETAPE3/Media_1_etape_3.png',
                        description:'Le photographe JR, s’attache depuis plusieurs années à mettre en valeur les individus oubliés des grandes villes du monde, ceux des quartiers défavorisés collant leur visage en format immenses sur les façades de ces ville',
                        src:'images/ETAPE3/Media_1_etape_3.png'
                    },
                    
                       {
                    	id :"3b",
                        title: 'La démarche de Maguy Marin',
                        type: 'image/jpeg', 
                        source :'interne', 
                        link :'images/ETAPE3/Media_2_etape_3.jpg',
                        description:'La danseuse Maguy Marin, entraine les habitants des quartiers (Lyon, Montpellier) quelle que soit leur origine, leur âge à s’exprimer corporellement',
                        src:'images/ETAPE3/Media_2_etape_3.jpg'
                    },
                    
                     {
                    	id :"3c",
                        title: 'Travail des étudiants des Beaux Arts / Oct 2012',
                        type: 'image/jpeg', 
                        source :'interne', 
                        link :'images/ETAPE3/MonatageWSBrest.jpg',
                        description:'',
                        src:'images/ETAPE3/MonatageWSBrest.jpg'
                    },
                    
                    
                        ]
            },
            
            {   
                id : 13, 
                position: 13, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.38493,
                lng: -4.502721,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 14, 
                position: 14, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.385506,
                lng: -4.502914,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 15, 
                position: 15, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.3857,
                lng: -4.5009933,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 16, 
                position: 16, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.387688,
                lng: -4.500242,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 17, 
                position: 17, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.3886,
                lng: -4.500951,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 18, 
                position: 18, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.388794,
                lng: -4.501664,
                clickable:false,
                opacity:0
            },
            
            {   
            	id : 19, 
                position: 19, 
                title :"ETAPE 4 // VIVRE LA RUE", 
                isVisible :true,
                description:"Vivrelarue.net est une association loi 1901, basée RUE SAINT-MALO à Recouvrance, dont l'ambition est d'être un lieu d'épanouissement pour les projets et les individus en favorisant les rencontres artistiques et les propositions pluridisciplinaires comme des vecteurs permettant de renforcer le lien social, la valorisation d'un quartier sensible et la participation citoyenne. Cette association d’habitant est également associée à la MaloÏne association dont le but est de débicher, recueillir la mémoire brestoise. <br> Cette association n’a pas été intégrée à la réflexion lors de la mise en place du work-shop en 2012, cependant ce type d’association d’habitants dont le but est d’affirmer le rôle des citoyens, a tout à fait ça place dans la réflexion que nous poursuivons au cours de cette promenade. <br> A l’instar d’autres quartiers dans le monde comme Christiana à Copenhague entièrement autogéré par sa communauté d’habitant l’Estaque à Marseille  qui prend son avenir économique en main en proposant une coopérative touristique appeléHotel du Nord (hoteldunord.coop) qui offre logement chez l’habitant ou promenade conçu par des habitants, Recouvrance se révèle encore et toujours pleine de son énergie populaire.",
                learnMore :"",
                lat: 48.38943,
                lng: -4.5017767,
                clickable:false,
                visuel:"images/ETAPE4/header4.jpg",
                opacity:0,
                medias:[
                        ]
            },
            
            {   
                id : 20, 
                position: 20, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.38931,
                lng: -4.501321,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 21, 
                position: 21, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.389126,
                lng: -4.501058,
                clickable:false,
                opacity:0
            },
            
            {   
                id : 22, 
                position: 22, 
                title :'New step', 
                isVisible :false,
                description: '',
                learnMore :'',
                lat: 48.38884,
                lng: -4.4998507,
                clickable:false,
                opacity:0
            },
            
            {   
            	id : 23, 
                position: 23, 
                title :"ETAPE 5 // LES CAPUCINS", 
                isVisible :true,
                description:"Recouvrance assiste aujourd’hui a un tournant de son histoire (comme elle en a connu d’autres avant) avec la reconversion des  anciens Ateliers des Capucins. L’ouverture prochaine d’un espace culturel d’un nouveau genre (médiathèque, espace de création, centre d’interprétation,…) associé  à un nouveau quartier d’habitations mais aussi un nouvel axe de traversée au dessus de la Penfeld, permettant de relier une autre partie de Recouvrance au centre ville, voire de délocaliser ou d’étendre une partie du centre ville sur Recouvrance. <br> L’enjeu pour les habitants de Recouvrance est donc d’être acteurs de ce grand projet urbain et non spectateurs, ET pour les autorités locales de faire valoir une culture populaire vivace et créative, qui n’est pas simplement ancrée dans son passé industriel et maritime mais qui est belle et bien perpétuée en 2015. <br> On doit trouver du pittoresque sur un parking de Super U…",
                learnMore :"",
                lat: 48.38915,
                lng: -4.4995127,
                clickable:false,
                visuel:"images/ETAPE5/Header5.jpg",
                opacity:0,
                medias:[
						{   
							id :"5a",
						    title: "Les Capucins, le projet Lauréat",
						    type: 'image/jpeg', 
						    source :'interne', 
						    link :'images/ETAPE5/Media1Etape5.jpg',
						    description:'Début 2011 , c’est l’architecte Bruno Fortier qui  remporte le concours des Capucins. Dans le cadre du projet de reconversion les travées les plus proches de Recouvrance seront dédiées "aux commerces, restaurants, centre d’interprétation et autres projets ». C’est le promoteur Kermarrec qui est en charge de la réalisation des logements et de la vente des espaces de commerce.',
						    src:'images/ETAPE5/Media1Etape5.jpg'
						},
						{   
							id :"5b",
						    title: "Le téléphérique",
						    type: 'image/jpeg', 
						    source :'interne', 
						    link :'images/ETAPE5/Media2Etape5.jpg',
						    description:'La ville de Brest a opté pour un mode transport  peu commun dans une zone non montagneuse mais il permet un liaison écologique et parfaitement intégrée dans le paysage.',
						    src:'images/ETAPE5/Media2Etape5.jpg'
						},
						
						{   
							id :"5c",
						    title: "Conclusion !",
						    type: 'image/jpeg', 
						    source :'interne', 
						    link :'images/ETAPE5/Media3Etape5_Conclusion.jpg',
						    description:'On vient donc de cheminer de l’histoire aux projets futurs d’un territoire : Recouvrance, prenant conscience de son identité marquée par une culture populaire et industrielle. En s’arrêtant sur une expérience sociale et artistique, inédite dans ce quartier et menée par les étudiants des Beaux Arts et en s’intéressant au tisse associatif local, on comprend mieux la grande ressource que constitue la population de ce territoire. En multipliant ce type d’expériences sociales, artistiques, économique alternatives et créatives Recouvrance doit s’affirmer aux côtés des Capucins. <br> <br> Remerciements : <br> Michèle Hubert Véron (service du patrimoine de la ville de Brest) <br> Amélie Grojean (service de la communication de la ville de Brest) <br> Hugues Courant et Chantal Rio (services des archives de la ville de Brest) <br> Antoinette Roudaut (cinémathèque de Bretagne)',
						    src:'images/ETAPE5/Media3Etape5_Conclusion.jpg'
						}
                        ]
            },
                
            ],
            minZoom: 10, 
            maxZoom: 17,
            lat : 48.384,
            lng: -4.4983, 
            zoom : 15,
            ishomePage : [
                {name: 'Yes',  value:'option1',   ischecked: 'false'},
                {name: 'No',   value:'option2',   ischecked: 'true'}
            ],
            isfooter : [
                {name: 'Yes',  value:'option1',   ischecked: 'false'},
                {name: 'No',   value:'option2',   ischecked: 'true'}
            ],
            footer :
                {about: 'about',  help:'help',
                footerimages: "images/Bandeau_logo.png",
                hyperlinks: [{id :"hyperlink1", value:"Hyperlink#1"}, {id :"hyperlink2", value:"Hyperlink#2"}]
                },
            homepage :
                {title: '',
                homepageimages: "images/ImagePresPU.jpeg",
                description:
                    "Cette promenade urbaine a été conçue à la demande du service du patrimoine, à partir d’un work-shop mené par Dédale en 2012 avec des élèves de l’Ecole Nationale Supérieure des Beaux Arts de Brest, à Recouvrance. <br> Constatant l’apparition récente des artistes sur l’échiquier de l’urbanisme notamment comme médiateurs auprès des population locales, le work-shop intitulé « la ville ré-enchantée », proposait aux élèves des Beaux Arts de s’essayer à cet exercice complexe de médiation.  Grâce à leur capacité de détournement et d’innovation, ils devaient créer une œuvre leur permettant de rentrer en contact avec la population locale. <br> Pour stimuler  leur imaginaire, nous les avons fait travailler à partir d’images d’archives. <br> Partant de ces mêmes modalités de travail, cette promenade propose en préambule une approche historique pour mieux comprendre le  discours et le projet proposé par les étudiants en 2012, puis elle présente le travail des étudiants et d’autres projet artistiques similaires et finalement elle se termine sur la mise en perspective de cette nouvelle approche de l’urbanisme participatif en le confrontant localement au nouveau grand projet de la ville de Brest (et de plus local), les Ateliers des Capucins. <br> En nous interrogeant sur le futur urbain proche de ce territoire, nous verrons comment cette culture révélée, cette identité, doit s’affirmer et  permettreaux  habitants de s’approprier leur futur.",
                learnMore:"",
                }
               
        };
*/
    this.get = function (){
      
       return project;
    	
    }
/*

    this.getProject = function(){
        var initialisation = $q.defer();

        var project = new Array();
        

        $http({
            method : 'GET',
            url : '/medias/project.json',
        }).success(function(data){
            project = data;
           
        }).error(function(){
           
        }).then(function(){

         initialisation.resolve(project);
           
        });
          
        
        return(initialisation.promise);
  }

*/

    this.getNbSteps= function (){
        var nb = "0";
        var j= project.steps.length;
        for(var i=0;i<j;i++){
          if (project.steps[i].message != "false"){
            nb++;
          }
        }
        return nb;
    }

    this.getStep = function(step_id, project){

        if(step_id == null) return project.steps[0];
        else{
            for (var i in project.steps) {
                if (project.steps[i].id == step_id) {

                    return project.steps[i];
                }
            }
        }
    }


 this.getProjectJS = function(){
    var dataAll = new Array();
    var initialisation = $q.defer();
    var uriBase = "http://ooffee.eu/ns/urban#";
    var project = new Array();
    var fileName = "/publish/project.json"
    var projectJS = new Array();
    
    var steps = new Array();

   $http({
      method : 'GET',
      url : '/publish/project.json',
  }).success(function(data){
       dataAll = data["@graph"];
        if (data["@graph"]  != null){
          data["@graph"].forEach(function(d,i){
            if(d[uriBase+"type"] == "Project"){
              project= d;
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

        var projectJS = objectsProxy.createProject(project);
        //console.log (projectJS);
        //console.log (project);
        var stepsTmp = new Array();
        if(project[uriBase+"steps"]!=null){
          if(angular.isArray(project[uriBase+"steps"])){
            project[uriBase+"steps"].forEach(function(s,i){
              
              var step = objectsProxy.getStep(s, dataAll);
             
              var medias = objectsProxy.getMedias(steps, step["@id"]);
              //console.log(medias);
              if (medias != undefined && medias != null){

                if(angular.isArray(medias)){
                  medias.forEach(function(m){
                    var media = new Array();
                    media = objectsProxy.getMediaObj(m, dataAll);
                    //console.log (media);
                    step.medias.push(media);
                    step._medias.push(media);
                  });

                }else {
                  console.log("step 2");
                    var media = new Array();
                    media = objectsProxy.getMediaObj(medias, dataAll);
                    console.log (media);
                    step.medias.push(media);
                    step._medias.push(media);
                }
              }
              //console.log (projectJS);
              //console.log (step);
              projectJS.steps.push(step);
            });
            
          }
          else{
            var step = objectsProxy.getStep(project[uriBase+"steps"], dataAll);
            projectJS.steps.push(step);
          }
        }
      initialisation.resolve(projectJS);  
    });//fin then
      
   
    return(initialisation.promise);
  }


    

    this.getStep = function(step_id, project){

        if(step_id == null) return project.steps[0];
        else{
            for (var i in project.steps) {
                if (project.steps[i].id == step_id) {

                    return project.steps[i];
                }
            }
        }
    }



  });
