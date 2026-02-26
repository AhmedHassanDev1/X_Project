import { MediaQueryType } from '@/types/post'
import Image from 'next/image'
import React from 'react'

function ImageBox({ image }: { image: MediaQueryType }) {
    
    return (
        <div className='bg-zinc-800  relative  w-full overflow-hidden'>
            <Image
                src={image.url}
                alt={"post-image"}
                width={566}
                height={566}
                className='w-full h-full object-cover'
            />
        </div>
    )
}

export default ImageBox