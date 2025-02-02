import { NavLink } from "react-router-dom";

const Sidebar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Overlay on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white z-50 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0`}
      >
        {/* Close Button (only for mobile) */}
        <div className="flex justify-end items-center px-4 py-4 md:hidden">
          <button onClick={closeSidebar} aria-label="Close sidebar">
            <i className="fa-solid fa-times text-white text-xl"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-4 space-y-2 mt-4">
          <ul>
            {[
              { to: "/new-book", label: "إضافة كتاب جديد" },
              { to: "/books", label: "الكتب" },
              { to: "/authors", label: "المؤلفون" },
              { to: "/publishers", label: "الناشرون" },
            ].map(({ to, label }, index) => (
              <li key={index}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition ${
                      isActive
                        ? "bg-white text-blue-900 font-bold"
                        : "hover:bg-blue-700"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
