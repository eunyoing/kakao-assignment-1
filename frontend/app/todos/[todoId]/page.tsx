"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditTodoPage(props: {
  params: Promise<{ todoId: string }>;
}) {
  const params = use(props.params);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8000/todos`)
      .then((res) => res.json())
      .then((todos) => {
        const todo = todos.find(
          (t: { id: number }) => t.id === Number(params.todoId),
        );
        if (todo) {
          setTitle(todo.title);
          setCompleted(todo.completed);
        }
      });
  }, [params.todoId]);

  async function handleUpdate() {
    if (!title.trim()) {
      setError(true);
      return;
    }
    await fetch(`http://localhost:8000/todos/${params.todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed }),
    });
    router.push("/todos");
  }

  async function handleDelete() {
    await fetch(`http://localhost:8000/todos/${params.todoId}`, {
      method: "DELETE",
    });
    router.push("/todos");
  }

  return (
    <main>
      <h2 className='text-lg font-bold text-gray-700 mb-4'>✏️ 할 일 수정</h2>
      <div className='flex gap-2 mb-1'>
        <input
          type='text'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(false);
          }}
          className='flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-yellow-400 bg-gray-50 focus:bg-white transition-all'
        />
      </div>
      {error && (
        <p className='text-sm text-red-500 pl-1 mb-2'>할 일을 입력해주세요!</p>
      )}

      <div className='flex items-center gap-2 mb-4 mt-2'>
        <input
          type='checkbox'
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          id='completed'
          className='w-5 h-5 accent-yellow-400 cursor-pointer'
        />
        <label htmlFor='completed' className='text-sm text-gray-700'>
          완료됨
        </label>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={handleUpdate}
          className='flex-1 px-4 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 active:scale-95 transition-all'
        >
          저장하기
        </button>
        <button
          onClick={handleDelete}
          className='flex-1 px-4 py-3 bg-red-100 text-red-500 font-bold rounded-xl hover:bg-red-200 active:scale-95 transition-all'
        >
          삭제하기
        </button>
      </div>

      <Link
        href='/todos'
        className='mt-4 block text-center text-sm text-gray-400 hover:text-gray-600'
      >
        ← 목록으로 돌아가기
      </Link>
    </main>
  );
}
