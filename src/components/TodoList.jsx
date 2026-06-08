import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle, onEdit, activeFilter }) {
  if (todos.length === 0) {
    const emptyContent = {
      completed: {
        gif: "https://i.namu.wiki/i/rj0cRXAlfY55BFjhK4Wt5AMJ9Y1YQYLlrNs5vvxYQ6p6XtFrwjdKp6XRXgL6Y6FANaIKyjvhs14HJALLUKEsqQ.gif",
        text: "아직 할 일이 많은가요? 😥 조금만 힘내요!",
      },
      active: {
        gif: "https://i.namu.wiki/i/qVwTXtV7j-sRogzkSGBTiTroRM6KETKka_xUvJIDHYcIOVjGCEQkrpGoaW-_sCQTZS-Nih1eNjJJ9kFhcRfcTA.gif",
        text: "해야 할 일을 다 하셨군요🎉 수고하셨습니다✨",
      },
      all: {
        gif: "https://i.namu.wiki/i/rBVUKzbEhG-vgEU7lZirErWrNyTm_TRS4_Y2O_dOBlZy6H3DnF85BZL7voglz5hPViUrqL8DqpP19w_Ofl7A6Q.gif",
        text: "할 일이 없어요🤔",
      },
    };

    const content = emptyContent[activeFilter] || emptyContent.all;

    return (
      <div className='empty-state'>
        <img className='empty-video' src={content.gif} alt='빈 상태' />
        <p>{content.text}</p>
      </div>
    );
  }

  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
