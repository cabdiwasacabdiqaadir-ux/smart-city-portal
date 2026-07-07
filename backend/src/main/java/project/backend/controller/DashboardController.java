package project.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.backend.dto.DashboardResponseDTO;
import project.backend.dto.SLAResponseDTO;
import project.backend.service.DashboardService;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;
    @GetMapping
    public ResponseEntity<DashboardResponseDTO> dashboard(){
        return ResponseEntity.ok(dashboardService.getDashboardData());
    }
    @GetMapping("/sla")
    public ResponseEntity<List<SLAResponseDTO>> overdueComplaints() {
        return ResponseEntity.ok(
                dashboardService.getOverdueComplaints()
        );
    }
}
