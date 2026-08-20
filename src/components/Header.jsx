function Header({ onLogout }) {
  return (
    <header className="header">

      <div className="header-content">

        <div className="logo">
          💰 Finance Dashboard
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Sign Out
        </button>

      </div>

    </header>
  );
}

export default Header;