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
      transformResponse: (response: ICampground[]) => {
        const sortedData = response.sort((a, b) => {
          // Assuming 'createdAt' field is used for sorting
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        return sortedData;
      },
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
      query: ({ _id, campground }) => ({
        url: `/campgrounds/${_id}`,
        method: "PUT",
        body: campground,
      }),
      invalidatesTags: ["AllCampgrounds", "SingleCampground"],
    }),
    deleteCamp: builder.mutation<string, string>({
      query: (id) => ({
        url: `/campgrounds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllCampgrounds"],
    }),
  }),
});

export const {
  useGetCampgroundsQuery,
  useGetSingleCampQuery,
  useCreateCampMutation,
  useUpdateCampMutation,
  useDeleteCampMutation,
} = campgroundApi;
