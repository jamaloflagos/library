import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const bookAdapter = createEntityAdapter();
const initialState = bookAdapter.getInitialState();

const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (filterValue) => {
        return {
          url: "/books",
          params: filterValue,
        };
      },
      transformResponse: (responseData) => {
        return bookAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Book", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Book", id })),
          ];
        } else return { type: "Book", id: "LIST" };
      },
    }),
    addNewBook: builder.mutation({
      query: (bookData) => {
        return {
          url: "/books",
          method: "POST",
          body: {
            ...bookData,
          },
        };
      },
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Book", id: arg.id }],
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Book", id: arg.id }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApiSlice;

// const selectClassesResult = classApiSlice.endpoints.getClasses.select();

// const selectClassesData = createSelector(
//   selectClassesResult,
//   (classesResult) => classesResult.data
// );

// export const { selectAll } = classAdapter.getSelectors(
//   (state) => selectClassesData(state) ?? initialState
// );
