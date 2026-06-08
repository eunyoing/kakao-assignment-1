import { useState } from "react";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() === "") return;
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type='checkbox'
        className='todo-checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {isEditing ? (
        <>
          <input
            type='text'
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className='todo-edit-input'
          />
          <div className='button-group'>
            <button onClick={handleSave} className='btn btn-save'>
              저장
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className='btn btn-delete'
            >
              삭제
            </button>
          </div>
        </>
      ) : (
        <>
          <span className='todo-text'>{todo.text}</span>
          <div className='button-group'>
            <button onClick={() => setIsEditing(true)} className='btn btn-edit'>
              수정
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className='btn btn-delete'
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
