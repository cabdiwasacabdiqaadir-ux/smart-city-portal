package project.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.backend.entity.Department;
import project.backend.enums.Role;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRequestDTO {
    @NotBlank(message = "Full name is required")
    private String fullName;
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;
    private String password;
    private Role role;
    private Long departmentId;
}
