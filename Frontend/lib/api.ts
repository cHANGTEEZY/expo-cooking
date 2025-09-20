import { createAuthenticatedApiClient } from "./api-client";

const api = {
  get: async <T>(
    url: string,
    params?: object,
    token?: string | null
  ): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.get(url, {
      params,
    });
    return res.data;
  },

  post: async <T>(
    url: string,
    data?: object,
    token?: string | null
  ): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.post(url, data);
    return res.data;
  },

  put: async <T>(
    url: string,
    data?: object,
    token?: string | null
  ): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.put(url, data);
    return res.data;
  },

  patch: async <T>(
    url: string,
    data?: object,
    token?: string | null
  ): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.patch(url, data);
    return res.data;
  },

  delete: async <T>(url: string, token?: string | null): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.delete(url);
    return res.data;
  },
};

export default api;
export type Api = typeof api;
