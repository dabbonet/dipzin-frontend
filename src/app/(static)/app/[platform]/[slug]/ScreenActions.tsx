'use client'
import { ActionBar, SquareButton } from '@/components/ActionBar'
import Icons from '@/components/Icons'
import { FC } from 'react'
import toast from 'react-hot-toast'

interface navigatorProps {
}

const ScreenActions: FC<navigatorProps> = () => {
    // const platform = app.platform.data.attributes.name.toLowerCase();
    return (
        <ActionBar className='z-50 flex flex-col fixed right-10 top-[32%] w-auto h-auto'>

            <SquareButton
                onClick={() => {
                    toast.error('Comming Soon...')
                }}
            >
                <SquareButton.Title className='w-[70%]'>Like Screen</SquareButton.Title>
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

            <SquareButton>
                <SquareButton.Title className='w-[80%]'>Download</SquareButton.Title>
                <SquareButton.Icon>
                    <Icons.Download />
                </SquareButton.Icon>
            </SquareButton>

            <SquareButton
            // onClick={() => {
            //     navigator.clipboard.writeText(
            //         window.location.origin + "/app/" + platform + "/" + app.slug //need fix
            //     )
            //     toast.success('App Link Copied.');
            // }}
            >
                <SquareButton.Title className='w-[70%]'>Copy PNG</SquareButton.Title>
                <SquareButton.Icon>
                    <Icons.Thumbnail />
                </SquareButton.Icon>
            </SquareButton>
            <SquareButton
            // onClick={() => {
            //     navigator.clipboard.writeText(
            //         window.location.origin + "/app/" + platform + "/" + app.slug //need fix
            //     )
            //     toast.success('App Link Copied.');
            // }}
            >
                <SquareButton.Title className='w-[70%]'>Copy Link</SquareButton.Title>
                <SquareButton.Icon>
                    <Icons.CopyFilled />
                </SquareButton.Icon>
            </SquareButton>
        </ActionBar>
    )
}

export default ScreenActions