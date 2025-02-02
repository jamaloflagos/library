import { NavLink } from "react-router-dom";
const Sidebar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <aside>
        <div className="flex justify-end items-center px-4 py-4 bg-blue-800">
          <button
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="md:hidden"
          >
            <i className="fa-solid fa-times text-white"></i>
          </button>
        </div>
        <nav className="flex flex-col px-4 space-y-2">
          <ul>
            <li>
              <NavLink
                to="/new-book"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-white text-blue-900 font-bold"
                      : "hover:bg-blue-800"
                  }`
                }
              >
                إضافة كتاب جديد
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-white text-blue-900 font-bold"
                      : "hover:bg-blue-800"
                  }`
                }
              >
                الكتب
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/authors"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-white text-blue-900 font-bold"
                      : "hover:bg-blue-800"
                  }`
                }
              >
                المؤلفون
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/publishers"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-white text-blue-900 font-bold"
                      : "hover:bg-blue-800"
                  }`
                }
              >
                الناشرون
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
export default Sidebar;
