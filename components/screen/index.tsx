import Web from "./web";
import HoverScreen from "./mobile";
import { SingleScreen } from "./mobile";

type Props = {
    platform: number
    list?: string[]
    src?: string
}
const Screen = ({ platform, list, src }: Props) => {
    if (list) {
        switch (platform) {
            default:
                return <HoverScreen images={list} />
            case 2:
                return <HoverScreen images={list} />
            case 3:
                return <Web images={list} />

        }
    } else if (src) {
        switch (platform) {
            default:
                return <SingleScreen image={src} />
            case 2:
                return <SingleScreen image={src} />
            case 3:
                return <Web images={[src]} />

        }
    }else {
        return null;
    }
}
export default Screen