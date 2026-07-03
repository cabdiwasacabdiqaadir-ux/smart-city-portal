package project.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import project.backend.entity.Complaint;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUserId(Long userId);

}