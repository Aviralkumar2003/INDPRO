package com.indpro.assignment.dto;

import com.indpro.assignment.entity.TaskStage;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private TaskStage stage;
}
