"use server"

export async function getData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 1 }
  });
  const data = await res.json();

  return data;
}
