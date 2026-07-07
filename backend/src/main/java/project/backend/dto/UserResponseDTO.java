package project.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import project.backend.dto.Department.DepartmentResponseDTO;
import project.backend.enums.Role;
@Getter
@AllArgsConstructor
public class UserResponseDTO {
    private final Long id;
    private final String fullName;
    private final String email;
    private final Role role;
    private final DepartmentResponseDTO department;
}
