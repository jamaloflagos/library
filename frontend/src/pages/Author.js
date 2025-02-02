import { useParams } from "react-router-dom";
import BooksList from "../features/books/BooksList";
import { useGetAuthorsQuery } from "../features/authors/authorsApiSlice";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

const Author = () => {
  const { authorId } = useParams();
  const { author } = useGetAuthorsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      author: data?.entities[authorId],
    }),
  });

  const [filterContext, setFilterContext] = useState("");
  const [filterValue, setFilterValue] = useState("");

  return author ? (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{author.name}</h1>
      </header>
      <FilterBar setFilterContext={setFilterContext} setFilterValue={setFilterValue} />
      <BooksList queryFilterValue={{ author_id: authorId }} filterContext={filterContext} filterValue={filterValue} />
    </div>
  ) : null;
};

export default Author;
