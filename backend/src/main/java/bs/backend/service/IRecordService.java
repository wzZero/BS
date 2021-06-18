package bs.backend.service;

import bs.backend.device.Device;
import bs.backend.record.Record;

import java.util.List;
import java.util.Optional;

public interface IRecordService {
    List<Record> findRecordByDevid(int devid);
    Optional<Record> findRecordById(int id);
    Record createRecord(Record dev);
    Record editRecord(Record dev);
    void delRecord(int devid);
}