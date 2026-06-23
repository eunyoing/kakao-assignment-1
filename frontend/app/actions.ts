"use server";

const BACKEND_URL = "http://localhost:8000";

export async function getTodos() {
  const res = await fetch(`${BACKEND_URL}/todos`, { cache: "no-store" });
  if (!res.ok) throw new Error("Todo 목록을 불러오지 못했습니다");
  return res.json();
}

export async function createTodo(title: string) {
  const res = await fetch(`${BACKEND_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!res.ok) throw new Error("Todo 생성에 실패했습니다");
  return res.json();
}

export async function updateTodo(
  id: number,
  title: string,
  completed: boolean,
) {
  const res = await fetch(`${BACKEND_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed }),
  });
  if (!res.ok) throw new Error("Todo 수정에 실패했습니다");
  return res.json();
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${BACKEND_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Todo 삭제에 실패했습니다");
  return res.json();
}
