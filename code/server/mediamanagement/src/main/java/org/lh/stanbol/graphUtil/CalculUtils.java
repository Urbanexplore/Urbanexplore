package org.lh.stanbol.graphUtil;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CalculUtils {
	private final  Logger logger = LoggerFactory.getLogger(getClass()); 
	public  String tile2url (int zoom, int x, int y) {
	    /*  Given a mapID, zoom, tile_x, and tile_y,
	     *  return the url of that tile
	     */
		
	    return "http://c.tile.openstreetmap.org"
	    + "/" + zoom + "/"
	        + x + "/" + y + ".png";
	    /*return 'http://api.tiles.mapbox.com/v3/' 
	        + mapID + '/' + zoom + '/'
	        + x + '/' + y + '.png';*/
	}
	
	public  int long2tile (double lon, int zoom) { 
	    return (int) (Math.floor((lon+180)/360*Math.pow(2,zoom))); 
	}
	
	public  int lat2tile (double lat, int zoom)  { 
	    return (int) (Math.floor(
	        (1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)
	    ));
	}
	

    public  List<String > pyramid (double lat, double lon, int zoomLimit,int minZoom, int maxZoom, int radius ) {
   
    /*    
    Given a list of mapIDs, a central lat/lng, and zoomLimit/radius options 
    generate the urls for the pyramid of tiles for zoom levels 3-17
    
    radius is how many tiles from the center at zoomLimit
    (by default 
        zooms 3-14 have radius of 1.  
        15 has radius 2
        16 has radius 4.  
        17 has radius 8
     )
     
      //handle options
   int zoomLimit =  || 14;
   int minZoom = options["minZoom"] || 10;
   int maxZoom = options["maxZoom"] || 17;
   int radius = options["radius"] || 1; 
    */
    
   
    
    //declare vars outside of loop
   List<String > urls = new ArrayList<String>();
   int zoom, t_x, t_y, r, x, y;
  
   
  for (zoom=minZoom; zoom<=maxZoom; zoom++) { //iterate over zoom levels
            t_x = long2tile(lon, zoom);
            t_y = lat2tile(lat, zoom);
            r = (int) (radius * Math.pow(2, (Math.max(zoom, zoomLimit) - zoomLimit)));
            for (x = t_x-r; x <= t_x+r; x++) { //iterate over x's
                for (y = t_y-r; y <= t_y+r; y++) { //iterate over y's
                	
                    urls.add(tile2url(zoom, x, y));
                }
            }
        }
  
    
    return urls;
    
}


}
