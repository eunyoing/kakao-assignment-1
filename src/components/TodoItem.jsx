import { useState } from "react";

function TodoItem({ todo, onDelete, onToggle, onEdit, validate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!validate(editText)) return;
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  return (
    <li
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all
      ${
        todo.completed
          ? "bg-gray-100 border-gray-200"
          : "bg-gray-50 border-gray-200 hover:shadow-md"
      }`}
    >
      {/* 체크박스 */}
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className='w-5 h-5 accent-yellow-400 cursor-pointer'
      />

      {isEditing ? (
        <>
          {/* 수정 입력창 */}
          <input
            type='text'
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className='flex-1 px-2 py-1 border-2 border-yellow-400 rounded-lg text-sm outline-none'
          />
          <div className='flex gap-2'>
            <button
              onClick={handleSave}
              className='px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-medium rounded-lg hover:bg-yellow-300'
            >
              저장
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className='px-3 py-1 bg-red-100 text-red-500 text-sm font-medium rounded-lg hover:bg-red-200'
            >
              삭제
            </button>
          </div>
        </>
      ) : (
        <>
          {/* 할일 텍스트 */}
          <span
            className={`flex-1 text-sm
            ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}
          >
            {todo.text}
          </span>
          <div className='flex gap-2'>
            <button
              onClick={() => setIsEditing(true)}
              className='px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300'
            >
              수정
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className='px-3 py-1 bg-red-100 text-red-500 text-sm font-medium rounded-lg hover:bg-red-200'
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
