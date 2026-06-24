"use client";
import { createTodo } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewTodoPage() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!title.trim()) {
      setError(true);
      return;
    }

    await createTodo(title);

    router.push("/todos");
  }

  return (
    <main>
      <h2 className='text-lg font-bold text-gray-700 mb-4'>✏️ 새 할 일 추가</h2>
      <div className='flex gap-2 mb-1'>
        <input
          type='text'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder='할 일을 입력해주세요'
          className='flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-yellow-400 bg-gray-50 focus:bg-white transition-all'
        />
        <button
          onClick={handleSubmit}
          className='px-5 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 active:scale-95 transition-all'
        >
          + 추가
        </button>
      </div>
      {error && (
        <p className='text-sm text-red-500 pl-1 mb-2'>할 일을 입력해주세요!</p>
      )}
      <Link
        href='/todos'
        className='mt-4 block text-center text-sm text-gray-400 hover:text-gray-600'
      >
        ← 목록으로 돌아가기
      </Link>
    </main>
  );
}
