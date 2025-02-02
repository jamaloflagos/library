import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/v1"}),
    tagTypes: ["Book", "Publisher", "Author"],
    endpoints: (builder) => ({})
})