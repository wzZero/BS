package bs.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    // automatically implemented by JPA
    User findByEmailAndPassword(String email,String password);

    // except automatically implemented we can self-defined these query
    @Query(value = "from User u where u.uid = :uid")
    User findById(@Param("uid") int uid);
}
