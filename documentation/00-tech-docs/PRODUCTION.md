
* la production se trouve sur le serveur proxmox2mindmatcher


# compilation du serveur 

* lors de la première installation : 

* il faut compiler avant la version de vget que l'on à en local : 
urbanxplor/code/libExternes/vget
 * ainsi que d'autre lib qui sont dans libExterne

* ensuite : 
si le serveur est alumé : 
```
start_stanbol_prod.sh stop
```
puis : 
```
cd /home/florent/urban/urbanxplor/code/server
mvn clean install
start_stanbol_prod.sh start
```

# pour lancer le serveur java sur la prod : 

```
cd /urban/urbanxplor/code/server
./start_stanbol_prod.sh start
```

## in order to see the logs 

```
tail -f /home/florent/urban/urbanxplor/code/server/launcher/target/stanbol/logs/error.log
```

# pour publier les modifications de la partie backoffice sur le serveur 

Sur la machine locale : 
```
grunt publish
```

Le code compilé est alors déposé dans le dossier /home/florent/urban/prod-backoffice/



# Mise à jour (qualif)

Si c'est la première fois : grunt build en local sur la branche integration.
Puis : grunt publish.

Si mise à jour de la base de données stanbol : 1) remettre à la main le bundle vget. To do voir pourquoi ce bundle plante en natif.
2) Attention à la base de données qui pourrait être écrasée si on lance la commande mvn install.

