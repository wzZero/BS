package bs.backend.user;

import bs.backend.exception.ErrorEnum;
import bs.backend.exception.ErrorRequest;
import bs.backend.service.IUserService;
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

    @PostMapping("/login")
    public User getUser(@RequestBody User loginUser){  
        User u;      
        if((u = userService.findUserByEmailAndPwd(loginUser.getEmail(), loginUser.getPassword())) != null) {
            u.setPassword("");
            u.setEmail("");
            return u;
        }
        else{
            boolean exitUser = userService.findUserByEmail(loginUser.getEmail()).booleanValue();
            if(exitUser){
                throw new ErrorRequest(ErrorEnum.USER_ERROR_PASSWORD);
            }
            else{
                throw new ErrorRequest(ErrorEnum.USER_NOT_FOUND);
            }
        }
    }

    @PostMapping("/register")
    public User addUser(@RequestBody User registerUser){
        boolean exitEmail = userService.findUserByEmail(registerUser.getEmail()).booleanValue();
        if(exitEmail){
            throw new ErrorRequest(ErrorEnum.USER_SAME_EMAIL);
        }
        return userService.addUser(registerUser);
    }

    @RequestMapping("/edit")
    public User editUser(){
        User u = new User();
        u.setUid(2);
        u.setUsername("wzl");
        u.setEmail("3180102262@zju.edu.cn");
        u.setPassword("123456");
        return userService.addUser(u);
    }

}
