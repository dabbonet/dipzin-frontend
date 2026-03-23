const API_BASE_URL = process.env.NEXT_PUBLIC_API || 'https://dipbk.fin.dabbo.net';

// Log warning if using fallback (only in development)
if (!process.env.NEXT_PUBLIC_API && process.env.NODE_ENV === 'development') {
  console.warn('[API] NEXT_PUBLIC_API not set, using fallback: dipbk.fin.dabbo.net');
}

// Simple in-memory cache for GET requests
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute TTL

const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const get = async (endpoint: string, token?: string) => {
  const cacheKey = `${endpoint}:${token || 'public'}`;
  
  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(token),
  });
  const data = response.json();
  
  // Cache the result
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
};

// Use a generic type <T> for the post and put functions to specify the data type.
const post = async <T>(endpoint: string, data: T, token?: string) => {
  const body = JSON.stringify(data);
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(token),
    body,
  });

  if (!response.ok) {
    return ({
      endpoint,
      status: response.status,
      statusText: response.statusText,
      body,
    });
  }

  return response.json();
};

const put = async <T>(endpoint: string, data: T, token?: string) => {
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
