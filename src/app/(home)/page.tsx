import Stream from "@/components/Stream";

async function getInitial() {
  const res = await fetch('https://rah.dipzin.com/api/init');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const initial = await getInitial();

  return (
    <Stream streamCount={initial.stream_count} />
  );
}