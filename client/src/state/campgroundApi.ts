import { ICampground } from "@/interfaces/campground.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";

export const campgroundApi = createApi({
  reducerPath: "campgroundApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["AllCampgrounds", "SingleCampground", "NewCampground"],
  endpoints: (builder) => ({
    getCampgrounds: builder.query<ICampground[], void>({
      query: () => "/campgrounds",
      providesTags: ["AllCampgrounds"],
    }),
    getSingleCamp: builder.query<ICampground, string>({
      query: (id) => `/campgrounds/${id}`,
      providesTags: ["SingleCampground"],
    }),
    createCamp: builder.mutation<ICampground, FieldValues>({
      query: (campground) => ({
        url: "/campgrounds",
        method: "POST",
        body: campground,
      }),
      invalidatesTags: ["AllCampgrounds"],
    }),
    updateCamp: builder.mutation<ICampground, FieldValues>({
      query: ({ _id, values }) => ({
        url: `/campgrounds/${_id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["AllCampgrounds", "SingleCampground"],
    }),
  }),
});

export const {
  useGetCampgroundsQuery,
  useGetSingleCampQuery,
  useCreateCampMutation,
  useUpdateCampMutation,
} = campgroundApi;
