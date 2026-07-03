package project.backend.dto.Complaint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import project.backend.enums.Priority;
import project.backend.enums.Status;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ComplaintResponseDTO {

    private Long id;
    private String title;
    private String description;
    private String location;

    private Status status;
    private Priority priority;

    private String citizen;
    private String category;
    private String department;

    private LocalDateTime createdAt;
}