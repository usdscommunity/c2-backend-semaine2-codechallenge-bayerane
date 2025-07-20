import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Priority, Todo } from './entities/todo.entity';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { TodoNotFoundException } from 'src/common/exceptions/todo-not-found.exception';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    // Données de démonstration
    new Todo({
      id: '1',
      title: `Implémenter l'authentification`,
      description: 'Ajouter JWT et guards',
      priority: Priority.HIGH,
      tags: ['backend', 'sécurité'],
      isFavorite: true,
    }),
    new Todo({
      id: '2',
      title: 'Écrire la documentation',
      description: 'Documenter tous les endpoints',
      priority: Priority.MEDIUM,
      tags: ['documentation'],
    }),
    new Todo({
      id: '3',
      title: 'Tests unitaires',
      description: 'Couvrir tous les services',
      priority: Priority.LOW,
      tags: ['tests', 'qualité'],
    }),
  ];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo(createTodoDto);
    this.todos.push(todo);
    return todo;
  }

  findAll(filterDto?: FilterTodoDto): Todo[] {
    let filteredTodos = [...this.todos];

    if (filterDto) {
      // Filtrage par priorité
      if (filterDto.priority) {
        filteredTodos = filteredTodos.filter(
          (todo) => todo.priority === filterDto.priority,
        );
      }

      // Filtrer par tag
      if (filterDto.tag) {
        filteredTodos = filteredTodos.filter((todo) =>
          filterDto.tag ? todo.tags.includes(filterDto.tag) : false,
        );
      }

      // Filtrer par favoris
      if (filterDto.isFavorite !== undefined) {
        filteredTodos = filteredTodos.filter(
          (todo) => todo.isFavorite === filterDto.isFavorite,
        );
      }

      // Filtrer par complétion
      if (filterDto.isCompleted !== undefined) {
        filteredTodos = filteredTodos.filter(
          (todo) => todo.isCompleted === filterDto.isCompleted,
        );
      }

      // Recherche par mot-clé
      if (filterDto.search) {
        const searchTerm = filterDto.search.toLowerCase();
        filteredTodos = filteredTodos.filter(
          (todo) =>
            todo.title.toLowerCase().includes(searchTerm) ||
            (todo.description &&
              todo.description.toLowerCase().includes(searchTerm)),
        );
      }
    }

    return filteredTodos.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new TodoNotFoundException(id);
    }
    return todo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new TodoNotFoundException(id);
    }

    const updatedTodo = new Todo({
      ...this.todos[todoIndex],
      ...updateTodoDto,
      updatedAt: new Date(),
    });

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

  remove(id: string): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new TodoNotFoundException(id);
    }
    this.todos.splice(todoIndex, 1);
  }

  // Methodes utilitaires pour les statistiques
  getStats() {
    const totalTodos = this.todos.length;
    const completedTodos = this.todos.filter((todo) => todo.isCompleted).length;
    const favoriteTodos = this.todos.filter((todo) => todo.isFavorite).length;
    const byPriority = {
      high: this.todos.filter((todo) => todo.priority === Priority.HIGH).length,
      medium: this.todos.filter((todo) => todo.priority === Priority.MEDIUM)
        .length,
      low: this.todos.filter((todo) => todo.priority === Priority.LOW).length,
    };

    return {
      total: totalTodos,
      completed: completedTodos,
      pending: totalTodos - completedTodos,
      favorites: favoriteTodos,
      byPriority,
    };
  }
}
