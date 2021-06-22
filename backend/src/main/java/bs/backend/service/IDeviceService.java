package bs.backend.service;

import bs.backend.device.Device;

import java.util.List;
import java.util.Optional;

public interface IDeviceService {
    Optional<Device> findDeviceById(int devid);
    int countDevice(int uid);
    List<Device> findDeviceByUid(int uid);
    boolean exitDevice(int devid);
    Device createDevice(Device dev);
    Device editDevice(Device dev);
    void delDevice(int devid);
}
