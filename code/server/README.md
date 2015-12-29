# Installation

###  compile europeana api client
Before compiling the server you need to compile the europeana api client :
```
cd ~/dev
git clone git@github.com:florent-andre/europeana-client.git
cd europeana-client/europeana-client/src/main/resources
cp europeana-client.properties.template europeana-client.properties
cp log4j.xml.template log4j.xml
```

Follow the compilation procedure of this lib.
Put in the europeana-client.properties this content : 
```
# the uri of the search API using JSON response => http://www.europeana.eu/api/v2/search.json                                                                                                                                          
# for testing within the development environment a local URI can be used e.g. localhost:8989/api/v2/search.json                                                                                                                        
europeana.api.uri = http://www.europeana.eu/api/v2/                                                                                                                                                                                    

# the uri of the search API using JSON response => http://www.europeana.eu/api/v2/search.json                                                                                                                                          
# for testing within the development environment a local URI can be used e.g. localhost:8989/api/v2/search.json                                                                                                                        
europeana.search.urn = search.json

europeana.record.urn = record

# the user key used to access Europeana API. For more information see http://pro.europeana.eu/api                                                                                                                                      
europeana.api.key = api2demo

# the folder used for downloading images locally                                                                                                                                                                                       
europeana.client.base.image.folder = ./src/test/resources/image

# the folder used to store the thumbnail urls of all collections locally                                                                                                                                                               
europeana.client.base.cvs.folder = ./src/test/resources/cvs

europeana.client.base.folder = ./src/test/resources/europeanaclient
europeana.client.datasets.folder = ./src/test/resources/europeanaclient/datasets
```

then do
```
mvn clean install

```
### start standbol
```
cd dev/urbanxplor/code/server
./start_stanbol.sh start

```
###  add europeana api client to bundles

	Open this page (http://localhost:8080/system/console/bundles)
	click Install/update
	check start bundle
	Browse: select this file
 	europeana-client/europeana-client/target/europeana-client-0.2.0-SNAPSHOT.jar

###  Compile bundle urbanxplore REST front end

```
cd dev/urbanxplor/code/server/europeana
mvnbundleInstall 

```

