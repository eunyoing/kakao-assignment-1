import Header from "./components/Header";
import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import Calendar, { formatDateKey } from "./components/Calendar";

function App() {
  // todos(기존 할일 목록) 변수와 , setTodos 함수를 react 가 자동으로 만들어준다.
  // 앱 처음 켤 때 브라우저에서 불러온다!
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeFilter, setActiveFilter] = useState("all");
  // 선택된 날짜 상태 (처음엔 오늘 날짜)
  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()));

  //✨todos가 바뀔때마다 브라우저에 저장한다.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 할 일을 추가하는 함수이다.
  const addTodo = (text) => {
    //text에 할 일 이 들어오면
    const newTodo = {
      id: Date.now(), //고유한 숫자 ID
      text, //입력한 text
      completed: false, // 완료 했는지 여부 : 미완료
      date: selectedDate, // 현재 선택된 날짜 저장
    };
    setTodos([...todos, newTodo]); // ...todos (기존 할일 목록 펼치기)에 newTodo를 합치기
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  };

  // 선택된 날짜 + 필터 적용
  const filteredTodos = todos
    .filter((t) => t.date === selectedDate)
    .filter((t) => {
      if (activeFilter === "active") return !t.completed;
      if (activeFilter === "completed") return t.completed;
      return true;
    });

  return (
    <div className='app-container'>
      <Header />
      {/* Calendar 컴포넌트 */}
      <Calendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        todos={todos}
      />
      {/* TodoFilter 컴포넌트 */}
      <TodoFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      {/* TodoInput 컴포넌트 */}
      <TodoInput onAdd={addTodo} />
      {/* TodoList 컴포넌트 activeFilter 추가되었음 */}
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onToggle={toggleComplete}
        onEdit={editTodo}
        activeFilter={activeFilter}
      />
    </div>
  );
}

export default App;
