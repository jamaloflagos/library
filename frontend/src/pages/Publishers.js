import PublishersList from "../features/publishers/PublishersList";

const Publishers = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">الناشرون</h1>
      </header>
      <PublishersList pageContext="Publishers" />
    </div>
  );
};

export default Publishers;
