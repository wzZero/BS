package bs.backend.service;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.IOException;
import java.util.Base64;

import javax.annotation.Resource;
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

    @Resource
    public IDeviceService deviceService;

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
    public int getOnline(int uid) throws IOException {
        String api = "/api/v4/clients/";
        ResponseEntity<String> res = SendRequest(api, HttpMethod.GET);
        JSONObject data = JSONObject.parseObject(res.getBody());
        JSONArray dataArray = data.getJSONArray("data");
        int count = 0;

        for (int i = 0;i<dataArray.size();i++) {
            JSONObject item = dataArray.getJSONObject(i);
            String clientid = item.getString("clientid");
            String id = clientid.substring(clientid.length()-4,clientid.length());
            try{
                Integer devid = Integer.parseInt(id);
                if(deviceService.exitDeviceByUid(devid, uid)){
                    count++;
                }
            }
            catch(Exception e){

            }

        }

        return count;
    }

}
