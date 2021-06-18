package bs.backend.device;

import bs.backend.service.IDeviceService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/device")
public class DeviceController {
    @Resource
    private IDeviceService deviceService;

    @RequestMapping("/")
    public List<Device> getDeviceByUid(){
        return deviceService.findDeviceByUid(1);
    }

    @RequestMapping("/create")
    public Device createDevice(){
        Device dev = new Device();
        dev.setDeviceName("wzl‘s phone");
        dev.setUid(1);
        return deviceService.createDevice(dev);
    }

    @RequestMapping("/edit")
    public Device editDevice(){
        return null;
    }

    @RequestMapping("/delete")
    public void delDevice(){
        deviceService.delDevice(1);
    }
}
