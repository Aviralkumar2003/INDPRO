package com.indpro.assignment.service;

import com.indpro.assignment.dto.TaskRequest;
import com.indpro.assignment.dto.TaskResponse;
import com.indpro.assignment.entity.Task;
import com.indpro.assignment.entity.User;
import com.indpro.assignment.repository.TaskRepository;
import com.indpro.assignment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskResponse createTask(TaskRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .stage(request.getStage())
                .user(user)
                .build();

        Task savedTask = taskRepository.save(task);
        return mapToResponse(savedTask);
    }

    public List<TaskResponse> getAllTasks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepository.findByUser(user).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse updateTask(Long id, TaskRequest request, String email) {
        Task task = getTaskAndVerifyOwner(id, email);
        
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStage(request.getStage());

        Task updatedTask = taskRepository.save(task);
        return mapToResponse(updatedTask);
    }

    public void deleteTask(Long id, String email) {
        Task task = getTaskAndVerifyOwner(id, email);
        taskRepository.delete(task);
    }

    private Task getTaskAndVerifyOwner(Long taskId, String email) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Not authorized to access this task");
        }
        return task;
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .stage(task.getStage())
                .build();
    }
}
