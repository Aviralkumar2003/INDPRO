import React from 'react';
import type { Task, TaskStage } from '../types';
import { Edit2, Trash2 } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onStageChange: (task: Task, stage: TaskStage) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStageChange }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 truncate pr-2">{task.title}</h4>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-primary-600">
                        <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            {task.description && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>
            )}
            <div className="mt-4 flex justify-between items-center text-xs">
                <select
                    className="bg-gray-50 border border-gray-200 text-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={task.stage}
                    onChange={(e) => onStageChange(task, e.target.value as TaskStage)}
                >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
            </div>
        </div>
    );
};

export default TaskCard;
