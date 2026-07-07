package project.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
@AllArgsConstructor
public class DashboardResponseDTO {
    private long totalUsers;
    private long totalDepartments;
    private long totalCategories;
    private long totalComplaints;
    private long pendingComplaints;
    private long inProgressComplaints;
    private long resolvedComplaints;
}