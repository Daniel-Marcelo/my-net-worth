import handleViewport from 'react-in-viewport';
import { x } from "@xstyled/styled-components";
import { XStyledProps } from '../../types';
import { Ref, useEffect, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';

interface MyImageProps {
    src: string,
    width: string,
    height: string,
    inViewport: boolean
}

export const Image = ({ src, width, height, inViewport, ...props }: MyImageProps & XStyledProps) => {
    return <>
        {inViewport && src && <x.img
            src={src}
            height={height}
            width={width}
            {...props}
        />}
    </>
}
