# Todo App

A modern, feature-rich **todo-app** built with React and Vite, implementing a clean layered architecture pattern.

## Features

- Create, edit, and delete tasks
- Mark tasks as important
- Set due dates with DD/MM/YYYY format
- Recurring tasks (daily, weekly, monthly)
- Filtering (Important, Today, This Week, Overdue, Done)
- Local storage persistence

## Tech Stack

- **Framework**: Vite/React
- **Language**: JavaScript
- **Icons**: lucide-react
- **Storage**: localStorage
- **Linting**: ESLint

## Architecture

This project follows a **Layered Architecture** pattern:

```
├── Presentation/        # Components & Controllers
│   ├── components/
│   └── todo.controller.js
├── Application/         # Services & Infrastructure
│   └── todo.service.js
├── Domain/             # Models
│   └── todo.model.js
└── Infrastructure/     # localStorage (grouped with Application)
```

## Data Schema

```typescript
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

## Project Structure

```
todo-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── icon.ts              # SVG exports
│   ├── components/
│   │   ├── button.jsx           # Reusable button component
│   │   ├── TodoForm.jsx         # Add/Edit task form
│   │   ├── TodoItem.jsx         # Individual task item
│   │   └── TodoList.jsx         # Task list with filters
│   ├── todo.controller.js       # Presentation layer
│   ├── todo.service.js          # Business logic & storage
│   ├── todo.model.js            # Data models
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App-specific styles
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles & CSS variables
├── index.html
├── package.json
└── vite.config.js
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Adding a Task
1. Click the "Add New" button
2. Fill in the task name (required)
3. Optionally set due date, repeat frequency, and importance
4. Click "Complete" to save

### Editing a Task
1. Hover over a task to reveal the edit icon
2. Click the edit icon to open the form
3. Modify task details
4. Click "Complete" to save changes

### Filtering Tasks
Use the filter dropdown to view:
- **Important**: Tasks marked with a star
- **Today**: Tasks due today
- **This Week**: Tasks due within the current week
- **Overdue**: Tasks past their due date
- **Done**: Completed tasks

### Task Priority
Tasks are automatically sorted by priority:
1. Overdue (red border, light-red background)
2. Important (starred)
3. Due date

### Recurring Tasks
Tasks with repeat settings will automatically update their due date after completion:
- **Daily**: Due date advances by 1 day
- **Weekly**: Due date advances by 7 days
- **Monthly**: Due date advances by 1 month

## Development

### Path Alias
The project uses `@/` as an alias for `./src/` directory.

### CSS Organization
- `index.css`: CSS variables, fonts (Montserrat), base reset
- `App.css`: Layout, component-specific classes and responsive base

### Component Guidelines
- Components use `.normal-text` for standard text
- Use `.tiny-text` for smaller details
- Icons from `lucide-react` for consistency
- Hover effects with transitions for better UX

## Pipeline

1. Fork the repository
2. Create **new-feature** branch (`git checkout -b feature/AmazingFeature`)
3. Commit **new-feature** changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request