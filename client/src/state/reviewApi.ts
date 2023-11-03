import { IReview } from "@/interfaces/review.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const reviewApi = createApi({
	reducerPath: "reviewApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		credentials: "include",
	}),
	tagTypes: ["AllReviews"],
	endpoints: (builder) => ({
		createReview: builder.mutation<
			IReview,
			{ _id: string; review: FieldValues }
		>({
			query: ({ _id, review }) => ({
				url: `campgrounds/${_id}/reviews`,
				method: "POST",
				body: review,
			}),
		}),
		deleteReview: builder.mutation<void, { _id: string; reviewId: string }>({
			query: ({ _id, reviewId }) => ({
				url: `campgrounds/${_id}/reviews/${reviewId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const { useCreateReviewMutation, useDeleteReviewMutation } = reviewApi;
