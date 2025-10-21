/// ./src/todo.service.js

// Based on Layered Architecture, this is Application/ service
// Infrastructure/ (localStorage) be grouped with Application/ service

import { TaskModel } from './todo.model';

const STORAGE_KEY = 'todo_tasks';

export class TodoService {
  /**
   * Gets all tasks from localStorage
   * @returns {Task[]}
   */
  static getAllTasks() {
    try {
      const tasksJson = localStorage.getItem(STORAGE_KEY);
      if (!tasksJson) return [];
      
      const tasks = JSON.parse(tasksJson);
      
      // Convert date strings back to Date objects and recalculate tags
      return tasks.map(task => {
        const updatedTask = {
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : null
        };
        updatedTask.tags = TaskModel.calculateTags(updatedTask);
        return updatedTask;
      });
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  /**
   * Saves tasks to localStorage
   * @param {Task[]} tasks
   */
  static saveTasks(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  /**
   * Adds a new task
   * @param {string} taskName
   * @param {Date} [dueDate]
   * @param {RepeatType} [repeat]
   * @param {boolean} [isImportant]
   * @returns {Task}
   */
  static addTask(taskName, dueDate = null, repeat = 'none', isImportant = false) {
    if (!TaskModel.isValidTaskName(taskName)) {
      throw new Error('Task name is required');
    }

    const task = TaskModel.createTask(taskName, dueDate, repeat, isImportant);
    task.tags = TaskModel.calculateTags(task);
    
    const tasks = this.getAllTasks();
    tasks.push(task);
    this.saveTasks(tasks);
    
    return task;
  }

  /**
   * Updates an existing task
   * @param {number} id
   * @param {Partial<Task>} updates
   * @returns {Task|null}
   */
  static updateTask(id, updates) {
    const tasks = this.getAllTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) return null;

    // If taskName is being updated, validate it
    if (updates.taskName !== undefined && !TaskModel.isValidTaskName(updates.taskName)) {
      throw new Error('Task name is required');
    }

    tasks[index] = { ...tasks[index], ...updates };
    tasks[index].tags = TaskModel.calculateTags(tasks[index]);
    
    this.saveTasks(tasks);
    return tasks[index];
  }

  /**
   * Deletes a task
   * @param {number} id
   * @returns {boolean}
   */
  static deleteTask(id) {
    const tasks = this.getAllTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    this.saveTasks(filteredTasks);
    return true;
  }

  /**
   * Toggles task done status
   * @param {number} id
   * @returns {Task|null}
   */
  static toggleDone(id) {
    const tasks = this.getAllTasks();
    const task = tasks.find(t => t.id === id);
    
    if (!task) return null;

    // If marking as done and has repeat, advance the due date
    if (!task.isDone && task.repeat !== 'none' && task.dueDate) {
      task.dueDate = TaskModel.advanceDueDate(task.dueDate, task.repeat);
      task.isDone = false; // Keep it undone since it's recurring
    } else {
      task.isDone = !task.isDone;
    }

    task.tags = TaskModel.calculateTags(task);
    this.saveTasks(tasks);
    
    return task;
  }

  /**
   * Toggles task important status
   * @param {number} id
   * @returns {Task|null}
   */
  static toggleImportant(id) {
    const tasks = this.getAllTasks();
    const task = tasks.find(t => t.id === id);
    
    if (!task) return null;

    task.isImportant = !task.isImportant;
    task.tags = TaskModel.calculateTags(task);
    this.saveTasks(tasks);
    
    return task;
  }

  /**
   * Gets filtered and sorted tasks
   * @param {TagType} filter
   * @returns {Task[]}
   */
  static getFilteredTasks(filter = 'none') {
    let tasks = this.getAllTasks();

    // Apply filter
    if (filter !== 'none') {
      tasks = tasks.filter(task => task.tags?.includes(filter));
    }

    // Sort by priority (overdue > important > due date)
    tasks.sort((a, b) => {
      const priorityA = TaskModel.getPriority(a);
      const priorityB = TaskModel.getPriority(b);
      return priorityB - priorityA;
    });

    return tasks;
  }

  /**
   * Gets a single task by ID
   * @param {number} id
   * @returns {Task|null}
   */
  static getTaskById(id) {
    const tasks = this.getAllTasks();
    return tasks.find(task => task.id === id) || null;
  }
}

export default TodoService;