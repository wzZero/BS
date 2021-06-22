package bs.backend.service;
import com.alibaba.fastjson.JSONObject;

import java.io.IOException;
import java.util.Base64;

import javax.transaction.Transactional;

import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import bs.backend.mqttServer.MyResponseErrorHandler;

@Service
@Transactional
public class ImplMqttService implements IMqttService {
    public static RestTemplate client;

    public final String base = "http://localhost:8081";

    public ImplMqttService() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(10000);
        requestFactory.setReadTimeout(10000);
        client = new RestTemplate(requestFactory);
        client.setErrorHandler(new MyResponseErrorHandler());
    }

    public ResponseEntity<String> SendRequest(String api, HttpMethod method) throws IOException{
        if(client == null){
            return null;
        }
        HttpHeaders headers = new HttpHeaders();
        String authentication = "admin:public";
        headers.set("authorization","Basic "+ Base64.getEncoder().encodeToString(authentication.getBytes()));
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        return client.exchange(base+api,method,requestEntity,String.class);
    }

    @Override
    public int getOnline() throws IOException {
        String api = "/api/v4/clients/";
        ResponseEntity<String> res = SendRequest(api, HttpMethod.GET);
        JSONObject meta = JSONObject.parseObject(res.getBody());
        int count = meta.getJSONObject("meta").getIntValue("count")-1;
        return count;
    }

}
