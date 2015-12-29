#!/bin/sh


# Search is currently okay and return results as Json
echo "============="
curl 'http://www.europeana.eu/api/v2/search.json?query=vinci&wskey=api2demo'
echo "\n\n\n"

# querying the search as json-ld currently not working with header
echo "============="
curl -H "Accept: application/ld+json" 'http://www.europeana.eu/api/v2/search.json?query=vinci&wskey=api2demo'
echo "\n\n\n"

echo "============="
curl 'http://www.europeana.eu/api/v2/search.jsonld?query=vinci&wskey=api2demo'
echo "\n\n\n"

echo "============="
curl 'http://www.europeana.eu/api/v2/search.json-ld?query=vinci&wskey=api2demo'
echo "\n\n\n"

# test of quering a resource directly from data.europeanna.eu
echo "============="
curl "http://data.europeana.eu/item/92056/BD9D5C6C6B02248F187238E9D7CC09EAF17BEA59"
echo "return a 303 to an html page... ok no header requested."
echo "\n\n\n"

echo "============="
curl -H "Accept: application/json" "http://data.europeana.eu/item/92056/BD9D5C6C6B02248F187238E9D7CC09EAF17BEA59"
echo "\n\n\n"

echo "============="
curl -H "Accept: application/ld+json" "http://data.europeana.eu/item/92056/BD9D5C6C6B02248F187238E9D7CC09EAF17BEA59"
echo "\n\n\n"

echo "============="
curl -v "http://data.europeana.eu/aggregation/provider/92037/25F9104787668C4B5148BE8E5AB8DBEF5BE5FE03"
echo "***************"
echo "return a 303 to an html page... we want a jsonLd one"
echo "\n\n\n"

echo "============= Uri that return a 303 see other"
curl -v -H "Accept: application/rdf+xml" "http://data.europeana.eu/aggregation/provider/92037/25F9104787668C4B5148BE8E5AB8DBEF5BE5FE03"
curl -H "Accept: application/rdf+xml" "http://data.europeana.eu/data/aggregation/provider/92037/25F9104787668C4B5148BE8E5AB8DBEF5BE5FE03"
echo "\n\n\n"

echo "============="
curl -H "Accept: application/ld+json" "http://data.europeana.eu/data/aggregation/provider/92037/25F9104787668C4B5148BE8E5AB8DBEF5BE5FE03"
echo "\n\n\n"



echo "============="
curl -H "Accept: Accept: text/html, application/xhtml+xml" "http://data.europeana.eu/aggregation/provider/92037/25F9104787668C4B5148BE8E5AB8DBEF5BE5FE03"
echo "redirect to the html page (not interesting in this case) : http://www.europeana.eu/portal/record/92037/25F9104787668C4B5148BE8E5AB8DBEF5BE5FE03.html"
echo "\n\n\n"
