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