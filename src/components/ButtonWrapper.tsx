import { getUser } from "@/lib/auth";
import { getAssetsURL } from "@/lib/utils";
import { useDialog } from "@/context/useDialog";
import SquareButton from "./ui/SquareButton";
type ButtonProps = {
  title?: any;
  icon?: any;
  handler?: any;
  appName?: any;
  screen?: any;
};
const ButtonWrapper = ({
  title,
  icon,
  handler,
  appName,
  screen,
}: ButtonProps) => {
  const { showDialog, DIALOG_ENUM } = useDialog();

  const handleClick = async () => {
    const isUserAuth = await getUser();
    if (!isUserAuth) {
      showDialog(DIALOG_ENUM.ACCESS, "Login to use this features");
      return;
    }
    const name =
      screen?.attributes?.screen?.data?.attributes?.hash +
        screen?.attributes?.screen?.data?.attributes?.ext ?? screen;
    const context =
      title === "Copy PNG" || title === "Copy Link"
        ? getAssetsURL(name)
        : `${appName} ${screen?.attributes?.order ?? ""}`.trim();

    handler(context);
  };

  return (
    appName &&
    screen && (
      <SquareButton onClick={handleClick}>
        <SquareButton.Title className="w-[80%]">{title}</SquareButton.Title>
        <SquareButton.Icon>{icon}</SquareButton.Icon>
      </SquareButton>
    )
  );
};

export default ButtonWrapper;
