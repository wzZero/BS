package bs.backend.record;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recid;
    private float longitude;
    private float latitude;
    private Timestamp moment;
    private short alert;
    private String info;
    private int devid;

    public int getRecid(){return recid;}
    public void setRecid(int value){this.recid = value;}

    public float getLongitude(){return longitude;}
    public void setLongitude(float value){this.longitude = value;}

    public float getLatitude(){return latitude;}
    public void setLatitude(float value){this.latitude = value;}

    public Timestamp getMoment(){return moment;}
    public void setMoment(Timestamp value){this.moment = value;}

    public short getAlert(){return alert;}
    public void setAlert(short value){this.alert = value;}

    public String getInfo(){return info;}
    public void setInfo(String value){this.info = value;}

    public int getDevid(){return devid;}
    public void setDevid(int value){this.devid = value;}


}
