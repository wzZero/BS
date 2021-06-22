package bs.backend.device;

import bs.backend.exception.ErrorEnum;
import bs.backend.exception.ErrorRequest;
import bs.backend.exception.ResponseResult;
import bs.backend.service.IDeviceService;
import bs.backend.service.IMqttService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.websocket.server.PathParam;

import com.alibaba.fastjson.JSONObject;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/device")
public class DeviceController {
    @Resource
    private IDeviceService deviceService;
    
    @Resource
    private IMqttService mqttService;

    @GetMapping("/list")
    public List<Device> getDeviceByUid(@PathParam("uid") int uid){
        return deviceService.findDeviceByUid(uid);
    }

    @GetMapping("/status")
    public JSONObject getDeviceStatus(@RequestParam("uid") int uid){
        int total = deviceService.countDevice(uid);
        
        int online = 0;
        try{
            online = mqttService.getOnline();
        }
        catch(IOException e){
            throw new ErrorRequest(ErrorEnum.DEVICE_ONLINE_ERROR);
        }
        JSONObject json = new JSONObject();
        json.put("total", total);
        json.put("online", online);
        return json;        
    }

    @RequestMapping("/create")
    public Device createDevice(@RequestParam("uid") int uid,@RequestBody Device device){
        if(device.getDeviceType() == null || device.getDeviceName() == null){
            throw new ErrorRequest(ErrorEnum.DEVICE_CREATE_ERROR);
        }
        device.setUid(uid);
        return deviceService.createDevice(device);
    }

    @RequestMapping("/edit")
    public void editDevice(@RequestBody Device device){
        Optional<Device> deviceToEdit = deviceService.findDeviceById(device.getDevid());
        if(!deviceToEdit.isPresent()){
            throw new ErrorRequest(ErrorEnum.DEVICE_NOT_FOUND);
        }

        if(device.getDeviceName() == null){
            throw new ErrorRequest(ErrorEnum.DEVICE_ATTR_ERROR);
        }
        deviceToEdit.get().setDeviceName(device.getDeviceName());
        deviceService.editDevice(deviceToEdit.get());
        ResponseResult.success();
    }

    @RequestMapping("/delete")
    public void delDevice(@RequestBody Device device){
        int devid = device.getDevid();
        if(!deviceService.exitDevice(device.getDevid())){
            throw new ErrorRequest(ErrorEnum.DEVICE_NOT_FOUND);
        }
        deviceService.delDevice(devid);
        ResponseResult.success();        
    }
}
