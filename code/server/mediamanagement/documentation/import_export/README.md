
# Commandes pour l'export et l'import d'un graph

Remarques : 
* replacer $OLDIP par l'url stanbol du serveur d'export, par exemple : http://localhost:8080

* remplacer $NEWIP par l'url stanbol du serveur d'import, par exemple : http://stanbol.ooffee.eu

# 1) Initilisation du dossier d'import / export

``` bash
cd ~/
mkdir import_export_stanbol
cp -r $DOSSIER_DE_CE_README/import_config/ ~/import_export_stanbol/
cd ~/import_export_stanbol/import_config
```


# Export d'un graph

``` bash
curl -H "Accept: application/rdf+xml" $OLDIP/skosifier/graphlist/get?id="http://your.graph.urn" > result.xml
``` 


# import du graph

* ce endpoint permet d'importer un graph sans modifications.

* attention modifier le paramètre $GRAPH_URI par le nom de votre graph

``` bash

curl -X POST -u admin:admin -F "graph=@result.xml" -F "graphName=$GRAPH_URI" http://localhost:8080/skosifier

```
