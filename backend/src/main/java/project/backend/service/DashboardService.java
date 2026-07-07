package project.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.backend.dto.DashboardResponseDTO;
import project.backend.dto.SLAResponseDTO;
import project.backend.enums.Status;
import project.backend.repository.CategoryRepository;
import project.backend.repository.ComplaintRepository;
import project.backend.repository.DepartmentRepository;
import project.backend.repository.UserRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DashboardService {
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final CategoryRepository categoryRepository;
    private final ComplaintRepository complaintRepository;
    public DashboardResponseDTO getDashboardData() {
     return new DashboardResponseDTO(
             userRepository.count(),
             departmentRepository.count(),
             categoryRepository.count(),
             complaintRepository.count(),
             complaintRepository.countByStatus(Status.PENDING),
             complaintRepository.countByStatus(Status.IN_PROGRESS),
             complaintRepository.countByStatus(Status.RESOLVED)
     );
    }
    public List<SLAResponseDTO> getOverdueComplaints(){
        LocalDateTime limit=LocalDateTime.now().minusHours(72);
        return complaintRepository.findByCreatedAtBeforeAndStatusNot(limit, Status.RESOLVED)
                .stream()
                .map(c->new SLAResponseDTO(
                        c.getId(),
                        c.getTitle(),
                        c.getUser().getFullName(),
                        c.getDepartment().getName(),
                        Duration.between(
                                c.getCreatedAt(),
                                LocalDateTime.now()
                        ).toHours()
                ))
                .toList();
    }
}
