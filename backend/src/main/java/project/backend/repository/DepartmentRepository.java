package project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.backend.entity.Department;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByName(String name);

    boolean existsByName(String name);
}