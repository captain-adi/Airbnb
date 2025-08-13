

function Header() {
  return (
     <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="h-8 w-8 text-rose-500"
            fill="currentColor"
          >
            <path d="M16 2.5c-2.8 0-4.9 1.5-6.3 4.4l-4.9 10C3.5 19.3 3 21 3 22.4 3 27 6.4 30 10 30c2.2 0 4-1 6-3.3 2 2.3 3.8 3.3 6 3.3 3.6 0 7-3 7-7.6 0-1.4-.5-3.1-1.8-5.5l-4.9-10C20.9 4 18.8 2.5 16 2.5zm0 4c1.7 0 2.8.9 3.7 2.7l4.8 9.9c.9 1.7 1.1 2.8 1.1 3.3 0 2.4-1.7 3.6-3.5 3.6-1.3 0-2.7-.7-4.6-2.8l-.8-.9-.8.9c-1.9 2.1-3.3 2.8-4.6 2.8-1.8 0-3.5-1.2-3.5-3.6 0-.5.2-1.6 1.1-3.3l4.8-9.9C13.2 7.4 14.3 6.5 16 6.5zm0 5.2c-1.6 0-2.8 1.3-2.8 2.9 0 1.6 1.2 2.9 2.8 2.9s2.8-1.3 2.8-2.9c0-1.6-1.2-2.9-2.8-2.9z" />
          </svg>
          <span className="text-xl font-semibold">airbnb</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border rounded-full shadow-sm px-3 py-1">
          <input
            type="text"
            placeholder="Anywhere"
            className="outline-none px-2 text-sm"
          />
          <span className="mx-1">|</span>
          <input
            type="text"
            placeholder="Any week"
            className="outline-none px-2 text-sm"
          />
          <span className="mx-1">|</span>
          <input
            type="text"
            placeholder="Add guests"
            className="outline-none px-2 text-sm"
          />
          <button className="bg-rose-500 text-white rounded-full p-2 ml-2">
            🔍
          </button>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium">Airbnb your home</button>
          <button>🌐</button>
          <div className="border rounded-full px-3 py-1 flex items-center gap-2">
            ☰ <span>👤</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
