import { useEffect, useState } from "react";
import { useAddNewBookMutation } from "./booksApiSlice";
import AuthorsList from "../authors/AuthorsList";
import { useNavigate } from "react-router-dom";
import PublishersList from "../publishers/PublishersList";

const NewBookForm = () => {
  const [addNewBook, { isLoading, isSuccess, isError, error }] = useAddNewBookMutation();
  const [bookTitle, setBookTitle] = useState("");
  const [format, setFormat] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [newAuthor, setNewAuthor] = useState(false);
  const [newPublisher, setNewPublisher] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const bookCategories = ["النحو", "الصرف", "العروض"];
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setBookTitle("");
      setAuthorId("");
      setAuthorName("");
      setPublisherId("");
      setPublisherName("");
      setNewAuthor(false);
      setNewPublisher(false);
      setCategory("");
      setFormat("");
      navigate("/books");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      setErrMsg(error?.status === 404 ? "Not found." : error?.status === 500 ? "Server error." : "An unexpected error occurred.");
    }
  }, [isError, error]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title: bookTitle, book_category: category, book_format: format };
    if (newAuthor) bookData.author_name = authorName;
    else if (authorId) bookData.author_id = authorId;
    if (newPublisher) bookData.publisher_name = publisherName;
    else if (publisherId) bookData.publisher_id = publisherId;
    await addNewBook(bookData);
  };

  const onCancelClicked = () => {
    navigate("/books");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
      {isError && <p className="text-red-600 text-sm">{errMsg}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="book_title" className="block text-sm font-medium text-gray-700">عنوان الكتاب</label>
          <input
            type="text"
            id="book_title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-700">تنسيق الكتاب</label>
          <select id="format" value={format} onChange={(e) => setFormat(e.target.value)} className="mt-1 p-2 w-full border rounded-md">
            <option value="">اختر تنسيقا</option>
            <option value="ورقية">نسخة ورقية</option>
            <option value="إلكترونية">نسخة إلكترونية</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 p-2 w-full border rounded-md">
            <option value="">اختر</option>
            {bookCategories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">مؤلف الكتاب</label>
          {!newAuthor ? (
            <select id="author" value={authorId} onChange={(e) => {
                setNewAuthor(e.target.value === "other");
                setAuthorId(e.target.value !== "other" ? e.target.value : "");
              }} className="mt-1 p-2 w-full border rounded-md">
              <option value="">اختر مؤلفا</option>
              <AuthorsList pageContext="New Book" />
              <option value="other">مؤلف جديد</option>
            </select>
          ) : (
            <input type="text" id="author" value={authorName} placeholder="Enter author name" onChange={(e) => setAuthorName(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
          )}
        </div>
        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">ناشر الكتاب</label>
          {!newPublisher ? (
            <select id="publisher" value={publisherId} onChange={(e) => {
                setNewPublisher(e.target.value === "other");
                setPublisherId(e.target.value !== "other" ? e.target.value : "");
              }} className="mt-1 p-2 w-full border rounded-md">
              <option value="">اختر ناشر</option>
              <PublishersList pageContext="New Book" />
              <option value="other">ناشر جديد</option>
            </select>
          ) : (
            <input type="text" id="publisher" value={publisherName} placeholder="Enter publisher name" onChange={(e) => setPublisherName(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
          )}
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={onCancelClicked} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">{isLoading ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
};

export default NewBookForm;
