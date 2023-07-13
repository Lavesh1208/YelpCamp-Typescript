import { IReview } from "@/interfaces/review.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["AllReviews"],
  endpoints: (builder) => ({
    createReview: builder.mutation<IReview, FieldValues>({
      query: ({ _id, review }) => ({
        url: `campgrounds/${_id}/reviews`,
        method: "POST",
        body: review,
      }),
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;
