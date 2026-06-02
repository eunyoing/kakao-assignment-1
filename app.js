// ===== DOM 요소 =====
const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const errorMessage = document.getElementById("errorMessage");
const emptyState = document.getElementById("emptyState");
const prevWeekButton = document.getElementById("prevWeekButton");
const nextWeekButton = document.getElementById("nextWeekButton");
const weekGrid = document.getElementById("weekGrid");
const selectedDateDisplay = document.getElementById("selectedDateDisplay");
const filterButtons = document.querySelectorAll(".filter-btn");

// 뷰 전환
const weekViewBtn = document.getElementById("weekViewBtn");
const monthViewBtn = document.getElementById("monthViewBtn");
const weekView = document.getElementById("weekView");
const monthView = document.getElementById("monthView");
const prevMonthButton = document.getElementById("prevMonthButton");
const nextMonthButton = document.getElementById("nextMonthButton");
const monthTitle = document.getElementById("monthTitle");
const monthGrid = document.getElementById("monthGrid");

// 소감 일기
const speechBubble = document.getElementById("speechBubble");
const diaryText = document.getElementById("diaryText");
const diaryEditBtn = document.getElementById("diaryEditBtn");
const diaryInputWrapper = document.getElementById("diaryInputWrapper");
const diaryInput = document.getElementById("diaryInput");
const diarySaveBtn = document.getElementById("diarySaveBtn");

// ===== 상태 변수 =====
let todos = loadTodosFromStorage();
let diaries = loadDiariesFromStorage(); // 날짜별 소감 저장
let selectedDate = formatDateKey(new Date());
let weekOffset = 0;
let monthOffset = 0; // 월간 뷰 오프셋
let activeFilter = "all";
let currentView = "week"; // 'week' | 'month'

// ===== 날짜 유틸 =====

function formatDateKey(date) {
  return date.toLocaleDateString("sv-SE");
}

function formatDateDisplay(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function getMondayOfWeek(offset) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + offset * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getWeekDates(offset) {
  const monday = getMondayOfWeek(offset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return formatDateKey(d);
  });
}

// ===== 로컬스토리지 =====

function saveTodosToStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromStorage() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

// 소감(diary)도 날짜를 key로 객체에 저장
function saveDiariesToStorage() {
  localStorage.setItem("diaries", JSON.stringify(diaries));
}

function loadDiariesFromStorage() {
  return JSON.parse(localStorage.getItem("diaries")) || {};
}

// ===== 소감 렌더링 =====
// 선택된 날짜의 소감을 말풍선에 표시
function renderDiary() {
  const text = diaries[selectedDate];
  if (text) {
    // 소감이 있으면 텍스트 + 수정 + 삭제 버튼
    diaryText.textContent = text;

    // 삭제 버튼이 없으면 추가
    if (!document.getElementById("diaryDeleteBtn")) {
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "diary-edit-btn";
      deleteBtn.id = "diaryDeleteBtn";
      deleteBtn.textContent = "🗑️";
      deleteBtn.addEventListener("click", deleteDiary);
      speechBubble.appendChild(deleteBtn);
    }
  } else {
    // 소감 없으면 기본 텍스트, 삭제 버튼 제거
    diaryText.textContent = "오늘 하루 어때요?";
    const deleteBtn = document.getElementById("diaryDeleteBtn");
    if (deleteBtn) deleteBtn.remove();
  }
}

function deleteDiary() {
  delete diaries[selectedDate];
  saveDiariesToStorage();
  renderDiary();
  diaryInputWrapper.classList.add("hidden");
}

// ===== 소감 저장 =====
function saveDiary() {
  const text = diaryInput.value.trim();
  if (text === "") return;

  diaries[selectedDate] = text; // 날짜를 키로 소감 저장
  saveDiariesToStorage();
  renderDiary();

  // 입력창 닫기
  diaryInputWrapper.classList.add("hidden");
  diaryInput.value = "";
}

// ===== ID 생성 =====
function generateId() {
  return Date.now();
}

// ===== Todo CRUD =====

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") {
    errorMessage.classList.remove("hidden");
    todoInput.focus();
    return;
  }
  errorMessage.classList.add("hidden");

  todos.push({ id: generateId(), text, completed: false, date: selectedDate });
  todoInput.value = "";
  saveTodosToStorage();
  renderCalendar();
  renderTodoList();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodosToStorage();
  renderCalendar();
  renderTodoList();
}

function toggleComplete(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t,
  );
  saveTodosToStorage();
  renderCalendar();
  renderTodoList();
}

function enableEditMode(id) {
  const item = document.querySelector(`[data-id="${id}"]`);
  const span = item.querySelector(".todo-text");
  const btns = item.querySelector(".button-group");

  const input = document.createElement("input");
  input.type = "text";
  input.className = "todo-edit-input";
  input.value = span.textContent;
  span.replaceWith(input);
  input.focus();

  btns.innerHTML = `
    <button class="btn btn-save" onclick="saveEdit(${id})">저장</button>
    <button class="btn btn-delete" onclick="deleteTodo(${id})">삭제</button>
  `;
}

function saveEdit(id) {
  const item = document.querySelector(`[data-id="${id}"]`);
  const input = item.querySelector(".todo-edit-input");
  const newText = input.value.trim();
  if (newText === "") {
    input.focus();
    return;
  }

  todos = todos.map((t) => (t.id === id ? { ...t, text: newText } : t));
  saveTodosToStorage();
  renderTodoList();
}

// ===== 날짜 선택 =====
function selectDate(dateKey) {
  selectedDate = dateKey;
  renderCalendar();
  renderSelectedDate();
  renderTodoList();
  renderDiary(); // 날짜 바뀌면 소감도 업데이트
  // 소감 입력창 닫기
  diaryInputWrapper.classList.add("hidden");
}

// ===== 캘린더 렌더링 (뷰에 따라 분기) =====
function renderCalendar() {
  if (currentView === "week") {
    renderWeekGrid();
  } else {
    renderMonthGrid();
  }
}

// ===== 주간 그리드 렌더링 =====
function renderWeekGrid() {
  const weekDates = getWeekDates(weekOffset);
  const todayKey = formatDateKey(new Date());
  const DAY_NAMES = ["월", "화", "수", "목", "금", "토", "일"];

  weekGrid.innerHTML = "";

  weekDates.forEach((dateKey, index) => {
    const [, , day] = dateKey.split("-").map(Number);
    const count = todos.filter((t) => t.date === dateKey).length;

    const cell = document.createElement("div");
    cell.className = "day-cell";
    if (dateKey === todayKey) cell.classList.add("today");
    if (dateKey === selectedDate) cell.classList.add("selected");
    if (index === 6) cell.classList.add("sunday");
    if (index === 5) cell.classList.add("saturday");

    cell.innerHTML = `
      <span class="day-name">${DAY_NAMES[index]}</span>
      <span class="day-number">${day}</span>
      <span class="day-count">${count}</span>
    `;
    cell.addEventListener("click", () => selectDate(dateKey));
    weekGrid.appendChild(cell);
  });
}

// ===== 월간 그리드 렌더링 =====
function renderMonthGrid() {
  const today = new Date();
  // monthOffset 기준 해당 월 계산
  const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = base.getFullYear();
  const month = base.getMonth(); // 0-indexed

  // 제목 업데이트
  monthTitle.textContent = `${year}년 ${month + 1}월`;

  const todayKey = formatDateKey(new Date());
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 월요일 시작 기준 첫 날의 요일 오프셋 계산
  // getDay(): 0(일)~6(토) → 월요일 기준으로 변환
  const startOffset = (firstDay.getDay() + 6) % 7;

  monthGrid.innerHTML = "";

  // 빈 셀 (이전 달)
  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "month-cell empty";
    monthGrid.appendChild(empty);
  }

  // 날짜 셀
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateKey = formatDateKey(new Date(year, month, d));
    const count = todos.filter((t) => t.date === dateKey).length;
    const dayOfWeek = new Date(year, month, d).getDay(); // 0(일)~6(토)

    const cell = document.createElement("div");
    cell.className = "month-cell";
    if (dateKey === todayKey) cell.classList.add("today");
    if (dateKey === selectedDate) cell.classList.add("selected");
    if (dayOfWeek === 0) cell.classList.add("sunday");
    if (dayOfWeek === 6) cell.classList.add("saturday");

    cell.innerHTML = `
      <span>${d}</span>
      ${count > 0 ? '<div class="month-dot"></div>' : ""}
    `;
    cell.addEventListener("click", () => selectDate(dateKey));
    monthGrid.appendChild(cell);
  }
}

// ===== 선택된 날짜 텍스트 =====
function renderSelectedDate() {
  const todayKey = formatDateKey(new Date());
  selectedDateDisplay.textContent = formatDateDisplay(selectedDate);
  if (selectedDate === todayKey) {
    selectedDateDisplay.classList.add("is-today");
  } else {
    selectedDateDisplay.classList.remove("is-today");
  }
}

// ===== Todo 목록 렌더링 =====
function renderTodoList() {
  todoList.innerHTML = "";

  const todosForDate = todos.filter((t) => t.date === selectedDate);
  const filtered = todosForDate.filter((t) => {
    if (activeFilter === "active") return !t.completed;
    if (activeFilter === "completed") return t.completed;
    return true;
  });

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    if (activeFilter === "completed") {
      emptyState.innerHTML = `
        <img class="empty-video" src="https://i.namu.wiki/i/rj0cRXAlfY55BFjhK4Wt5AMJ9Y1YQYLlrNs5vvxYQ6p6XtFrwjdKp6XRXgL6Y6FANaIKyjvhs14HJALLUKEsqQ.gif" alt="달성" />
        <p>아직 할 일이 많은가요? 😥 조금만 힘내요!</p>
      `;
    } else if (activeFilter === "active") {
      emptyState.innerHTML = `
        <img class="empty-video" src="https://i.namu.wiki/i/qVwTXtV7j-sRogzkSGBTiTroRM6KETKka_xUvJIDHYcIOVjGCEQkrpGoaW-_sCQTZS-Nih1eNjJJ9kFhcRfcTA.gif" alt="할일없음" />
        <p>해야 할 일을 다 하셨군요🎉 수고하셨습니다✨</p>
      `;
    } else {
      emptyState.innerHTML = `
        <img class="empty-video" src="https://i.namu.wiki/i/rBVUKzbEhG-vgEU7lZirErWrNyTm_TRS4_Y2O_dOBlZy6H3DnF85BZL7voglz5hPViUrqL8DqpP19w_Ofl7A6Q.gif" alt="비어있음" />
        <p>할 일이 없어요🤔</p>
      `;
    }
  } else {
    emptyState.classList.add("hidden");
  }

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;
    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox"
        ${todo.completed ? "checked" : ""}
        onchange="toggleComplete(${todo.id})" />
      <span class="todo-text">${todo.text}</span>
      <div class="button-group">
        <button class="btn btn-edit" onclick="enableEditMode(${todo.id})">수정</button>
        <button class="btn btn-delete" onclick="deleteTodo(${todo.id})">삭제</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// ===== 이벤트 리스너 =====

// Todo 추가
addButton.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});
todoInput.addEventListener("input", () => {
  if (todoInput.value.trim()) errorMessage.classList.add("hidden");
});

// 주간 이전/다음
prevWeekButton.addEventListener("click", () => {
  weekOffset--;
  renderWeekGrid();
});
nextWeekButton.addEventListener("click", () => {
  weekOffset++;
  renderWeekGrid();
});

// 월간 이전/다음
prevMonthButton.addEventListener("click", () => {
  monthOffset--;
  renderMonthGrid();
});
nextMonthButton.addEventListener("click", () => {
  monthOffset++;
  renderMonthGrid();
});

// 뷰 전환 (주간 ↔ 월간)
weekViewBtn.addEventListener("click", () => {
  currentView = "week";
  weekViewBtn.classList.add("active");
  monthViewBtn.classList.remove("active");
  weekView.classList.remove("hidden");
  monthView.classList.add("hidden");
  renderWeekGrid();
});

monthViewBtn.addEventListener("click", () => {
  currentView = "month";
  monthViewBtn.classList.add("active");
  weekViewBtn.classList.remove("active");
  monthView.classList.remove("hidden");
  weekView.classList.add("hidden");
  renderMonthGrid();
});

// 필터 탭
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderTodoList();
  });
});

// 소감 수정 버튼 클릭 → 입력창 토글
diaryEditBtn.addEventListener("click", () => {
  diaryInputWrapper.classList.toggle("hidden");
  if (!diaryInputWrapper.classList.contains("hidden")) {
    // 기존 소감 불러오기
    diaryInput.value = diaries[selectedDate] || "";
    diaryInput.focus();
  }
});

// 소감 저장 버튼
diarySaveBtn.addEventListener("click", saveDiary);

// Enter 키로 소감 저장
diaryInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveDiary();
});

// ===== 초기화 =====
renderWeekGrid();
renderSelectedDate();
renderTodoList();
renderDiary();
