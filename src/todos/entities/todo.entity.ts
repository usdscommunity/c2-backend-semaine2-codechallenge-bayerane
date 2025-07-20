export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  tags: string[];
  isFavorite: boolean;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Todo>) {
    Object.assign(this, partial);
    this.id = this.id || this.generateId();
    this.priority = this.priority || Priority.MEDIUM;
    this.tags = this.tags || [];
    this.isFavorite = this.isFavorite || false;
    this.isCompleted = this.isCompleted || false;
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = this.updatedAt || new Date();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
