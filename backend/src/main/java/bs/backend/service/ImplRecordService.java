package bs.backend.service;

import bs.backend.record.Record;
import bs.backend.record.RecordRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImplRecordService implements IRecordService{
    @Resource
    RecordRepository recordRepository;

    public List<Record> findRecordByDevid(int devid){return recordRepository.findAllByDevid(devid);}
    public Optional<Record> findRecordById(int id){return recordRepository.findById(id);}
    public Record createRecord(Record rec){return recordRepository.save(rec);}
    public Record editRecord(Record rec){return recordRepository.save(rec);}
    public void delRecord(int recid){recordRepository.deleteById(recid);}
}
