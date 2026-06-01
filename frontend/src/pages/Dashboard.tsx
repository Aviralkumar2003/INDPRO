import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskBoard from '../components/TaskBoard';
import TaskForm from '../components/TaskForm';
import api from '../api/axios';
import type { Task, TaskStage } from '../types';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (taskData: Partial<Task>) => {
        try {
            await api.post('/tasks', taskData);
            fetchTasks();
            setIsFormOpen(false);
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    const handleUpdateTask = async (taskData: Partial<Task>) => {
        if (!editingTask) return;
        try {
            await api.put(`/tasks/${editingTask.id}`, taskData);
            fetchTasks();
            setIsFormOpen(false);
            setEditingTask(null);
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    const handleStageChange = async (task: Task, newStage: TaskStage) => {
        try {
            await api.put(`/tasks/${task.id}`, {
                title: task.title,
                description: task.description,
                stage: newStage,
            });
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task stage', error);
        }
    };

    const openCreateForm = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const openEditForm = (task: Task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your tasks across different stages</p>
                    </div>
                    <button
                        onClick={openCreateForm}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                        New Task
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <TaskBoard
                        tasks={tasks}
                        onEdit={openEditForm}
                        onDelete={handleDeleteTask}
                        onStageChange={handleStageChange}
                    />
                )}
            </main>

            {isFormOpen && (
                <TaskForm
                    task={editingTask}
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingTask(null);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
