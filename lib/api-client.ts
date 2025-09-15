import axios from "axios";
import { router } from "expo-router";

export const createAuthenticatedApiClient = (token: string | null) => {
  const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_API_URL || "",
  });

  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (__DEV__) {
        console.error("API Error:", error.response?.data || error.message);
      }

      if (error.response?.status === 401) {
        if (__DEV__) {
          console.log("Unauthorized! Redirecting to login...");
        }

        router.replace("/(auth)/Signin");
      }

      return Promise.reject(error);
    }
  );

  return client;
};
