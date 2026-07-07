package project.backend.dto.Complaint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import project.backend.enums.Priority;

@Getter
@Setter
public class ComplaintRequestDTO {
    @NotBlank(message = "Title is required")
    private String title;
    @NotBlank(message = "Description is required")
    private String description;
    @NotBlank(message = "Location is required")
    private String location;
    @NotNull(message = "Category is required")
    private Long categoryId;
    private Priority priority;
}
