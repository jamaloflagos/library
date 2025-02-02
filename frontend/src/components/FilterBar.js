import { useState } from "react";

const FilterBar = ({ setFilterContext, setFilterValue }) => {
  const filters = [
    { context: "All Books", value_in_english: "All Books", value_in_arabic: "📚 جميع الكتب" },
    { context: "format", value_in_english: "soft", value_in_arabic: "📄 نسخ ورقية" },
    { context: "format", value_in_english: "hard", value_in_arabic: "💻 نسخ إلكترونية" },
    { context: "category", value_in_english: "nahw", value_in_arabic: "📖 النحو" },
    { context: "category", value_in_english: "sorf", value_in_arabic: "📖 الصرف" },
    { context: "category", value_in_english: "arud", value_in_arabic: "📖 العروض" },
  ];

  const [activeFilter, setActiveFilter] = useState("All Books");

  const handleFilterClick = (context, value) => {
    setActiveFilter(value);
    setFilterContext(context);
    setFilterValue(value);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white rounded-md">
      <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {filters.map(({ context, value_in_english, value_in_arabic }, index) => (
          <li key={index}>
            <button
              onClick={() => handleFilterClick(context, value_in_english)}
              className={`px-4 py-2 rounded-md transition-all duration-200 text-sm sm:text-base 
                ${
                  activeFilter === value_in_english
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              {value_in_arabic}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FilterBar;
