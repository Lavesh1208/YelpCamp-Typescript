import { Campground } from "@/interfaces/campground.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const campgroundApi = createApi({
  reducerPath: "campgroundApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Campgrounds"],
  endpoints: (builder) => ({
    getCampgrounds: builder.query<Campground[], void>({
      query: () => "/campgrounds",
      providesTags: ["Campgrounds"],
    }),
  }),
});

export const { useGetCampgroundsQuery } = campgroundApi;
