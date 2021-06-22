package bs.backend.device;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Integer> {
    List<Device> findAllByUid(int uid);
    
    @Query(value = "select count(*) from Device d where d.uid = :uid")
    int countDeviceByUid(int uid);
}
