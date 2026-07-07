package project.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.backend.dto.ProfileResponseDTO;
import project.backend.dto.UserRequestDTO;
import project.backend.dto.UserResponseDTO;
import project.backend.service.UserService;
@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final UserService userService;
    @GetMapping
    public ResponseEntity<ProfileResponseDTO> getProfile(
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                userService.profile(email)
        );
    }

    @PutMapping
    public ResponseEntity<UserResponseDTO> updateProfile(
            @Valid @RequestBody UserRequestDTO dto,
            Authentication authentication
    ){
        String email = authentication.getName();
        return ResponseEntity.ok(
                userService.updateProfile(email, dto)
        );
    }
}