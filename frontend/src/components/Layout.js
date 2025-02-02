import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="p-2 rounded-md bg-blue-800 hover:bg-blue-700 focus:outline-none md:hidden"
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          <i
            className={`fa-solid ${
              isSidebarOpen ? "fa-times" : "fa-bars"
            } text-xl`}
          ></i>
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main
          className={`relative flex-1 bg-gray-100 overflow-y-auto transition-transform duration-300 ${
            isSidebarOpen ? "md:pl-64" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
