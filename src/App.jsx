/// ./src/App.jsx

/* 
### this project has Layered Architecture:
- Presentation/ components & controller
- Application/ service
- Domain/ model
- Infrastructure/ (localStorage) be grouped with Application/ service

### The TodoTask database schema
```js
type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly'

type TagType = 'none' | 'important' | 'today' | 'this week' | 'overdue' | 'done'

interface Task {
  id: number;
  taskName: string;
  dueDate?: Date;
  repeat?: RepeatType;
  tags?: TagType[];
}
```

### Bonus: Alias
> `@/` means `./src/`

### TechStack:
- Vite/React
- JavaScript
- lucide-react
- ESLint
*/

import './App.css'
import { useTodoController } from './todo.controller'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import logotext from './assets/logotext.svg'

export default function App() {
  const {
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
  } = useTodoController();

  const handleFormComplete = (taskData) => {
    if (editingTask) {
      handleUpdateTask(editingTask.id, taskData);
    } else {
      handleAddTask(
        taskData.taskName,
        taskData.dueDate,
        taskData.repeat,
        taskData.isImportant
      );
    }
  };

  const handleRename = (id, newName) => {
    handleUpdateTask(id, { taskName: newName });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Todo App</h1>
        <div className="app-subtitle-container"> 
          <h4 className="app-subtitle">by<img className="app-logotext" src={logotext} /></h4>
        </div>
      </header>

      <main className="app-main">
        <TodoList
          tasks={tasks}
          filter={filter}
          onFilterChange={handleFilterChange}
          onToggleDone={handleToggleDone}
          onToggleImportant={handleToggleImportant}
          onEdit={handleOpenEditForm}
          onDelete={handleDeleteTask}
          onRename={handleRename}
          onAddNew={handleOpenAddForm}
        />
      </main>

      {isFormOpen && (
        <TodoForm
          task={editingTask}
          onComplete={handleFormComplete}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  )
}
