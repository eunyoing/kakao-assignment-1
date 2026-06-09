function Header() {
  return (
    <header className='mb-6'>
      <div className='flex items-center gap-4'>
        <img
          className='w-20 h-20 rounded-full object-cover'
          src='https://t1.daumcdn.net/brunch/service/user/cnoC/image/5mazSO7Ouexw-TZN0tmlrXXUj30.JPG'
          alt='춘식이'
        />
        <div>
          <h1 className='text-4xl font-bold text-gray-900'>춘식이의 일정</h1>
          <p className='text-sm text-gray-400'>오늘의 할 일은 무엇일까?🐾</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
