package project.backend.controller;



import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backend.dto.Department.DepartmentRequestDTO;
import project.backend.dto.Department.DepartmentResponseDTO;
import project.backend.service.DepartmentService;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<DepartmentResponseDTO> create(
            @Valid @RequestBody DepartmentRequestDTO dto) {

        return new ResponseEntity<>(
                departmentService.create(dto),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<DepartmentResponseDTO>> getAll() {
        return ResponseEntity.ok(departmentService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponseDTO> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(departmentService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentRequestDTO dto) {

        return ResponseEntity.ok(departmentService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        departmentService.delete(id);

        return ResponseEntity.ok("Department deleted successfully");
    }
}
