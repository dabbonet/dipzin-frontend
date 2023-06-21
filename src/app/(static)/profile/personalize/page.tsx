import { Personalize } from "@/components/Personalize";

export default async function Page() {
    const {positionsRes , interestsRes} = await getNewsLetter()
    return <Personalize/>
}


async function getNewsLetter() {
    const [positionsReq, interestsReq] = await Promise.all([
        fetch('https://rah.dipzin.com/api/positions', {
            method: 'GET',
        }),
        fetch('https://rah.dipzin.com/api/interests', {
            method: 'GET',
        })
    ]);
    const [positionsRes, interestsRes] = await Promise.all([
        positionsReq.json(),
        interestsReq.json()
    ]);
    return {positionsRes , interestsRes}
}
