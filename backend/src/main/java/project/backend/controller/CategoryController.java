package project.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.backend.dto.Category.CategoryRequestDTO;
import project.backend.dto.Category.CategoryResponseDTO;
import project.backend.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> create(
            @Valid @RequestBody CategoryRequestDTO dto) {

        return new ResponseEntity<>(
                categoryService.create(dto),
                HttpStatus.CREATED
        );
    }


    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAll() {

        return ResponseEntity.ok(
                categoryService.getAll()
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequestDTO dto) {

        return ResponseEntity.ok(
                categoryService.update(id, dto)
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        categoryService.delete(id);

        return ResponseEntity.ok(
                "Category deleted"
        );
    }
}