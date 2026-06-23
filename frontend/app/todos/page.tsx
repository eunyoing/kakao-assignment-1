import Link from "next/link";

async function getTodos() {
  const res = await fetch("http://localhost:8000/todos", { cache: "no-store" });
  if (!res.ok) throw new Error("Todo 목록을 불러오지 못했습니다");
  return res.json();
}

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main className='max-w-xl mx-auto mt-10 p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>📝 Todo 목록</h1>
        <Link
          href='/todos/new'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          + 추가
        </Link>
      </div>

      {todos.length === 0 ? (
        <p className='text-gray-400 text-center mt-10'>할 일이 없어요!</p>
      ) : (
        <ul className='space-y-2'>
          {todos.map(
            (todo: { id: number; title: string; completed: boolean }) => (
              <li
                key={todo.id}
                className='flex justify-between items-center border p-3 rounded'
              >
                <span
                  className={todo.completed ? "line-through text-gray-400" : ""}
                >
                  {todo.title}
                </span>
                <Link
                  href={`/todos/${todo.id}`}
                  className='text-sm text-blue-500 hover:underline'
                >
                  수정
                </Link>
              </li>
            ),
          )}
        </ul>
      )}
    </main>
  );
}
