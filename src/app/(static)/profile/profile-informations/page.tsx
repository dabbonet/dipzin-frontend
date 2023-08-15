import ProfileInformation from "./profile-informations";

export default async function Page() {
    const newsLetter = await getNewsLetter()
    return <ProfileInformation newsLetter={newsLetter.data}/>
}

async function getNewsLetter() {
    const req = await fetch('https://rah.dipzin.com/api/system-news-letters', {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const res = await req.json()
    return await res
}