export interface User {
    name: string;
    email: string;
}

export type TaskStage = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
    id: number;
    title: string;
    description: string;
    stage: TaskStage;
}
