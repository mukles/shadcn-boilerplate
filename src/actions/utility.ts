"use server";

import { API_BASE_URL } from "@/constant";
type ApiSuccess<T> = {
  status: number;
  message: string;
  result: T;
};

type ApiError = {
  status: number;
  message: string;
  error: { path: string; message: string }[];
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function fetchApi<T>({
  endPoint,
  headers = {},
  body,
  method = "GET",
}: {
  endPoint: string;
  headers?: HeadersInit;
  body?: ExtractVariables<T>;
  method?: HttpMethod;
}): Promise<ApiResponse<T>> {
  try {
    const isFormData = body instanceof FormData;
    const response = await fetch(API_BASE_URL + endPoint, {
      method,
      headers: isFormData
        ? headers // Don't set Content-Type for FormData
        : { "Content-Type": "application/json", ...headers },
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    const json = await response.json();

    if (!response.ok) {
      // Force the error shape
      return {
        status: response.status,
        message: json.message ?? "Request failed",
        error: json.error ?? [{ path: "unknown", message: "Unknown error" }],
      };
    }

    // Force the success shape
    return {
      status: response.status,
      message: json.message ?? "Request successful",
      result: json.data ?? json, // fallback if API didn't wrap in "result"
    };
  } catch (err) {
    return {
      status: 500,
      message: "Internal Server Error",
      error: [{ path: "network", message: (err as Error).message }],
    };
  }
}
