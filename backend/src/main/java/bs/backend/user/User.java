package bs.backend.user;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;

    private String username;

    private String email;

    private String password;

    public User(){}

    public int getUid(){
        return uid;
    }

    public void setUid(int value){
        this.uid = value;
    }

    public void setUsername(String value){
        this.username = value;
    }
    

    public String getUsername(){
        return username;
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
