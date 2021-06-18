package bs.backend.service;

import bs.backend.device.Device;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IDeviceService {
    Optional<Device> findDeviceById(int id);
    List<Device> findDeviceByUid(int uid);
    Device createDevice(Device dev);
    Device editDevice(Device dev);
    void delDevice(int devid);
}
