import './App.css'

export default function App() {
  return (
    <></>
  )
}

/* 
### this project has Layered Architecture:
  - Presentation/ components & controller
  - Application/ service
  - Domain/ model
  - Infrastructure/ (localStorage) be grouped with Application/ service

---

### The TodoTask database schema

type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly'

type TagType = 'none' | 'important' | 'today' | 'this week' | 'overdue' | 'done'

interface Task {
  id: number;
  taskName: string;
  dueDate?: Date;
  repeat?: RepeatType;
  tags?: TagType[];
}
*/