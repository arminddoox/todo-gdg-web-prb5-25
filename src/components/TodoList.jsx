/// ./src/components/TodoList.jsx

// Import `TodoItem.jsx` and `TodoForm.jsx`

/*
=== UX/UI description ===

### It presents
- Filter menu / Add new button(`<button />` has black border, and black background)
- Items list priority is ( overdue > important > due )

### Filter-menu-collapse presents
- "Filter" with down-icon (unselected)
- "Important" with down-icon (select `important`)
- "Today" with down-icon (select `today`)
- "This week" with down-icon (select `this week`)
- "Overdue" with down-icon (select `overdue`)
- "Done" with down-icon (select `done`)

### Filter-menu-expand presents
- a list of "none", "important", "today", "this week", "overdue", "done"
- selected item should be highlighted
- filter-menu-item::hover
*/

import { useState } from 'react';
import { ChevronDown, Plus } from '@/assets/icon';
import Button from './button';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

export function TodoList({ 
  tasks, 
  filter, 
  onFilterChange, 
  onToggleDone, 
  onToggleImportant, 
  onEdit, 
  onDelete,
  onRename,
  onAddNew 
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = [
    { value: 'none', label: 'All Tasks' },
    { value: 'important', label: 'Important' },
    { value: 'today', label: 'Today' },
    { value: 'this week', label: 'This Week' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'done', label: 'Done' }
  ];

  const getCurrentFilterLabel = () => {
    const current = filterOptions.find(opt => opt.value === filter);
    return current ? current.label : 'All Tasks';
  };

  const handleFilterSelect = (value) => {
    onFilterChange(value);
    setIsFilterOpen(false);
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.listHeader}>
        <div className={styles.filterContainer}>
          <button
            className={styles.filterButton}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="normal-text">{getCurrentFilterLabel()}</span>
            <ChevronDown 
              size={20} 
              className={`${styles.filterIcon} ${isFilterOpen ? styles.rotated : ''}`}
            />
          </button>

          {isFilterOpen && (
            <div className={styles.filterDropdown}>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.filterOption} ${filter === option.value ? styles.selected : ''}`}
                  onClick={() => handleFilterSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button type="black" onClick={onAddNew}>
          <Plus size={20} />
          <span>Add New</span>
        </Button>
      </div>

      <div className={styles.tasksContainer}>
        {tasks.length === 0 ? (
          <div className={styles.emptyState}>
            <p className="normal-text">No tasks found</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggleDone={onToggleDone}
              onToggleImportant={onToggleImportant}
              onEdit={onEdit}
              onDelete={onDelete}
              onRename={onRename}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;