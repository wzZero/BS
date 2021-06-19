package bs.backend.user;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid = 1;

    private String name = "wzl";

    private String email = "3180102262@zju.edu.cn";

    private String password = "123";

    public User(){}

    public int getUid(){
        return uid;
    }

    public void setUid(int value){
        this.uid = value;
    }

    public void setName(String value){
        this.name = value;
    }

    public String getName(){
        return name;
    }

    public void setEmail(String value){
        this.email = value;
    }

    public String getEmail(){
        return email;
    }

    public void setPassword(String value){
        this.password = value;
    }

    public String getPassword(){
        return password;
    }
}
