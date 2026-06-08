function Header() {
  return (
    <header className='app-header'>
      <div className='header-inner'>
        <div className='chunsik-wrapper'>
          <img
            className='chunsik-img'
            src='https://t1.daumcdn.net/brunch/service/user/cnoC/image/5mazSO7Ouexw-TZN0tmlrXXUj30.JPG'
            alt='춘식이'
          />
        </div>
        <div className='header-text'>
          <h1 className='app-title'>춘식이의 일정</h1>
          <p className='app-subtitle'>오늘의 할 일은 무엇일까?🐾</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
