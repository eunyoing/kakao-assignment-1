import Link from "next/link";

async function getTodos() {
  const res = await fetch("http://localhost:8000/todos", { cache: "no-store" });
  if (!res.ok) throw new Error("Todo 목록을 불러오지 못했습니다");
  return res.json();
}

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-bold text-gray-700'>📋 할 일 목록</h2>
        <Link
          href='/todos/new'
          className='px-5 py-2 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 active:scale-95 transition-all'
        >
          + 추가
        </Link>
      </div>

      {todos.length === 0 ? (
        <div className='flex flex-col items-center py-10 text-gray-400'>
          <img
            className='w-40 h-40 object-contain rounded-2xl mb-3'
            src='https://i.namu.wiki/i/rBVUKzbEhG-vgEU7lZirErWrNyTm_TRS4_Y2O_dOBlZy6H3DnF85BZL7voglz5hPViUrqL8DqpP19w_Ofl7A6Q.gif'
            alt='빈 상태'
          />
          <p className='text-sm'>할 일이 없어요🤔</p>
        </div>
      ) : (
        <ul className='flex flex-col gap-3'>
          {todos.map(
            (todo: { id: number; title: string; completed: boolean }) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 transition-all
                ${todo.completed ? "bg-gray-100 border-gray-200" : "bg-gray-50 border-gray-200 hover:shadow-md"}`}
              >
                <span
                  className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}
                >
                  {todo.title}
                </span>
                <Link
                  href={`/todos/${todo.id}`}
                  className='px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300'
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
