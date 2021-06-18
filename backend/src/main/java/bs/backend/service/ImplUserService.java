package bs.backend.service;

import bs.backend.user.User;
import bs.backend.user.UserRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ImplUserService implements IUserService{
    @Resource
    private UserRepository userRepo;

    public User addUser(User user){
        return userRepo.save(user);
    }

    public User findUser(int uid){
        return userRepo.findById(uid);
    }

    public User findUserLogin(String email,String password){return userRepo.findByEmailAndPassword(email,password);}

    public List<User> findAll(){
        return userRepo.findAll();
    }

}
