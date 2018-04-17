package com.igu.developer.demo;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class GiphyService {

    private RestTemplate rest = new RestTemplate();
    public static final String GIPHY_BASE = "http://api.giphy.com/v1/gifs/search?q=";
    public static final String KEY = "&api_key=dc6zaTOxFJmzC";

    public String getGiphyUrl(String searchTerm) {
        Gson gson = new Gson();
        String giphy = GIPHY_BASE + searchTerm + KEY;
        try {
            URI uri = UriComponentsBuilder.fromUriString(giphy).build().encode().toUri();
            MultiValueMap<String, String> mvm = new LinkedMultiValueMap<String, String>();
            ResponseEntity<String> res = rest.exchange(uri, HttpMethod.GET, new HttpEntity(mvm, null), String.class);

            JsonObject json = gson.fromJson(res.getBody(), JsonObject.class);
            JsonArray data = json.getAsJsonArray("data");
            if (data == null || data.size() == 0) {
                return "https://media.giphy.com/media/EFXGvbDPhLoWs/giphy.gif";
            }
            JsonObject images = ((JsonObject) data.get(0)).getAsJsonObject("images");
            JsonObject original = images.getAsJsonObject("original");
            return original.getAsJsonPrimitive("url").getAsString();

        } catch (Throwable e) {
            return "https://media.giphy.com/media/EFXGvbDPhLoWs/giphy.gif";
        }

    }


}
