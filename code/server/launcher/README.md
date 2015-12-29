
# For starting the server : 
java -Xmx1g -XX:MaxPermSize=256m -jar eu.ooffee.urban.launcher-0.0.1-SNAPSHOT.jar

# Debugging informations : 

* Stanbol one are in {jar_place}/stanbol/error.log (default level is "info")
* Xplor one are in {jar_place}/stanbol/xplor-log.log (default level is "debug")

Loggers and configuration can be modified in : 
* http://localhost:8080/system/console/configMgr
 * section "Apache Sling Logging Logger Configuration"

