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
    private String deviceName;
    private String deviceType;

    private Integer uid;

    public int getDevid(){return devid;}

    public void setDevid(int value){this.devid = value;}

    public String getDeviceName(){return deviceName;}

    public void setDeviceName(String value){this.deviceName = value;}

    public String getDeviceType(){return deviceType;}

    public void setDeviceType(String value){this.deviceType = value;}

    public int getUid(){return uid;}

    public void setUid(int value){this.uid = value;}
}
