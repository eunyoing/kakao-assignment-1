function TodoFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { key: "all", label: "전체보기" },
    { key: "active", label: "해야할 일" },
    { key: "completed", label: "달성한 것" },
  ];

  return (
    <div className='flex gap-2 mb-4 bg-gray-100 rounded-xl p-1'>
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
            ${
              activeFilter === f.key
                ? "bg-white text-gray-900 font-bold shadow-sm"
                : "text-gray-400 hover:text-gray-900"
            }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
