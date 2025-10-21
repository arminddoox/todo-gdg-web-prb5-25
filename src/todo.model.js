/// ./src/todo.model.js

// Based on Layered Architecture, this is Domain/ model

/**
 * @typedef {'none' | 'daily' | 'weekly' | 'monthly'} RepeatType
 */

/**
 * @typedef {'none' | 'important' | 'today' | 'this week' | 'overdue' | 'done'} TagType
 */

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} taskName
 * @property {Date} [dueDate]
 * @property {RepeatType} [repeat]
 * @property {TagType[]} [tags]
 * @property {boolean} [isDone]
 * @property {boolean} [isImportant]
 */

export class TaskModel {
  /**
   * Creates a new task
   * @param {string} taskName
   * @param {Date} [dueDate]
   * @param {RepeatType} [repeat]
   * @param {boolean} [isImportant]
   * @returns {Task}
   */
  static createTask(taskName, dueDate = null, repeat = 'none', isImportant = false) {
    return {
      id: Date.now(),
      taskName,
      dueDate: dueDate ? new Date(dueDate) : null,
      repeat: repeat || 'none',
      tags: [],
      isDone: false,
      isImportant: isImportant || false
    };
  }

  /**
   * Validates task name
   * @param {string} taskName
   * @returns {boolean}
   */
  static isValidTaskName(taskName) {
    return taskName && taskName.trim().length > 0;
  }

  /**
   * Calculates tags based on task properties
   * @param {Task} task
   * @returns {TagType[]}
   */
  static calculateTags(task) {
    const tags = [];
    
    if (task.isDone) {
      tags.push('done');
      return tags;
    }

    if (task.isImportant) {
      tags.push('important');
    }

    if (!task.dueDate) {
      return tags;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dueDate = new Date(task.dueDate);
    const taskDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

    // Check if overdue
    if (taskDate < today) {
      tags.push('overdue');
      return tags;
    }

    // Check if today
    if (taskDate.getTime() === today.getTime()) {
      tags.push('today');
      return tags;
    }

    // Check if this week (next 7 days)
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    
    if (taskDate <= weekFromNow) {
      tags.push('this week');
    }

    return tags;
  }

  /**
   * Advances due date based on repeat type
   * @param {Date} dueDate
   * @param {RepeatType} repeat
   * @returns {Date}
   */
  static advanceDueDate(dueDate, repeat) {
    const newDate = new Date(dueDate);
    
    switch (repeat) {
      case 'daily':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'weekly':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'monthly':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      default:
        break;
    }
    
    return newDate;
  }

  /**
   * Gets priority score for sorting (higher = more priority)
   * @param {Task} task
   * @returns {number}
   */
  static getPriority(task) {
    let priority = 0;
    
    // Overdue gets highest priority
    if (task.tags?.includes('overdue')) {
      priority += 1000;
    }
    
    // Important gets second priority
    if (task.isImportant) {
      priority += 100;
    }
    
    // Earlier due dates get higher priority
    if (task.dueDate) {
      priority += 10;
      // Subtract days until due (so closer dates have higher priority)
      const daysUntilDue = Math.floor((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
      priority -= daysUntilDue;
    }
    
    return priority;
  }
}

export default TaskModel;