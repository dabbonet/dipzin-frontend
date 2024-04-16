// /search/components/ScreenActions.tsx
"use client";
import { FC } from "react";
import { ActionBar, SquareButton } from "@/components/ActionBar";
import Icons from "@/components/Icons";
import { useDialog } from "@/context/useDialog";
import useScreenActions from '@/hooks/useScreenActions';

type ButtonProps = {
  title: string;
  icon: JSX.Element;
  handler: (urlOrName: string, additionalInfo?: string) => void;
  screenInfo: {
    appName: string;
    screen: any; // Specify more accurate types as needed
  };
};

const ButtonWrapper: FC<ButtonProps> = ({ title, icon, handler, screenInfo }) => {
  const { screen, appName } = screenInfo;
  const { showDialog, DIALOG_ENUM } = useDialog();
  const screenURL = screen.attributes?.screen?.data?.attributes?.url || screen.url; // Adapt as necessary based on data structure

  return (
    <SquareButton onClick={() => handler(screenURL, `${appName} ${screen.attributes?.order}`)}>
      <SquareButton.Title>{title}</SquareButton.Title>
      <SquareButton.Icon>{icon}</SquareButton.Icon>
    </SquareButton>
  );
};

const ScreenActions: FC<{ appName: string; screen: any }> = ({ appName, screen }) => {
  const { handleDownloadScreen, handleCopyLink, handleCopyPng, handleLikeScreen } = useScreenActions();

  return (
    <ActionBar className="z-50 flex flex-col fixed sm:right-10 right-0 top-[32%] w-fit h-auto">
      <ButtonWrapper
        title="Like Screen"
        icon={<Icons.Heart />}
        handler={handleLikeScreen}
        screenInfo={{ appName, screen }}
      />
      <ButtonWrapper
        title="Download"
        icon={<Icons.Download />}
        handler={handleDownloadScreen}
        screenInfo={{ appName, screen }}
      />
      <ButtonWrapper
        title="Copy PNG"
        icon={<Icons.Copy />}
        handler={handleCopyPng}
        screenInfo={{ appName, screen }}
      />
      <ButtonWrapper
        title="Copy Link"
        icon={<Icons.CopyFilled />}
        handler={handleCopyLink}
        screenInfo={{ appName, screen }}
      />
    </ActionBar>
  );
};

export default ScreenActions;
