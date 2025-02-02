import { useState } from "react";
import BooksList from "../features/books/BooksList";
import FilterBar from "../components/FilterBar";

const Books = () => {
  const [filterValue, setFilterValue] = useState("");
  const [filterContext, setFilterContext] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">📚 الكتب</h1>
      </header>
      <FilterBar setFilterContext={setFilterContext} setFilterValue={setFilterValue} />
      <BooksList filterContext={filterContext} filterValue={filterValue} />
    </div>
  );
};

export default Books;
