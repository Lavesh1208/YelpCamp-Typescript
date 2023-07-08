import { ICampground } from "@/interfaces/campground.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const campgroundApi = createApi({
  reducerPath: "campgroundApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["AllCampgrounds", "SingleCampground"],
  endpoints: (builder) => ({
    getCampgrounds: builder.query<ICampground[], void>({
      query: () => "/campgrounds",
      providesTags: ["AllCampgrounds"],
    }),
    getSingleCamp: builder.query<ICampground, string>({
      query: (id) => `/campgrounds/${id}`,
      providesTags: ["SingleCampground"],
    }),
  }),
});

export const { useGetCampgroundsQuery, useGetSingleCampQuery } = campgroundApi;
