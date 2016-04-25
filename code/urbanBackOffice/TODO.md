# Bug resolution : 

* La source du problème sur la master pour la sauvegarde des modifications des triplets est dasn le fichier : proxyProject.js dans la fonction this.saveObj = function(obj,graph){ (ligne 1457).

Pour la résolution de ce bug, il faudrait qu'il y ait une implémentation clean du modèle de donnée, notamment pour les objets qui sont des références.
Lire les notes dans le document TODO.md de rdfui pour avoir une idées des pistes envisageables.

## Etat de la prod : 

* En raison des demandes récentes, la version de la production mise en ligne est actuellement un revert vers la version du commit b44fdc3a du 9 juin. 
* Sur la branche revert-20150609
* Julien Brouillard indique que la dernière version fonctionnelle de l'application est au 9 juin. 



