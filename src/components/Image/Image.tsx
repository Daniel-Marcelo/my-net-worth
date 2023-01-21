import handleViewport, { useInViewport } from "react-in-viewport";
import { x } from "@xstyled/styled-components";
import { Ref, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { XStyledProps } from "../../types";

interface MyImageProps {
  src: string;
  width: string;
  height: string;
  inViewport: boolean;
}

const iconPathOne = (url: string) => `google.com/s2/favicons?domain_url=${url}`;
const iconPathTwo = (url: string) => `icons.duckduckgo.com/ip2/${url}.ico`;

export function Image({ src, width, height, inViewport, ...props }: MyImageProps & XStyledProps) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (src) {
      setUrl(iconPathOne(src));
      setUrls([iconPathTwo(src)]);
    }
  }, [src]);

  const imageLoaded = (e) => {
    console.log(e);
  };

  const onError = (e) => {
    if (urls.length) {
      setUrl(urls.pop());
    }
  };
  return (
    <>
      {inViewport && url && (
        <x.img src={url} height={height} width={width} onError={onError} onLoad={imageLoaded} {...props} />
      )}
    </>
  );
}
