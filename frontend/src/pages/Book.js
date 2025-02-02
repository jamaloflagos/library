import { useParams } from "react-router-dom";
import { useGetBooksQuery } from "../features/books/booksApiSlice";

const Book = () => {
  const { bookId } = useParams();
  const { book } = useGetBooksQuery({}, {
    selectFromResult: ({ data }) => ({
      book: data?.entities[bookId],
    }),
  });

  return book ? (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
      </header>
      <div className="text-gray-600 space-y-2">
        <p><strong>📂 الفئة:</strong> {book.category}</p>
        <p><strong>📘 التنسيق:</strong> {book.format}</p>
      </div>
    </div>
  ) : null;
};

export default Book;
