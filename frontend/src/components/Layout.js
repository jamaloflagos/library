import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar / Toggle Button */}
        <header className="p-4 bg-white shadow-md flex items-center">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="p-2 rounded-md bg-blue-800 text-white hover:bg-blue-700 focus:outline-none md:hidden"
            aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            <i className={`fa-solid ${isSidebarOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
