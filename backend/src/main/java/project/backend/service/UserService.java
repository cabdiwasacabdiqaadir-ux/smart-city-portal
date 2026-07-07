package project.backend.service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import project.backend.dto.Department.DepartmentResponseDTO;
import project.backend.dto.ProfileResponseDTO;
import project.backend.dto.UserRequestDTO;
import project.backend.dto.UserResponseDTO;
import project.backend.entity.Department;
import project.backend.entity.User;
import project.backend.enums.Role;
import project.backend.repository.DepartmentRepository;
import project.backend.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    private final DepartmentRepository departmentRepo;
    public UserResponseDTO createUser(UserRequestDTO dto) {
        Optional<User> existingUser = userRepo.findByEmail(dto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists");
        }
        User user = new User();
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        if (dto.getRole() == Role.OFFICER) {

            if (dto.getDepartmentId() == null) {
                throw new RuntimeException("Department is required for officer");
            }

            Department department = departmentRepo.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));

            user.setDepartment(department);
        }

        userRepo.save(user);

        return mapToResponse(user);
    }


    public List<UserResponseDTO> getAllUsers() {

        return userRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    public UserResponseDTO getUserById(Long id) {

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToResponse(user);
    }


    public void delete(Long id) {
        userRepo.deleteById(id);
    }

    public UserResponseDTO update(Long id, UserRequestDTO dto) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getEmail().equals(dto.getEmail())) {
            if (userRepo.findByEmail(dto.getEmail()).isPresent()) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(dto.getEmail());
        }
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(
                    passwordEncoder.encode(dto.getPassword())
            );
        }
        user.setFullName(dto.getFullName());
        if(dto.getRole()!=null){
            user.setRole(dto.getRole());
        }
        // Update department only when admin sends a new department
        if (user.getRole() == Role.OFFICER) {
            if (dto.getDepartmentId() != null) {
                Department department =
                        departmentRepo.findById(dto.getDepartmentId())
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Department not found"
                                        )
                                );
                user.setDepartment(department);
            }
            // if departmentId is null:
            // keep current department
        } else {
            user.setDepartment(null);
        }
        userRepo.save(user);
        return mapToResponse(user);
    }
    public ProfileResponseDTO profile(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        DepartmentResponseDTO department = null;

        if (user.getDepartment() != null) {

            department = new DepartmentResponseDTO(
                    user.getDepartment().getId(),
                    user.getDepartment().getName()
            );
        }

        return new ProfileResponseDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                department
        );
    }
    public UserResponseDTO updateProfile(String email, UserRequestDTO dto) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getEmail().equals(dto.getEmail())) {

            if (userRepo.findByEmail(dto.getEmail()).isPresent()) {
                throw new RuntimeException("Email already exists");
            }

            user.setEmail(dto.getEmail());
        }

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        user.setFullName(dto.getFullName());

        userRepo.save(user);

        return mapToResponse(user);
    }


    private UserResponseDTO mapToResponse(User user) {

        DepartmentResponseDTO department = null;

        if (user.getDepartment() != null) {

            department = new DepartmentResponseDTO(
                    user.getDepartment().getId(),
                    user.getDepartment().getName()
            );
        }
        return new UserResponseDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                department
        );
    }
}