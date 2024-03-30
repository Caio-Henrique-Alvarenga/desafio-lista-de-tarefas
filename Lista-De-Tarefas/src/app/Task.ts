export class Task {
    taskId: number;
    title: string;
    description: string;
    isComplete: boolean;
    userId: number;
    // Esse construtor é necessário para criar uma task vazia para usar como base para algumas operações
    constructor(task: any) {
        this.taskId = task.taskId;
        this.title = task.title;
        this.description = task.description;
        this.isComplete = task.isComplete;
        this.userId = task.userId;
      }
}

