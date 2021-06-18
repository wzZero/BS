package bs.backend.mqttServer;

import java.util.List;

class ClientItem{
    private String clientId;
    private  int port;

    public void setClientId(String value){this.clientId = value;}
    public String getClientId(){return clientId;}
    public void setPort(int value){this.port = value;}
    public int getPort(){return port;}
}

public class MqttData {
    List<ClientItem> items;

    public void setItems(List<ClientItem> items) {
        this.items = items;
    }

    public List<ClientItem> getItems() {
        return items;
    }
}
