'use client'
import { ActionBar, SquareButton } from '@/components/ActionBar'
import Icons from '@/components/Icons'
import { FC } from 'react'
import toast from 'react-hot-toast'

interface navigatorProps {
    app: any
}

const AppActions: FC<navigatorProps> = ({ app }) => {
    const platform = app.platform.data.attributes.name.toLowerCase();
    return (
        <ActionBar className='flex flex-col fixed right-10 top-[32%] w-auto h-auto'>
            <SquareButton
                onClick={() => {
                    toast.error('Please Login to access this feature...')
                }}
            >
                <SquareButton.Title>Like App</SquareButton.Title>
                <SquareButton.Icon>
                    <Icons.Heart />
                </SquareButton.Icon>
            </SquareButton>

            {app.store_link &&
                <SquareButton
                    onClick={() => {
                        window.open(app.store_link, "_blank", "noreferrer");
                    }}
                >
                    <SquareButton.Title className='w-[70%]'>App Store</SquareButton.Title>
                    <SquareButton.Icon>
                        <Icons.Apple />
                    </SquareButton.Icon>
                </SquareButton>
            }

            {/* TODO: Add Save When Collections is Done. */}
            {/* <SquareButton>
                <SquareButton.Title>Save</SquareButton.Title>
                <SquareButton.Icon>
                    <Icons.Save />
                </SquareButton.Icon>
            </SquareButton> */}

            <SquareButton>
                <SquareButton.Title className='w-[80%]'>Bulk Download</SquareButton.Title>
                <SquareButton.Icon>
                    <Icons.Download />
                </SquareButton.Icon>
            </SquareButton>

            <SquareButton
                onClick={() => {
                    navigator.clipboard.writeText(
                        window.location.origin + "/app/" + platform + "/" + app.slug //need fix
                    )
                    toast.success('App Link Copied.');
                }}
            >
                <SquareButton.Title className='w-[70%]'>Copy Link</SquareButton.Title>
                <SquareButton.Icon>
                    <Icons.CopyFilled />
                </SquareButton.Icon>
            </SquareButton>
        </ActionBar>
    )
}

export default AppActions