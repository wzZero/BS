package bs.backend.record;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.annotation.Resource;
import javax.websocket.server.PathParam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bs.backend.device.Device;
import bs.backend.service.IDeviceService;
import bs.backend.service.IRecordService;

@RestController
@RequestMapping("/record")
public class RecordController {
    @Resource
    private IRecordService recordService;

    @Resource
    private IDeviceService deviceService;

    public static int minBetween(Timestamp date){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date recordTime = new Date(date.getTime());
        Date now = new Date(System.currentTimeMillis());
        long thatTime = 0;
        long nowTime = 0;
        try{
            thatTime = sdf.parse(sdf.format(recordTime)).getTime();
            nowTime = sdf.parse(sdf.format(now)).getTime();
        }
        catch(Exception e){
            
        }
        long between = (nowTime - thatTime)/(1000*60);

        return Integer.parseInt(String.valueOf(between));
    }

    @GetMapping("/list")
    public List<Record> getRecordsByDevid(@PathParam("devid") int devid){
        return recordService.findRecordByDevid(devid);
    }

    @GetMapping("/5min")
    public int[] getRecordsByWeek(@PathParam("uid") int uid){
        List<Device> deviceList = deviceService.findDeviceByUid(uid);
        int[] resultList = new int[5];

        for (Device device : deviceList) {
            int devid = device.getDevid();
            List<Record> r = recordService.findRecordByDevid(devid);
            for(Record record : r){
                int mins = minBetween(record.getMoment()); 
                switch(mins){
                    case 0:
                    resultList[0]++;
                    break;
                    case 1:
                    resultList[1]++;
                    break;
                    case 2:
                    resultList[2]++;
                    break;
                    case 3:
                    resultList[3]++;
                    break;
                    case 4:
                    resultList[4]++;
                    break;
                }
            }
        }

        return resultList;
    }
}
