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