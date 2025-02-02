import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const authroAdapter = createEntityAdapter();
const initialState = authroAdapter.getInitialState();

const authorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: () => {
        return {
          url: "/authors",
        };
      },
      transformResponse: (responseData) => {
        return authroAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Author", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Author", id })),
          ];
        } else return { type: "Author", id: "LIST" };
      },
    }),
    updateAuthor: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/authors/${id}`,
        method: "PUT",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Author", id: arg.id }],
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useUpdateAuthorMutation,
} = authorApiSlice;