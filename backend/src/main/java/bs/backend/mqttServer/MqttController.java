package bs.backend.mqttServer;


import bs.backend.user.User;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Base64;

@RestController
@RequestMapping("/status")
public class MqttController {
    public static RestTemplate client;
    public final String base = "http://localhost:8081";

    public MqttController() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(10000);
        requestFactory.setReadTimeout(10000);
        client = new RestTemplate(requestFactory);
    }

    @RequestMapping("/")
    public void GetStatus() throws IOException {
        SendRequest(base+"/api/v4/clients/",HttpMethod.GET,null);
    }

    public void SendRequest(String url, HttpMethod method, JSONObject json) throws IOException{
        if(client == null){
            return ;
        }
        HttpHeaders headers = new HttpHeaders();
        String authentication = "admin:public";
        headers.set("authorization","Basic"+ Base64.getEncoder().encodeToString(authentication.getBytes()));
        HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
        ResponseEntity<User> response = client.exchange("http://127.0.0.1:8085/users/register",method,requestEntity,User.class);
        System.out.println(response.getStatusCode());
    }

}
