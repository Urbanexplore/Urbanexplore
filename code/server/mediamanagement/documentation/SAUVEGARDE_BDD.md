
* pour la sauvegarde de la base de donnée il est recommandé d'arrêter le serveur stanbol avant d'effectuer la sauvegarde.

# méthode 1 : via git (méthode recommandée)

Dans le cas où aucune sauvegarde n'as déjà été faite, il faut initialiser le repository local git :

```bash
cd /opt/$BDD_FOLDER
git init
git add *
git commit -am "${message explicite pour la sauvegarde}
```

Lorsque le repository local git est initialisé, il suffit ensuite de faire un commit pour réaliser de nouvelles sauvegardes :
``` bash
cd /opt/$BDD_FOLDER
git commit -am "${message explicite pour la sauvegarde}
```

# méthode 2 : via copie de dossier

```bash
cd /opt
cp -r $BDD_FOLDER $DOSSIER_SAUVEGARDE_DESTINATION
```
