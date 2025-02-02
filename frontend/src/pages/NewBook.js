import NewBookForm from "../features/books/NewBookForm";

const NewBook = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">إضافة كتاب جديد</h1>
      </header>
      <NewBookForm />
    </div>
  );
};

export default NewBook;
