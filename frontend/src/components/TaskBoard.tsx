import React from 'react';
import type { Task, TaskStage } from '../types';
import TaskCard from './TaskCard';

interface TaskBoardProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onStageChange: (task: Task, stage: TaskStage) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onEdit, onDelete, onStageChange }) => {
    const columns: { title: string; stage: TaskStage }[] = [
        { title: 'To Do', stage: 'TODO' },
        { title: 'In Progress', stage: 'IN_PROGRESS' },
        { title: 'Done', stage: 'DONE' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column) => {
                const columnTasks = tasks.filter((t) => t.stage === column.stage);
                
                return (
                    <div key={column.stage} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">{column.title}</h3>
                            <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                {columnTasks.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {columnTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onStageChange={onStageChange}
                                />
                            ))}
                            {columnTasks.length === 0 && (
                                <div className="text-center py-8 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                                    No tasks in this stage
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TaskBoard;
