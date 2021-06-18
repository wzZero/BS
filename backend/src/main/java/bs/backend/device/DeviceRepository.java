package bs.backend.device;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Integer> {
    List<Device> findAllByUid(int uid);
}
