import Web from "./web";
import Mobile from "./mobile";

type Props = {
    platform: number
    src: string
}
const Screen = ({ platform, src }: Props) => {
    switch (platform) {
        default:
            return <Mobile src={src} />
        case 2:
            return <Mobile src={src} />
        case 3:
            return <Web src={src} />

    }
}
export default Screen