import { Personalize } from "@/components/personalize/Personalize";

export default async function Page() {
  const { positionsRes, interestsRes } = await getNewsLetter();
  return <Personalize positions={positionsRes} interests={interestsRes} />;
}

async function getNewsLetter() {
  const [positionsReq, interestsReq] = await Promise.all([
    fetch("https://rah.dipzin.com/api/positions", {
      method: "GET",
    }),
    fetch("https://rah.dipzin.com/api/interests", {
      method: "GET",
    }),
  ]);
  const [positionsRes, interestsRes] = await Promise.all([
    positionsReq.json(),
    interestsReq.json(),
  ]);
  return { positionsRes, interestsRes };
}
