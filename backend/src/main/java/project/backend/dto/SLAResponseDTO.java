package project.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
@AllArgsConstructor
public class SLAResponseDTO {
    private Long complaintId;
    private String title;
    private String citizen;
    private String department;
    private long overdueHours;
}