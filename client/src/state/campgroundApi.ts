import {
	ICampReviewAndAuthor,
	ICampground,
} from "@/interfaces/campground.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const campgroundApi = createApi({
	reducerPath: "campgroundApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		credentials: "include",
	}),
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
		getSingleCamp: builder.query<ICampReviewAndAuthor, string>({
			query: (id) => `/campgrounds/${id}`,
			providesTags: ["SingleCampground"],
		}),
		createCamp: builder.mutation<ICampReviewAndAuthor, FieldValues>({
			query: (campground) => {
				return {
					url: "/campgrounds",
					method: "POST",
					body: campground,
				};
			},
			invalidatesTags: ["AllCampgrounds"],
		}),
		updateCamp: builder.mutation<ICampground, FieldValues>({
			query: ({ _id, formData: campground }) => {
				return {
					url: `/campgrounds/${_id}`,
					method: "PUT",
					body: campground,
				};
			},
			invalidatesTags: ["AllCampgrounds", "SingleCampground"],
		}),
		deleteCamp: builder.mutation<void, string>({
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
