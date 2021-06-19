package bs.backend.user;

import bs.backend.service.IUserService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    private IUserService userService;

    @GetMapping
    public List<User> getUserList(){
        return userService.findAll();
    }

    @RequestMapping("/login")
    public User getUser(@RequestBody String body ){
        System.out.println("login");
        String test = "{\"email\":\"8130100000\",\"password\":\"123456\",\"autoLogin\":true}";
        JSONObject req = JSON.parseObject(body);
        System.out.println(body);
        return new User();
    }

    @RequestMapping("/register")
    public User addUser(){
        System.out.println("register");
        // 当传入数据不带自增主键时，无论每次传入的数据是否一样都是直接insert，id自增1
        // 当传入带自增主键时，如果数据不存在或者主键不存在，先select再insert；如果已存在则先select再update
        User u = new User();
        u.setName("wzl");
        u.setEmail("3180102262@zju.edu.cn");
        u.setPassword("123456");
        return userService.addUser(u);
    }

    @RequestMapping("/edit")
    public User editUser(){
        System.out.println("edit");
        User u = new User();
        u.setUid(2);
        u.setName("wzl");
        u.setEmail("3180102262@zju.edu.cn");
        u.setPassword("123456");
        return userService.addUser(u);
    }

}
