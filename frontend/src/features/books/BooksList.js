import { useEffect, useState, useMemo } from "react";
import { useGetBooksQuery } from "./booksApiSlice";

const BooksList = ({ filterContext = "All Books", filterValue = "", queryFilterValue = {} }) => {
  const { books: booksData, isLoading, isSuccess, isError, error } = useGetBooksQuery(queryFilterValue, {
    selectFromResult: (result) => ({
      books: result?.data ? Object.values(result.data.entities) : [],
      ...result,
    }),
  });

  const books = useMemo(() => booksData, [JSON.stringify(booksData)]);

  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!books) return;
    setFilteredBooks(
      filterContext === "format"
        ? books.filter((book) => book.format === filterValue)
        : filterContext === "category"
        ? books.filter((book) => book.category === filterValue)
        : books
    );
  }, [books, filterValue, filterContext]);

  if (isLoading) return <p className="text-center text-gray-500">⏳ Loading Books...</p>;
  if (isError) return <p className="text-red-600 text-center">{error?.data?.message}</p>;
  if (isSuccess && books.length === 0) return <p className="text-center text-gray-500">📭 No books available.</p>;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {filteredBooks.map((book) => (
        <li key={book.id} className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold text-gray-700">{book.title}</h2>
        </li>
      ))}
    </ul>
  );
};

export default BooksList;
