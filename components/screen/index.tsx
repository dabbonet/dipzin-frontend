import { WebHoverScreen, WebSingleScreen } from "./web";
import HoverScreen from "./mobile";
import { SingleScreen } from "./mobile";

type Props = {
  platform: number;
  list?: string[];
  app?: { id: string; name: string; tagline: string; icon: string };
  src?: string;
};
const Screen = ({ platform, list, src, app }: Props) => {
  if (app && list) {
    switch (platform) {
      default:
        return <HoverScreen app={app} images={list} />;
      case 2:
        return <HoverScreen app={app} images={list} />;
      case 4:
        return <WebHoverScreen app={app} images={list} />;
    }
  } else if (src) {
    switch (platform) {
      default:
        return <SingleScreen image={src} />;
      case 2:
        return <SingleScreen image={src} />;
      case 4:
        return <WebSingleScreen image={src} />;
    }
  } else {
    return null;
  }
};
export default Screen;
