import { useGetPublishersQuery } from "./publishersApiSlice";
import { Link } from "react-router-dom";

const PublishersList = ({ pageContext = "Books", setPublisher }) => {
  const {
    publishers = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPublishersQuery(undefined, {
    selectFromResult: (result) => ({
      publishers: Object.values(result?.data?.entities || {}),
      ...result,
    }),
  });

  if (isLoading)
    return <p className="text-center text-gray-500">Loading Publishers...</p>;
  if (isError)
    return <p className="text-red-600 text-center">{error?.data?.message}</p>;

  if (isSuccess && publishers.length === 0) {
    return (
      <p className="text-center text-gray-500">No publishers available.</p>
    );
  }

  return pageContext === "Publishers" ? (
    <div className="p-4 bg-gray-50 rounded-md">
        <ul className="space-y-2">
          {publishers.map((publisher) => (
            <li
              key={publisher.id}
              className="p-2 bg-white shadow-md rounded-md hover:bg-gray-100 transition"
            >
              <Link
                to={`${publisher.id}`}
                className="text-blue-600 hover:underline"
              >
                <p>{publisher.name}</p>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  ) : (
    <>
      {publishers.map((publisher) => (
        <option key={publisher.id} value={publisher.id}>
          {publisher.name}
        </option>
      ))}
    </>
  );
};

export default PublishersList;
