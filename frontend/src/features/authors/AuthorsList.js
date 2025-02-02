import { useGetAuthorsQuery } from "./authorsApiSlice";
import { Link } from "react-router-dom";

const AuthorsList = ({ pageContext = "Books" }) => {
  const {
    authors = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAuthorsQuery(undefined, {
    selectFromResult: (result) => ({
      authors: Object.values(result?.data?.entities || {}),
      ...result,
    }),
  });

  if (isLoading)
    return <p className="text-center text-gray-500">Loading Authors...</p>;
  if (isError)
    return <p className="text-red-600 text-center">{error?.data?.message}</p>;

  if (isSuccess && authors.length === 0) {
    return <p className="text-center text-gray-500">No authors available.</p>;
  }

  return pageContext === "Authors" ? (
    <div className="p-4 bg-gray-50 rounded-md">
      <ul className="space-y-2">
        {authors.map((author) => (
          <li
            key={author.id}
            className="p-2 bg-white shadow-md rounded-md hover:bg-gray-100 transition"
          >
            <Link to={`${author.id}`} className="text-blue-600 hover:underline">
              <p>{author.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <>
      {authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))}
    </>
  );
};

export default AuthorsList;
