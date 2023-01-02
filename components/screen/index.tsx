import Web from "./web";
import Mobile from "./mobile";

type Props = {
    platform: number
    src: string
}
const webImages = [
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/65692a13-8749-4ccf-8f94-8b62e99d0788.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/ba2780b8-ce7f-4d65-8e18-f6358d544733.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/9d105252-4222-483a-b90d-d4f898e41bd0.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/992731cb-7023-4058-af52-0cd1fad83bea.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/639/26e8ddc8-fd7f-4364-9a79-950dedb84d3a.png"
  ]
const mobileImages = [
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/619/42855630-fe26-46ae-b248-e09a62f8b8d6.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/731/5769262d-f575-438f-884a-200cef298f6e.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/728/545daa87-efdc-4f92-a970-4ded077805a8.png",
    "https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/e237b8fa-192f-47ad-ac6b-370330b5ba38.png"
]
const Screen = ({ platform, src }: Props) => {
    switch (platform) {
        default:
            return <Mobile images={mobileImages} />
        case 2:
            return <Mobile images={mobileImages} />
        case 3:
            return <Web images={webImages} />

    }
}
export default Screen