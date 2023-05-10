"use client";
import { ActionBar, SquareButton } from "@/components/ActionBar";
import Icons from "@/components/Icons";
import { copyImagesToClipboard } from "@/lib/ImageCopier";
import { downloadImage } from "@/lib/ImageDownloader";
import { getAssetsURL } from "@/lib/utils";
import { FC } from "react";
import toast from "react-hot-toast";

interface navigatorProps {
  appName?: string;
  screen?: any;
}

const ScreenActions: FC<navigatorProps> = ({ appName, screen }) => {
  if (appName && screen) {
    const name =
      screen.attributes.screen.data.attributes.hash +
      screen.attributes.screen.data.attributes.ext;
    const fileName = appName + " " + screen.attributes.order;
    const screenURL = getAssetsURL(name);
    return (
      <ActionBar className="z-50 flex flex-col fixed right-10 top-[32%] w-auto h-auto">
        <SquareButton
          onClick={() => {
            toast.error("Comming Soon...");
          }}
        >
          <SquareButton.Title className="w-[70%]">
            Like Screen
          </SquareButton.Title>
          <SquareButton.Icon>
            <Icons.Heart />
          </SquareButton.Icon>
        </SquareButton>

        {/* TODO: Add Save When Collections is Done. */}
        {/* <SquareButton>
                <SquareButton.Title>Save Screen</SquareButton.Title>
                <SquareButton.Icon>
                    <Icons.Save />
                </SquareButton.Icon>
            </SquareButton> */}

        <SquareButton
          onClick={async () => {
            name && downloadImage(fileName, name);
          }}
        >
          <SquareButton.Title className="w-[80%]">Download</SquareButton.Title>
          <SquareButton.Icon>
            <Icons.Download />
          </SquareButton.Icon>
        </SquareButton>

        <SquareButton
          onClick={async () => {
            await copyImagesToClipboard([screenURL]);
          }}
        >
          <SquareButton.Title className="w-[70%]">Copy PNG</SquareButton.Title>
          <SquareButton.Icon>
            <Icons.Thumbnail />
          </SquareButton.Icon>
        </SquareButton>
        <SquareButton
          onClick={() => {
            navigator.clipboard.writeText(screenURL);
            toast.success("App Link Copied.");
          }}
        >
          <SquareButton.Title className="w-[70%]">Copy Link</SquareButton.Title>
          <SquareButton.Icon>
            <Icons.CopyFilled />
          </SquareButton.Icon>
        </SquareButton>
      </ActionBar>
    );
    }
    return  (
        <ActionBar className="z-50 flex flex-col fixed right-10 top-[32%] w-auto h-auto">
          <SquareButton
            onClick={() => {
              toast.error("Comming Soon...");
            }}
          >
            <SquareButton.Title className="w-[70%]">
              Like Screen
            </SquareButton.Title>
            <SquareButton.Icon>
              <Icons.Heart />
            </SquareButton.Icon>
          </SquareButton>
  
          {/* TODO: Add Save When Collections is Done. */}
          {/* <SquareButton>
                  <SquareButton.Title>Save Screen</SquareButton.Title>
                  <SquareButton.Icon>
                      <Icons.Save />
                  </SquareButton.Icon>
              </SquareButton> */}
  
          <SquareButton
            onClick={async () => {

            }}
          >
            <SquareButton.Title className="w-[80%]">Download</SquareButton.Title>
            <SquareButton.Icon>
              <Icons.Download />
            </SquareButton.Icon>
          </SquareButton>
  
          <SquareButton
            onClick={async () => {

            }}
          >
            <SquareButton.Title className="w-[70%]">Copy PNG</SquareButton.Title>
            <SquareButton.Icon>
              <Icons.Thumbnail />
            </SquareButton.Icon>
          </SquareButton>
          <SquareButton
            onClick={() => {

              toast.success("App Link Copied.");
            }}
          >
            <SquareButton.Title className="w-[70%]">Copy Link</SquareButton.Title>
            <SquareButton.Icon>
              <Icons.CopyFilled />
            </SquareButton.Icon>
          </SquareButton>
        </ActionBar>
      );
};

export default ScreenActions;
