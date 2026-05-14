const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

export function clearAuthToken() {
  authToken = null;
}

async function request(method, url, body, options = {}) {
  const headers = { ...options.headers };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  let serializedBody;
  if (body instanceof FormData) serializedBody = body;
  else if (body) serializedBody = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}/${url.replace(/^\//, "")}`, {
    method,
    headers,
    body: serializedBody,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw Object.assign(new Error(error.message ?? response.statusText), {
      status: response.status,
      data: error,
    });
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  get: (url, options) => request("GET", url, null, options),
  post: (url, body, options) => request("POST", url, body, options),
  put: (url, body, options) => request("PUT", url, body, options),
  patch: (url, body, options) => request("PATCH", url, body, options),
  delete: (url, options) => request("DELETE", url, null, options),
};
