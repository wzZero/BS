package bs.backend.service;

import bs.backend.user.User;

import java.util.List;

public interface IUserService {
    List<User> findAll();
    User addUser(User user);
    User findUserById(int id);
    Boolean findUserByEmail(String email);
    User findUserByEmailAndPwd(String email,String password);
}
