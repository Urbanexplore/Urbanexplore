
# processus publication de projet 

Note : documentation au 20150916 avant automatisation plus complète

## création de la structure de dossier en local pour la récupération des données : 

cd /dev/urbanxplor/code/urbanAppMobile
mkdir -p exports/export-{{nom-projet}}/resources/projectdata


## export des tiles
* Aller sur le projet dans l'interface cliquer sur "publier"
* sur le server, le dossier contenant les contenus exportés se trouve ici : 
 * /opt/urban-publish/{numéro_du_projet}

* ouvrir un filezilla et télécharger le dossier avec le numéro du projet dans : 
mkdir -p exports/export-{{nom-projet}}/resources/projectdata
@TODO : revoir si c'est le bon dossier où il faut le mettre.

## export du fichier des steps 

* faire un chargement du projet dans la vue du détail du projet en ayant le firebug d'vouert
* identifier la requête de récupération des données et faire "copier la contenu de la réponse"
* enregistrer le contenu du fichier dans : exports/export-{{nom-projet}}/resources/projectdata/project.json


* il y a une modification sur la branche d'intégration qui est cencée prendre en compte le fichier exporté directement. Il faut la tester et la mettre en place.

* actuellement il faut faire une transformations pour que ca soit une variable

* remettre les objets de steps dans le [] du steps

* réglèes de remplacement : 

0) supprimer les lignes @id dans les steps

1) "http://ooffee.eu/ns/urban##step#
"

2)
"http://ooffee.eu/ns/urban# 
==> par vide

3)
":
:

4)



## export des données vidéos et images : 



## autre a revoir


publier mon projet


1- back office :génération de la structure des données du projets

1-1 A partir des paramètres du projet (zoom min, zoom max, position centrale de la carte et raduis),calculer la liste des urls des images qui constituent la carte.
1-2 Télécharger les images constituant la carte 
1-3 gérer les autres données de ce projet (video , texte)



2- dans le dossier www de cordova
2-1 exporter le contenu de images  
2-2 copier le contenu de rep appClient/dist 

3- se placer ds le repetoire de cordova: cordova build ios


4- extraire l'exécutable (.xcodepro pour ios) 

## a revoir aussi : 

# publication des données pour l'application mobile

* l'application mobile à besoin de 2 types principaux d'images, données pour fonctionner :
 * les données, images "pur applis" (comme les markers, les logos principaux, etc)
 * les données, images,.. liés au projet (le fichier project.json, les images et vidéo embarquées, etc...)

* les données "pur applis" se trouvent dans le dossier : urbanxplor/code/urbanAppMobile/app/resources/application
* les données liées au projet se trouvent dans le dossier : /home/florent/dev/urbanxplor/code/urbanAppMobile/app/resources/projectdata

* !!! Attention : ces règles ne sont pas encore totalement prises en compte dans le projet. Il faut que celles-ci soit appliquées lors des prochaines modifications de code !!!



Première étape : génération des tiles
# REST API URBAN

## download Tiles

* Ce service permet de télecharger des tiles afin d'afficher la carte d'un projet en mode hors ligne.

* exemple :

http://127.0.0.1:8080/skosifier/downloadTiles?lat=48.8763241&lon=2.315&zoomLimit="+zoomLimit+"&minZoom="+minZoom+"&maxZoom="+maxZoom+"&radius="+radius

* Param:

lat et lon de la position centrale

minZoom : zomm minimum

maxZoom : zomm maximum

* les fichiers( .png) sont crées sous server/launcher/target/images/

* pour chaque niveau de zoom, un repertoire sera crée. Exemple pour minZoom =10 et maxZoom =14, on aura 5 répertoires qui sont crées (server/launcher/target/images/10 , server/launcher/target/images/11 ...).

