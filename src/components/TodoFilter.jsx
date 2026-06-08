function TodoFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { key: "all", label: "전체보기" },
    { key: "active", label: "해야할 일" },
    { key: "completed", label: "달성한 것" },
  ];

  return (
    <div className='filter-tabs'>
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={`filter-btn ${activeFilter === f.key ? "active" : ""}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
