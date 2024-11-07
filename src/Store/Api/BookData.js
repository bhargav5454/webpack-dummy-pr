import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../Lib/Axios.js";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: axiosBaseQuery(),

  tagTypes: ["Book"],
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/data",
        method: "POST",
        data: bookData,
      }),
      invalidatesTags: ["Product"],
    }),
    getBooks: builder.query({
      query: () => ({
        url: "/data",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    deleteBook: builder.mutation({
      query: (data) => ({
        url: `/data/${data}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateBook: builder.mutation({
      query: (data) => ({
        url: `/data/${data.id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
