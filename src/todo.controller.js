/// ./src/todo.controller.js

// Based on Layered Architecture, this is Presentation/ controller

import { useState, useEffect } from 'react';
import { TodoService } from './todo.service';

export function useTodoController() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('none');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks on mount and when filter changes
  useEffect(() => {
    const loadedTasks = TodoService.getFilteredTasks(filter);
    setTasks(loadedTasks);
  }, [filter]);

  const loadTasks = () => {
    const loadedTasks = TodoService.getFilteredTasks(filter);
    setTasks(loadedTasks);
  };

  const handleAddTask = (taskName, dueDate, repeat, isImportant) => {
    try {
      TodoService.addTask(taskName, dueDate, repeat, isImportant);
      loadTasks();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
      alert(error.message);
    }
  };

  const handleUpdateTask = (id, updates) => {
    try {
      TodoService.updateTask(id, updates);
      loadTasks();
      setIsFormOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      alert(error.message);
    }
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      TodoService.deleteTask(id);
      loadTasks();
    }
  };

  const handleToggleDone = (id) => {
    TodoService.toggleDone(id);
    loadTasks();
  };

  const handleToggleImportant = (id) => {
    TodoService.toggleImportant(id);
    loadTasks();
  };

  const handleOpenAddForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return {
    tasks,
    filter,
    isFormOpen,
    editingTask,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleDone,
    handleToggleImportant,
    handleOpenAddForm,
    handleOpenEditForm,
    handleCloseForm,
    handleFilterChange
  };
}