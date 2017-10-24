package Buttom;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

import static Buttom.Handler.*;

@Path("/peluche")
@Produces(MediaType.APPLICATION_JSON)
public class ButtomService {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response process(String input) {
        JSONObject obj = new JSONObject(input);

        try {
            return Response.ok().entity(work(obj).toString()).build();

        } catch (Exception e){
            JSONObject error = new JSONObject().put("error", e.toString());
            return Response.status(400).entity(error.toString()).build();
        }
    }
}