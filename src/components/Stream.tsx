'use client'
import { FC, forwardRef } from 'react'
import { Components, VirtuosoGrid } from 'react-virtuoso';
import ShowcaseScreen from './screen/ShowcaseScreen';
import SingleScreen from './screen/SingleScreen';

interface StreamProps {
    data: any
}

const Stream: FC<StreamProps> = ({ data }) => {
    const List: Components['List'] = forwardRef(({ style, children }, ref) => {
        return (
            <div className="grid 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 content-center gap-6 pt-0" style={style} ref={ref}>
                {children}
            </div>
        )
    })

    return (
        <VirtuosoGrid
            className="mt-4"
            useWindowScroll
            data={data}
            style={{ height: 20 }}
            initialItemCount={20}
            totalCount={data.length}
            overscan={1}
            components={{
                List: List
            }}
            itemContent={(index, data) => (
                <ShowcaseScreen src={data} />
            )}

        />
    );
}

export default Stream