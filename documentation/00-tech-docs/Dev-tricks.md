
# for testing the interface but with the connexion to the production server database

grunt serve
in  
/home/flowww/dev/urbanexplore/code/urbanBackOffice/app/scripts/config.js
change
.constant('urlStanbol', {url:'http://127.0.0.1',port:'8080',address:'http://127.0.0.1:8080',pwd:'Basic YWRtaW46YWRtaW4='})

.constant('rdfuiConfig', {server:'http://127.0.0.1:8080/'})

to 
.constant('urlStanbol', {url:'http://ajax.urbanexplore.fr',port:'22',address:'http://ajax.urbanexplore.fr',pwd:'Basic YWRtaW46YWRtaW4='})

.constant('rdfuiConfig', {server:'http://ajax.urbanexplore.fr/'})


