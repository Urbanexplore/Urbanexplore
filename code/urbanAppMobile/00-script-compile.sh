#!/bin/bash

echo "%%%%%%%% Attention a bien penser mettre le numéro de build à jour %%%%%%"

echo "faire ctrl x + s puis ctrl x + c pour fermer"

emacs ../cordova/config.xml


echo "etape 1 compilation html"
grunt build

echo "étape 2 : copie des fichiers pour la compilation iphone"

rm -rf ../cordova/www/*

cp -r dist/* ../cordova/www/.

##attention ces copies devraient être gérés via le grunt
cp -r app/images ../cordova/www/.
cp -r app/imagesSite/ ../cordova/www/.
mkdir ../cordova/www/bower_components/
cp -r bower_components/bootstrap ../cordova/www/bower_components/

echo "étape 3 : compilation ios"

cd ../cordova

cordova build ios --device --release


echo "%%%%% attention à bien mettre le numéro de build a jour avant de lancer ce script%%%%"
