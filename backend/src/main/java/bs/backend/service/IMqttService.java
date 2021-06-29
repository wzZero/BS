package bs.backend.service;

import java.io.IOException;

public interface IMqttService {    
    int getOnline(int uid) throws IOException;
}
