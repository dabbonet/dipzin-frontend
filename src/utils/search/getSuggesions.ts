export default async function getSuggestions(keyword: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/search/${keyword}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI1OTk0NjQ0LCJleHAiOjE3MjY1OTk0NDR9.2BlDd-eN4SMaS31J7eIOdzbiUpzGszmg492TvLBrJGU'
    },

  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
