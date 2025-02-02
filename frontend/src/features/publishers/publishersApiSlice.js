import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const publisherAdapter = createEntityAdapter();
const initialState = publisherAdapter.getInitialState();

const publisherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublishers: builder.query({
      query: () => {
        return {
          url: "/publishers",
        };
      },
      transformResponse: (responseData) => {
        return publisherAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Publisher", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Publisher", id })),
          ];
        } else return { type: "Publisher", id: "LIST" };
      },
    }),
    updatePublisher: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/publishers/${id}`,
        method: "PUT",
        body: {
          ...rest,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Publisher", id: arg.id }],
    }),
  }),
});

export const {
  useGetPublishersQuery,
  useUpdatePublisherMutation,
} = publisherApiSlice;