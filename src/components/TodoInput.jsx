import { useState } from "react";

function TodoInput({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = () => {
    if (text.trim() === "") {
      setError(true);
      return;
    }
    onAdd(text.trim());
    setText("");
    setError(false);
  };

  return (
    <div className='input-section'>
      <div className='input-wrapper'>
        <input
          type='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder='할 일을 입력해주세요'
          className='todo-input'
        />
        <button onClick={handleAdd} className='add-button'>
          + 추가
        </button>
      </div>
      {error && <p className='error-message'>할 일을 입력해주세요!</p>}
    </div>
  );
}

export default TodoInput;
