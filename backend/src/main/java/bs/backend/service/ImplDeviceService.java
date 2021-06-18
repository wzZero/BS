package bs.backend.service;

import bs.backend.device.Device;
import bs.backend.device.DeviceRepository;
import bs.backend.mqttServer.MqttController;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImplDeviceService implements IDeviceService {
    @Resource
    private DeviceRepository deviceRepository;

    public Optional<Device> findDeviceById(int id){
        return deviceRepository.findById(id);
    }

    public List<Device> findDeviceByUid(int uid){
        return deviceRepository.findAllByUid(uid);
    }

    public Device createDevice(Device dev){return deviceRepository.save(dev);}

    public Device editDevice(Device dev){return deviceRepository.save(dev);}

    public void delDevice(int devid){deviceRepository.deleteById(devid);}
}
