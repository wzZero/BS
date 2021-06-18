package bs.backend.record;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.relational.core.sql.In;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Integer> {
    List<Record> findAllByDevid(int devid);
}
