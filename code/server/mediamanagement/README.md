# REST API URBAN

## download Tiles
* Ce service permet de télecharger des tiles afin d'afficher la carte d'un projet en mode hors ligne.
* exemple :
``` 
http://127.0.0.1:8080/skosifier/downloadTiles?lat=48.8763241&lon=2.315&zoomLimit="+zoomLimit+"&minZoom="+minZoom+"&maxZoom="+maxZoom+"&radius="+radius
```
* Param:
lat et lon de la position centrale
minZoom : zomm minimum
maxZoom : zomm maximum

* les fichiers( .png) sont crées sous server/launcher/target/images/
* pour chaque niveau de zoom, un repertoire sera crée. Exemple pour minZoom =10 et maxZoom =14, on aura 5 répertoires qui sont crées (server/launcher/target/images/10 , server/launcher/target/images/11 ...).

## Search ressources from key word

* Ce service permet de chercher selon certains critères des médias.
``` 
 @Path("/simpleQuery/{serviceName}")
 @GET
 @Consumes(WILDCARD)
 @Produces(MediaType.APPLICATION_JSON)
``` 
* exemple Youtube :
``` 
http://127.0.0.1:8080/skosifier/simpleQuery/youtube?generalTerms=louvre
```

* exemple Europeana :
``` 
http://127.0.0.1:8080/skosifier/simpleQuery/europeana?generalTerms=louvre&type=VIDEO&creator="+creator+"&date="+date+"&country="+place;

```
* Param: 
generalTerms : mot-clés
type : {IMAGE|VIDEO|SOUND|TEXT|3D}
creator: le nom de createur ex: PICASSO
date : date de l'oeuvre
country : place

## upload video
``` 
    @Path("upload/{serviceName}")
    @GET
    @Consumes(WILDCARD)
    @Produces(MediaType.APPLICATION_JSON)
``` 
* Ce service permet d'uploder des videos.

* exemple Youtube :
``` 
http://127.0.0.1:8080/skosifier/upload/youtube?id=xJxH-QuJeXo;
```
* les fichiers sont crées sous server/launcher/target/videos/BBC Treasures of the Louvre.webm
