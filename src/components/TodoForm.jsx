/// ./src/components/TodoForm.jsx

// Used for both `Add New` form and `Edit` form, just distinguish the action by using a specific field value in database.

/*
=== UX/UI description ===

### It is a floating card, has input fields for:
- Done-icon/Undone-icon (`lucide-react`)
- TaskName (`.normal-text`)
- Star-icon/Unstar-icon (`lucide-react`)
- Due date (`.normal-text`, DD/MM/YYYY)
- Repeat (`.normal-text`, daily/weekly/monthly)
- Cancel/Complete button (`<button />` has black border, `Cancel` has white background, `Complete` has black background)

### Its effect
- background dim (when opened and floating)

### Its Logic
- `Add New` -> `Complete` -> new task saved in localStorage
- `Add New` -> `Cancel` -> do nothing
- `Edit` -> `Complete` -> update task saved in localStorage
- `Edit` -> `Cancel` -> do nothing
- TaskName -> required to fill
- Done-icon/Undone-icon -> mark/unmark done value
- Star-icon/Unstar-icon -> mark/unmark important value
- Due date -> time related value (today/this week/overdue/due)
- Repeat -> on date calculation (rewrite its due date after each time done)
*/

import { useState, useEffect } from 'react';
import { Check, Circle, Star } from '@/assets/icon';
import Button from './button';

export function TodoForm({ task, onComplete, onCancel }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [repeat, setRepeat] = useState('none');
  const [isDone, setIsDone] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName);
      setDueDate(task.dueDate ? formatDateForInput(task.dueDate) : '');
      setRepeat(task.repeat || 'none');
      setIsDone(task.isDone || false);
      setIsImportant(task.isImportant || false);
    }
  }, [task]);

  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      alert('Task name is required');
      return;
    }

    const taskData = {
      taskName: taskName.trim(),
      dueDate: dueDate ? new Date(dueDate) : null,
      repeat,
      isDone,
      isImportant
    };

    onComplete(taskData);
  };

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-card" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <button
              type="button"
              className="icon-button"
              onClick={() => setIsDone(!isDone)}
              title={isDone ? 'Mark as undone' : 'Mark as done'}
            >
              {isDone ? <Check size={24} /> : <Circle size={24} />}
            </button>
            
            <input
              type="text"
              className="task-input normal-text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              autoFocus
            />
            
            <button
              type="button"
              className="icon-button"
              onClick={() => setIsImportant(!isImportant)}
              title={isImportant ? 'Remove from important' : 'Mark as important'}
            >
              <Star
                size={24}
                fill={isImportant ? 'currentColor' : 'none'}
              />
            </button>
          </div>

          <div className="form-row">
            <label className="form-label normal-text">Due date:</label>
            <input
              type="date"
              className="date-input normal-text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            {dueDate && (
              <span className="date-display normal-text">
                {formatDateForDisplay(dueDate)}
              </span>
            )}
          </div>

          <div className="form-row">
            <label className="form-label normal-text">Repeat:</label>
            <select
              className="repeat-select normal-text"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="form-actions">
            <Button type="white" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="black" onClick={handleSubmit}>
              Complete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;