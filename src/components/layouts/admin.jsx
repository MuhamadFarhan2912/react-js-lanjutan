import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { checkTokenValidity, logout } from "../../_services/auth"; 

export default function AdminLayout() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token"); 
  const userInfoStr = localStorage.getItem("user"); 
  
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  const decodedData = checkTokenValidity(token);

  useEffect(() => {
    // 1. Cek apakah token ada dan valid
    if (!token || !decodedData || !decodedData.success) {
      navigate("/login");
      return;
    }

    // 2. Cek apakah role user adalah admin
    const role = userInfo?.role;
    if (!role || role !== "admin") {
      navigate("/");
    }
  }, [token, decodedData, userInfo, navigate]);

  // Fungsi handle logout yang aman dan rapi
  const handleLogout = async () => {
    try {
      if (token) {
        await logout(token);
      }
    } catch (error) {
      console.log("Gagal logout dari server:", error);
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <Link
                to={"/admin"}
                className="flex items-center justify-between mr-4"
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/logo.svg"
                  className="mr-3 h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </Link>
            </div>
            
            <div className="flex items-center lg:order-2">
              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt="user photo"
                />
              </button>
              
              {/* Dropdown menu */}
              <div
                className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
                id="dropdown"
              >
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {userInfo?.name || "Admin User"}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {userInfo?.email || "admin@company.com"}
                  </span>
                </div>
                <ul
                  className="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 flex-1 bg-white dark:bg-gray-800">
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/admin"}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ml-3">Overview</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/authors"}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Authors</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/genres"}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Genres</span>
                </Link>
              </li>
            </ul>

            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <li>
                <Link
                  to={"/admin/books"}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="ml-3">Books</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Tombol Logout di Bagian Bawah Sidebar */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-base font-medium text-red-600 rounded-lg transition duration-75 hover:bg-red-50 dark:hover:bg-gray-700 dark:text-red-400 group"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-red-500 transition duration-75 dark:text-red-400 group-hover:text-red-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="p-4 md:ml-64 h-auto pt-20">
          <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-auto px-4 pt-4 pb-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}