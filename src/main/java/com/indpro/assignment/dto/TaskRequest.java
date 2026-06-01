package com.indpro.assignment.dto;

import com.indpro.assignment.entity.TaskStage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TaskRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Stage is required")
    private TaskStage stage;
}
