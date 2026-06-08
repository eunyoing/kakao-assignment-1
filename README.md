# 춘식이의 일정 - React Todo App

## 프로젝트 소개

Vanilla JS로 만든 Todo 앱을 React로 마이그레이션한 프로젝트입니다.

## 사용 기술

- React 18
- Vite
- Tailwind CSS v4
- LocalStorage

## 구현 기능

- Todo 추가 / 수정 / 삭제 / 완료 처리
- 빈 입력값 제출 시 에러 메시지 표시
- 전체 / 진행 중 / 완료 상태별 필터링
- 날짜별 Todo 관리 (이전/다음 날짜 이동)
- LocalStorage 연동으로 새로고침 후에도 데이터 유지

## Vanilla JS와 React 비교

| 기능          | Vanilla JS             | React                          |
| ------------- | ---------------------- | ------------------------------ |
| 화면 업데이트 | DOM 직접 조작          | 상태 변경 시 자동 렌더링       |
| 수정 UI       | `prompt()` 팝업        | `isEditing` 상태로 인라인 전환 |
| 필터링        | DOM 직접 숨기기/보이기 | 필터 상태만 바꾸면 자동 반영   |
| 저장          | 함수마다 직접 호출     | `useEffect` 로 자동 저장       |

## 어려웠던 점

### 1. 컴포넌트 간 데이터 흐름 이해

여러 `.jsx` 파일을 왔다갔다하면서 다른 파일의 함수를 props로 전달하는 흐름이 처음에는 이해하기 어려웠습니다. 하지만 어떤 컴포넌트에 어떤 역할이 있는지 파악하고 나니 구조가 명확하게 보였습니다.

### 2. CSS 적용 문제

JSX 파일에 Tailwind 클래스가 하드코딩되어 있어서 외부 CSS 파일을 수정해도 스타일이 반영되지 않는 문제가 있었습니다. Tailwind 클래스를 CSS 클래스 이름으로 변경한 후 해결했습니다.

## 파일 구조

```
src/
├── components/
│   ├── Header.jsx
│   ├── Calendar.jsx
│   ├── TodoFilter.jsx
│   ├── TodoInput.jsx
│   ├── TodoList.jsx
│   └── TodoItem.jsx
└── App.jsx
```
