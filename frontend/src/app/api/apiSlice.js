import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://library-api-tau.vercel.app/api/v1"}),
    tagTypes: ["Book", "Publisher", "Author"],
    endpoints: (builder) => ({})
})