const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

let authToken: string | null = null;

export function setAuthToken(token: string): void {
  authToken = token;
}

export function clearAuthToken(): void {
  authToken = null;
}

interface RequestOptions {
  headers?: Record<string, string>;
}

async function request<T = unknown>(
  method: string,
  url: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = { ...options.headers };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  let serializedBody: BodyInit | undefined;
  if (body instanceof FormData) serializedBody = body;
  else if (body) serializedBody = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}/${url.replace(/^\//, "")}`, {
    method,
    headers,
    body: serializedBody,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw Object.assign(new Error(error.message ?? response.statusText), {
      status: response.status,
      data: error,
    });
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  get: <T = unknown>(url: string, options?: RequestOptions) =>
    request<T>("GET", url, undefined, options),
  post: <T = unknown>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", url, body, options),
  put: <T = unknown>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", url, body, options),
  patch: <T = unknown>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", url, body, options),
  delete: <T = unknown>(url: string, options?: RequestOptions) =>
    request<T>("DELETE", url, undefined, options),
};
