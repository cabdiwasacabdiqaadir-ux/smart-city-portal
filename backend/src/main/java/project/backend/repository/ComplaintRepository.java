package project.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import project.backend.entity.Complaint;
import project.backend.entity.Department;
import project.backend.enums.Status;

import java.time.LocalDateTime;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUserId(Long userId);
    long countByStatus(Status status);
    List<Complaint> findByCreatedAtBeforeAndStatusNot(
            LocalDateTime date,
            Status status
    );
    List<Complaint> findByDepartment(Department department);
}