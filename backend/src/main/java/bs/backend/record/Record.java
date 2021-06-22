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
    private double lng;
    private double lat;
    private Timestamp moment;
    private short alert;
    private String info;
    private int devid;
    private int value;

    public int getRecid(){return recid;}
    public void setRecid(int value){this.recid = value;}

    public double getLng(){return lng;}
    public void setLng(double value){this.lng = value;}

    public double getLat(){return lat;}
    public void setLat(double value){this.lat = value;}

    public Timestamp getMoment(){return moment;}
    public void setMoment(Timestamp value){this.moment = value;}

    public short getAlert(){return alert;}
    public void setAlert(short value){this.alert = value;}

    public String getInfo(){return info;}
    public void setInfo(String value){this.info = value;}

    public int getDevid(){return devid;}
    public void setDevid(int value){this.devid = value;}

    public int getValue(){return value;}
    public void setValue(int v){this.value = v;}
}
