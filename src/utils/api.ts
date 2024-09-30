const API_BASE_URL = process.env.NEXT_PUBLIC_API;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API environment variable is not set');
}

const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const get = async (endpoint: string, token?: string) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(token),
  });
  return response.json();
};

const post = async (endpoint: string, data: any, token?: string) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return response.json();
};

const put = async (endpoint: string, data: any, token?: string) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  return response.json();
};

const del = async (endpoint: string, token?: string) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  return response.json();
};

export {
  get, post, put, del
};
