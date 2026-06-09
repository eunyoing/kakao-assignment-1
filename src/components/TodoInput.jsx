import { useState } from "react";

function TodoInput({ onAdd, validate }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = () => {
    if (!validate(text)) {
      setError(true);
      return;
    }
    onAdd(text.trim());
    setText("");
    setError(false);
  };

  return (
    <div className='mb-4'>
      <div className='flex gap-2'>
        <input
          type='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder='할 일을 입력해주세요'
          className='flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-yellow-400 bg-gray-50 focus:bg-white transition-all'
        />
        <button
          onClick={handleAdd}
          className='px-5 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 active:scale-95 transition-all whitespace-nowrap'
        >
          + 추가
        </button>
      </div>
      {error && (
        <p className='mt-2 text-sm text-red-500 pl-1'>할 일을 입력해주세요!</p>
      )}
    </div>
  );
}

export default TodoInput;
