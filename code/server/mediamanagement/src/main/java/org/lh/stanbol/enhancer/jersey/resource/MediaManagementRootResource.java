/*
* Licensed to the Apache Software Foundation (ASF) under one or more
* contributor license agreements.  See the NOTICE file distributed with
* this work for additional information regarding copyright ownership.
* The ASF licenses this file to You under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with
* the License.  You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.lh.stanbol.enhancer.jersey.resource;

import static javax.ws.rs.core.MediaType.TEXT_HTML;
import static javax.ws.rs.core.MediaType.WILDCARD;
//import static org.apache.stanbol.commons.web.base.CorsHelper;
import static org.apache.stanbol.commons.web.base.CorsHelper.addCORSOrigin;
import static org.apache.stanbol.commons.web.base.CorsHelper.enableCORS;
import info.bliki.api.Page;
import info.bliki.api.User;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.Encoded;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.clerezza.rdf.core.access.TcManager;
import org.apache.clerezza.rdf.core.serializedform.Parser;
import org.apache.clerezza.rdf.core.serializedform.Serializer;
import org.apache.stanbol.commons.web.base.resource.BaseStanbolResource;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.lh.stanbol.graphUtil.CalculUtils;
import org.lh.stanbol.graphUtil.MyHtmlConverter;
import org.lh.stanbol.graphUtil.MyWikiModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.axet.vget.VGet;
import com.google.api.services.samples.youtube.cmdline.data.Search;
import com.google.api.services.youtube.model.SearchResult;
import com.sun.jersey.multipart.FormDataParam;

import eu.europeana.api.client.Api2Query;
import eu.europeana.api.client.connection.EuropeanaApi2Client;
import eu.europeana.api.client.exception.EuropeanaApiProblem;
import eu.europeana.api.client.result.EuropeanaApi2Item;
import eu.europeana.api.client.result.EuropeanaApi2Results;

import java.io.File;
import org.apache.commons.io.FileUtils;




/**
 * RESTful interface to browse the list of available engines and allow to call them in a stateless,
 * synchronous way.
 * <p>
 * If you need the content of the extractions to be stored on the server, use the StoreRootResource API
 * instead.
 * @param <e>
 */




@Path("/mediamanagement")
@Encoded
public class MediaManagementRootResource extends BaseStanbolResource {

	private static final String[] JSON = null;
	@Context
	protected ServletContext servletContext;
    private final Logger log = LoggerFactory.getLogger(getClass());

    //protected Skosifier skosifier;
//    protected SkosifierFactory skosifierFactory;
    protected TcManager tcManager;

    protected Serializer serializer;

    protected Parser parser;
	private JSONArray put;

//    protected Broadcaster broadcast;

    @OPTIONS
    @Path("/diagnostic")
    public Response createFromScratchDiagnostic(@Context HttpHeaders headers){
        ResponseBuilder res = Response.ok();
        enableCORS(servletContext,res, headers);
        return res.build();
    }

    @Path("/diagnostic")
    @GET
    @Consumes(WILDCARD)
    public Response createFromScratchDiagnostic(
    		@QueryParam(value="author") String author,
    		@QueryParam(value="nameDiag") String name,
    		@QueryParam(value="type") String type,
    		@QueryParam(value="dateCreat") String dateCreat,
    		@Context HttpHeaders headers){

		ResponseBuilder rb = Response.ok("");
		addCORSOrigin(servletContext,rb, headers);
		return rb.build();
    }

    @OPTIONS
    @Path("/downloadTiles")
    public Response createTiles(@Context HttpHeaders headers){
        ResponseBuilder res = Response.ok();
        enableCORS(servletContext,res, headers);
        return res.build();
    }


    
    @OPTIONS
    @Path("/simpleQuery/{serviceName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response simpleQuery(@Context HttpHeaders headers){
        ResponseBuilder res = Response.ok();
        enableCORS(servletContext,res, headers);
        return res.build();
    }

    @Path("/simpleQuery/{serviceName}")
    @GET
    @Consumes(WILDCARD)
    @Produces(MediaType.APPLICATION_JSON)
    public Response simpleQuery(
    		@PathParam("serviceName") String serviceName,
    		@QueryParam(value="creator") String creator,
    		@QueryParam(value="title") String title,
    		@QueryParam(value="date") String date,
    		//@QueryParam(value="types") List<String> types,
    		@QueryParam(value="type") String type,
    		@QueryParam(value="generalTerms") String generalTerms,
    		@QueryParam(value="country") String country,
    		@QueryParam(value="langue") String langue,

    		@Context HttpHeaders headers) throws IOException, EuropeanaApiProblem, JSONException{
    	//TODO : @QueryParam(value="title") @DefaultValue("toto") String title,
    	//log.error("types " +types);
    	JSONObject jo = new JSONObject();
    	JSONArray results = new JSONArray();
    	//serviceName = "europeana";
    	if(serviceName.equals("europeana")){
    		log.error("********europeana********");
    		long ms0 = System.currentTimeMillis();
        	Api2Query europeanaQuery = new Api2Query();
            europeanaQuery.setCreator(creator);
            europeanaQuery.setTitle(title);
            europeanaQuery.setDate(date);
            europeanaQuery.setType(type);
            europeanaQuery.setCountry(country);
            europeanaQuery.setGeneralTerms(generalTerms);

          //perform search
            EuropeanaApi2Client europeanaClient = new EuropeanaApi2Client();
            EuropeanaApi2Results res = europeanaClient.searchApi2(europeanaQuery, -1, 1);
            /*
            //print out response time
            long t = System.currentTimeMillis() - ms0;
            log.error("response time (client+server): " + (t / 1000d) + " seconds");

            //print out search results
            log.error("Query: " + europeanaQuery.getSearchTerms());
            log.error("Query url: " + europeanaQuery.getQueryUrl(europeanaClient));
            log.error("Results: " + res.getItemCount() + " / " + res.getTotalResults());
    	    */


        	for (EuropeanaApi2Item item : res.getAllItems()) {
        		 results.put(new JSONObject( item.toJSON()));
        	 }


    	}

    	else if(serviceName.equals("youtube")){

    		List<SearchResult> searchResultList = new ArrayList<SearchResult>();
    		searchResultList = Search.simpleQuery(generalTerms);

    		for (SearchResult item : searchResultList) {
       		 results.put(new JSONObject(item));
       	 }
    		 log.error("searchResultList: " + searchResultList.size());
    		 if (searchResultList != null) {
    			 Search.prettyPrint(searchResultList.iterator(), generalTerms);
             }

    	}else if (serviceName.equals("wikipedia")){
    		 log.error("********wikipedia********" + java.net.URLDecoder.decode(generalTerms, "UTF-8"));
    		 
    		String[] listOfTitleStrings = { java.net.URLDecoder.decode(generalTerms, "UTF-8") };
    		User user = new User("", "", "http://"+langue+".wikipedia.org/w/api.php");
    		user.login();
    		List<Page> listOfPages = user.queryContent(listOfTitleStrings);
    		for (Page page : listOfPages) {
    			String pageId = page.getPageid();
    			if (page.getPageid() != null){
    				results.put(page.getPageid());
    				results.put(page.getTitle());
    				MyWikiModel wikiModel = new MyWikiModel("${image}", "${title}");
    				String currentContent = page.getCurrentContent();
    				String html = wikiModel.render(
    						new MyHtmlConverter(true, true), currentContent);
    		  
    				//log.error("********html********");
    				results.put(html);
    			}	
    		}	  
    		
    	}

        //response

	    jo.put("Uri", results);
		ResponseBuilder rb = Response.ok(jo.toString());

    	addCORSOrigin(servletContext,rb, headers);
    	return rb.build();
    }

    
    @Path("/downloadTiles")
    @GET
    @Consumes(WILDCARD)
    public Response createTiles(
    		@QueryParam(value="idProject") String idProject,
    		@QueryParam(value="lat") double lat,
    		@QueryParam(value="lon") double lon,
    		@QueryParam(value="zoomLimit") int zoomLimit,
    		@QueryParam(value="minZoom") int minZoom,
    		@QueryParam(value="maxZoom") int maxZoom,
    		@QueryParam(value="radius") int radius,
    		@Context HttpHeaders headers){

    	


    	String path = "/opt/urban-publish/"+idProject+"/site/";

    	//String path = "../../../urbanBackOffice/app/publish/"+idProject+"/site/";
    	new File(path).mkdirs();
    	List<String> urlsList = new ArrayList<String>();
    	//urlsList = CalculUtils.pyramid(lat, lon, zoomLimit, minZoom, maxZoom, radius);
    	CalculUtils cal =new CalculUtils();
    	urlsList = cal.pyramid(lat, lon, zoomLimit, minZoom, maxZoom, radius);
    	//log.error("sssssssssssssssssssssss"+ urlsList.size());
    	for (String urlString : urlsList) {
			String[] tails = urlString.split("/"); //slice(31); //something like ex.map-1234saf/15/8580/12610.png

			String pathDir = path+"/"+tails[3];
			//log.error("ppppppppppppppppppppp"+ pathDir);
			new File(pathDir).mkdirs();


			File destinationFile = new File(tails[4]+ '_'+tails[5]);
			String filePath = destinationFile.getAbsoluteFile().getParentFile().getAbsolutePath();
			//log.error("fffffffffffffffffff"+ filePath);
			URL url = null;
			try {
				url = new URL(urlString);
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			InputStream in = null;
			try {
				in = new BufferedInputStream(url.openStream());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int n = 0;
			try {
				while (-1!=(n=in.read(buf)))
				{
				   out.write(buf, 0, n);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				out.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				in.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			byte[] response = out.toByteArray();

			FileOutputStream fos = null;
			try {
				fos = new FileOutputStream(pathDir+"/"+destinationFile);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				fos.write(response);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}

		ResponseBuilder rb = Response.ok("");
		addCORSOrigin(servletContext,rb, headers);
		return rb.build();
    }


    @OPTIONS
    @Path("/upload/{serviceName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response upload(@Context HttpHeaders headers){
        ResponseBuilder res = Response.ok();
        enableCORS(servletContext,res, headers);
        return res.build();
    }

    @Path("/upload/{serviceName}")
    @GET
    @Consumes(WILDCARD)
    @Produces(MediaType.APPLICATION_JSON)
    public Response upload(
    		@PathParam("serviceName") String serviceName,
    		@QueryParam(value="id") String id,
    		@QueryParam(value="idProject") String idProject,
    		@Context HttpHeaders headers) throws IOException, EuropeanaApiProblem, JSONException{
    	//TODO : @QueryParam(value="title") @DefaultValue("toto") String title,
    	//log.error("types " +types);
    	JSONObject jo = new JSONObject();
    	JSONArray results = new JSONArray();

    	
    	String path = "/opt/urban-publish/"+idProject+"/images";
       //String path = "/opt/urban-images/"
    	new File(path).mkdirs();
   	if(serviceName.equals("europeana")){

    	}
    	else if (serviceName.equals("vimeo")){
    		//AppManagedDownload.main(new String[] { "http://vimeo.com/127436081", path });
    	}

    	else if(serviceName.equals("youtube")){
    		
    		 try {
    	            // ex: http://www.youtube.com/watch?v=Nj6PFaDmp6c

    	        	String url = "http://www.youtube.com/watch?v="+id ; //A7PIU7npmz4";
    	            //String url = args[0];
    	            // ex: "/Users/axet/Downloads"
								log.warn("Attention urgent virer ces urls en dure !");
    	        	//String path = "/home/villepoux/urbanXplor/urbanxplor/code/server/target/videos";//videos;
    	        
    	        	//String path = args[1];
    	        	File  f =  new File(path);
    	            VGet v = new VGet(new URL(url), f);
    	            log.error("file  "+ f.getAbsoluteFile().getAbsolutePath() + " "+f.getName());
    	            v.download();

    	            results.put(new JSONObject(url));
    	        } catch (Exception e) {
    	            e.printStackTrace();
    	        }
    		
    		/*
    		String url = "https://www.youtube.com/watch?v="+id ; //A7PIU7npmz4";
    		AppManagedDownload ap = new AppManagedDownload();
    		ap.run(url, new File(path));	 
    		*/	
    	           
    	     

    	}

        //response

	    jo.put("Uri", results);
		ResponseBuilder rb = Response.ok(jo.toString());

    	addCORSOrigin(servletContext,rb, headers);
    	return rb.build();
    }

    @OPTIONS
    @Path("/uploadImages")
    public Response uploadImages(@Context HttpHeaders headers){
        ResponseBuilder res = Response.ok();
        enableCORS(servletContext,res, headers);
        return res.build();
    }


    @Path("/uploadImages")
    @GET
    @Consumes(WILDCARD)
    public Response uploadImages(
            @QueryParam(value="url") String urlString,
            @QueryParam(value="destinationFile") String destinationFile,
            @QueryParam(value="idProject") String idProject,
            @Context HttpHeaders headers){



    	String pathDir = "/opt/urban-publish/"+idProject+"/images";
        
    	new File(pathDir).mkdirs();
        URL url = null;
        
        try {
            url = new URL(urlString.replace("%26", "&"));
            log.error(url.toString());
        } catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        InputStream in = null;
        try {
            in = new BufferedInputStream(url.openStream());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        OutputStream out = null;
        try {
            out = new BufferedOutputStream(new FileOutputStream(pathDir+"/"+destinationFile));
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        try {
            for ( int i; (i = in.read()) != -1; ) {
                out.write(i);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        try {
            in.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        try {
            out.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


        ResponseBuilder rb = Response.ok("");
        addCORSOrigin(servletContext,rb, headers);
        return rb.build();
    }
    
    @OPTIONS
    @Path("/copyFiles")
    public Response copyFiles(@Context HttpHeaders headers){
        ResponseBuilder res = Response.ok();
        enableCORS(servletContext,res, headers);
        return res.build();
    }


    @Path("/copyFiles")
    @GET
    @Consumes(WILDCARD)
    public Response copyFiles(
            @QueryParam(value="title") String title,
            @QueryParam(value="idProject") String idProject,
            @Context HttpHeaders headers) throws IOException{

        File srcFile = new File ("/opt/urban-images/"+title); 
        //File srcFile = new File ("../../urbanBackOffice/app/images/"+title); 
        File destFile = new File("/opt/urban-publish/"+idProject+"/images/"+title);
        /*if(!destFile.exists())
        	destFile.createNewFile();*/
        FileUtils.copyFile(srcFile, destFile);


        ResponseBuilder rb = Response.ok("");
        addCORSOrigin(servletContext,rb, headers);
        return rb.build();
    }

    @OPTIONS
    @Path("/fileUpload")
    public Response uploadFile(@Context HttpHeaders headers){
        ResponseBuilder res = Response.ok();
        log.error("dans le file upload CORS");
        enableCORS(servletContext,res, headers);
        return res.build();
    }


    @Path("/fileUpload")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(TEXT_HTML)
    public Response uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
    		@QueryParam(value="fileName") String fileName,
    		@Context HttpHeaders headers){
    	
    	log.error("start dl file");
    	
    	//FormDataBodyPart filePart = form.getField("file");

    	//ContentDisposition headerOfFilePart =  filePart.getContentDisposition();

    	//InputStream fileInputStream = filePart.getValueAs(InputStream.class);
    	//log.error(headerOfFilePart.getFileName());
    	//log.error(headerOfFilePart.getType());
        //String filePath = "/home/wiem/dev/urbanxplor/code/urbanBackOffice/app/images/" + headerOfFilePart.getFileName();
        log.warn("Faire un fichier de configuration !!!!! URL EN DURE !!!!");
		String filePath = "/opt/urban-images/" + fileName ;


          // save the file to the server
           saveFile(uploadedInputStream, filePath);

    
    	   ResponseBuilder rb = Response.ok(filePath);
           addCORSOrigin(servletContext,rb, headers);
           return rb.build();
           


    }

 // save uploaded file to a defined location on the server
 	private void saveFile(InputStream uploadedInputStream, String serverLocation) {

 		try {
 			OutputStream outpuStream = new FileOutputStream(new File(
 					serverLocation));
 			int read = 0;
 			byte[] bytes = new byte[1024];

 			outpuStream = new FileOutputStream(new File(serverLocation));
 			while ((read = uploadedInputStream.read(bytes)) != -1) {
 				outpuStream.write(bytes, 0, read);
 			}

 			outpuStream.flush();
 			outpuStream.close();

 			uploadedInputStream.close();
 		} catch (IOException e) {

 			e.printStackTrace();
 		}

 	}







}
