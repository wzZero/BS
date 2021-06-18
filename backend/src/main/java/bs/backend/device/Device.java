package bs.backend.device;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int devid;
    private String device_name;
    private int uid;

    public int getDevid(){return devid;}

    public void setDevid(int value){this.devid = value;}

    public String getDeviceName(){return device_name;}

    public void setDeviceName(String value){this.device_name = value;}

    public int getUid(){return uid;}

    public void setUid(int value){this.uid = value;}
}
