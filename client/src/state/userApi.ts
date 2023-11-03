import { IUser } from "@/interfaces/user.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		credentials: "include",
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		registerUser: builder.mutation<IUser, FieldValues>({
			query: (user) => ({
				url: "register",
				method: "POST",
				body: user,
			}),
		}),
		loginUser: builder.mutation<IUser, FieldValues>({
			query: (user) => ({
				url: "login",
				method: "POST",
				body: user,
			}),
		}),
		logoutUser: builder.mutation<void, void>({
			query: () => ({
				url: "logout",
				method: "POST",
			}),
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLoginUserMutation,
	useLogoutUserMutation,
} = userApi;
