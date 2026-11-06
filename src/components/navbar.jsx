import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Perbarui status login setiap berpindah halaman
  useEffect(() => {
    const currentToken = localStorage.getItem("token");

    let currentUser = null;

    try {
      const user = localStorage.getItem("user");
      currentUser = user ? JSON.parse(user) : null;
    } catch {
      currentUser = null;
    }

    setToken(currentToken);
    setUserInfo(currentUser);
  }, [location.pathname]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUserInfo(null);

    navigate("/login");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-3 border-b">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="BookSales Logo"
            />
            <span className="text-xl font-semibold whitespace-nowrap">
              BookSales
            </span>
          </Link>

          {/* Bagian kanan */}
          <div className="flex items-center gap-2 lg:order-2">

            {token && userInfo ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-800 hidden sm:inline">
                  Hi, {userInfo.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-gray-800 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Masuk
                </Link>

                <Link
                  to="/register"
                  className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Bergabung
                </Link>
              </div>
            )}

            {/* Tombol menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Menu navigasi */}
          <div
            className={`${isMenuOpen ? "block" : "hidden"} w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-indigo-700"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/books"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-indigo-700"
                >
                  Buku Terlaris
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="block py-2 text-gray-700 hover:text-indigo-700"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="block py-2 text-gray-700 hover:text-indigo-700"
                >
                  Layanan
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
} 