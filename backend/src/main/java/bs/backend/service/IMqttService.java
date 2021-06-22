package bs.backend.service;

import java.io.IOException;

import com.alibaba.fastjson.JSONObject;

import org.springframework.http.HttpMethod;

public interface IMqttService {
    public int getOnline() throws IOException;
}
