import { useParams } from "react-router-dom";
import BooksList from "../features/books/BooksList";
import { useGetPublishersQuery } from "../features/publishers/publishersApiSlice";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

const Publisher = () => {
  const { publisherId } = useParams();
  const { publisher } = useGetPublishersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      publisher: data?.entities[publisherId],
    }),
  });

  const [filterContext, setFilterContext] = useState("");
  const [filterValue, setFilterValue] = useState("");

  return publisher ? (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{publisher.name}</h1>
      </header>
      <FilterBar setFilterContext={setFilterContext} setFilterValue={setFilterValue} />
      <BooksList queryFilterValue={{ publisher_id: publisherId }} filterContext={filterContext} filterValue={filterValue} />
    </div>
  ) : null;
};

export default Publisher;
