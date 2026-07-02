package project.backend.service;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.backend.dto.Department.DepartmentRequestDTO;
import project.backend.dto.Department.DepartmentResponseDTO;
import project.backend.entity.Department;
import project.backend.repository.DepartmentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentResponseDTO create(DepartmentRequestDTO dto) {

        if (departmentRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Department already exists");
        }

        Department department = new Department();
        department.setName(dto.getName());

        Department saved = departmentRepository.save(department);

        return mapToResponse(saved);
    }

    public List<DepartmentResponseDTO> getAll() {
        return departmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public DepartmentResponseDTO getById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        return mapToResponse(department);
    }

    public DepartmentResponseDTO update(Long id, DepartmentRequestDTO dto) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        if (!department.getName().equals(dto.getName())
                && departmentRepository.existsByName(dto.getName())) {

            throw new RuntimeException("Department already exists");
        }

        department.setName(dto.getName());

        Department updated = departmentRepository.save(department);

        return mapToResponse(updated);
    }

    public void delete(Long id) {

        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found");
        }

        departmentRepository.deleteById(id);
    }

    private DepartmentResponseDTO mapToResponse(Department department) {
        return new DepartmentResponseDTO(
                department.getId(),
                department.getName()
        );
    }
}
