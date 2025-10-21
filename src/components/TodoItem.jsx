/// ./src/components/TodoItem.jsx

// To be duplicated in `TodoList.jsx`

/*
=== UX/UI description ===

### It presents
- Dont-icon/Undone-icon (`lucide-react`)
- Star-icon/Unstar-icon (`lucide-react`)
- TaskName (`.normal-text`)
- Detail (`.tiny-text`, below TaskName, show due date & repeat type)
- Edit-icon (`lucide-react`, to open TodoForm.jsx for task edit)
- Delete-icon (`lucide-react`, to delete task)

### Its Effect
- Item::Normal (`black border`, `white background`, display Star-icon, TaskName)
- Item::Normal with `Overdue` state (`red border`, `light-red background`)
- Item::Hover (`shadow with light-border-color`, display Edit-icon, Delete-icon)
- Icon::Hover (`round gray background`, highlight icon when hover)

### Its Logic
- Done-icon/Undone-icon -> mark/unmark done value
- Star-icon/Unstar-icon -> mark/unmark important value
- Double click TaskName -> rename task
- Edit-icon -> open floating card `TodoForm.jsx`
- Delete-icon -> delete task
*/

import { useState } from 'react';
import { Check, Circle, Star, Edit, Trash2 } from '@/assets/icon';

export function TodoItem({ task, onToggleDone, onToggleImportant, onEdit, onDelete, onRename }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.taskName);

  const isOverdue = task.tags?.includes('overdue');

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDetailText = () => {
    const parts = [];
    
    if (task.dueDate) {
      parts.push(`Due: ${formatDate(task.dueDate)}`);
    }
    
    if (task.repeat && task.repeat !== 'none') {
      parts.push(`Repeat: ${task.repeat}`);
    }
    
    return parts.join(' • ');
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveRename();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(task.taskName);
    }
  };

  const handleSaveRename = () => {
    if (editValue.trim() && editValue !== task.taskName) {
      onRename(task.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const itemClassName = `todo-item ${isOverdue ? 'todo-item-overdue' : ''} ${task.isDone ? 'todo-item-done' : ''}`;

  return (
    <div
      className={itemClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="icon-button"
        onClick={() => onToggleDone(task.id)}
        title={task.isDone ? 'Mark as undone' : 'Mark as done'}
      >
        {task.isDone ? <Check size={20} /> : <Circle size={20} />}
      </button>

      <button
        className="icon-button"
        onClick={() => onToggleImportant(task.id)}
        title={task.isImportant ? 'Remove from important' : 'Mark as important'}
      >
        <Star
          size={20}
          fill={task.isImportant ? 'currentColor' : 'none'}
        />
      </button>

      <div className="task-content" onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input
            type="text"
            className="task-edit-input normal-text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveRename}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <>
            <div className="task-name normal-text">{task.taskName}</div>
            {getDetailText() && (
              <div className="task-detail tiny-text">{getDetailText()}</div>
            )}
          </>
        )}
      </div>

      <div className={`task-actions ${isHovered ? 'visible' : ''}`}>
        <button
          className="icon-button"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <Edit size={20} />
        </button>

        <button
          className="icon-button"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;