package bs.backend.service;

import bs.backend.user.User;

import java.util.List;

public interface IUserService {
    List<User> findAll();
    User addUser(User user);
    User findUser(int id);
    User findUserLogin(String email,String password);
}
