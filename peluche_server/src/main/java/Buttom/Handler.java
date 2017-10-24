package Buttom;

import org.json.JSONObject;

import java.io.FileNotFoundException;
import java.text.ParseException;



class Handler {


    static JSONObject work(JSONObject input) throws ParseException, FileNotFoundException {

        JSONObject filters = input.getJSONObject("filters");
        String ch = "ok";
        JSONObject message = new JSONObject((ch.toString()));
        String start = filters.toString();
        if (start.equals("on")) {
            return message;
        return null;
    }
}
