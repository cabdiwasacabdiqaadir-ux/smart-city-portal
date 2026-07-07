package project.backend.service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.backend.dto.Complaint.ComplaintRequestDTO;
import project.backend.dto.Complaint.ComplaintResponseDTO;
import project.backend.entity.Category;
import project.backend.entity.Complaint;
import project.backend.entity.User;
import project.backend.enums.Priority;
import project.backend.enums.Status;
import project.backend.repository.CategoryRepository;
import project.backend.repository.ComplaintRepository;
import project.backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    public ComplaintResponseDTO createComplaint(ComplaintRequestDTO dto, User user) {
        if (user == null) {
            throw new RuntimeException("Please login first");
        }
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Complaint complaint = new Complaint();

        complaint.setTitle(dto.getTitle());
        complaint.setDescription(dto.getDescription());
        complaint.setLocation(dto.getLocation());

        complaint.setCategory(category);
        complaint.setDepartment(category.getDepartment());
        complaint.setUser(user);

        complaint.setStatus(Status.PENDING);

        complaint.setPriority(
                dto.getPriority() == null
                        ? Priority.LOW
                        : dto.getPriority());

        complaint.setCreatedAt(LocalDateTime.now());

        Complaint saved = complaintRepository.save(complaint);

        return mapToResponse(saved);
    }
    public List<ComplaintResponseDTO> getAllComplaints() {

        return complaintRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    public List<ComplaintResponseDTO> getOfficerComplaints(String email){
        User officer = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Officer not found")
                );
        if(officer.getDepartment() == null){
            throw new RuntimeException(
                    "Officer has no department"
            );
        }
        return complaintRepository
                .findByDepartment(officer.getDepartment())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    public ComplaintResponseDTO getComplaintById(Long id) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        return mapToResponse(complaint);
    }

    public List<ComplaintResponseDTO> getMyComplaints(User user) {

        if (user == null) {
            throw new RuntimeException("Please login first");
        }

        return complaintRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ComplaintResponseDTO updateStatus(Long id, Status status) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(status);

        Complaint updated = complaintRepository.save(complaint);

        return mapToResponse(updated);
    }

    public void deleteComplaint(Long id) {

        if (!complaintRepository.existsById(id)) {
            throw new RuntimeException("Complaint not found");
        }

        complaintRepository.deleteById(id);
    }

    private ComplaintResponseDTO mapToResponse(Complaint complaint) {

        return new ComplaintResponseDTO(

                complaint.getId(),
                complaint.getTitle(),
                complaint.getDescription(),
                complaint.getLocation(),

                complaint.getStatus(),
                complaint.getPriority(),

                complaint.getUser().getFullName(),
                complaint.getCategory().getName(),
                complaint.getDepartment().getName(),

                complaint.getCreatedAt()
        );
    }
}