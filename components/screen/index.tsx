import Web from "./web";
import Mobile from "./mobile";

type Props = {
    platform: number
    list: string[]
}
const Screen = ({ platform, list }: Props) => {
    switch (platform) {
        default:
            return <Mobile images={list} />
        case 2:
            return <Mobile images={list} />
        case 3:
            return <Web images={list} />

    }
}
export default Screen