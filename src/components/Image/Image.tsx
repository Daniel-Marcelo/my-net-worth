import { x } from "@xstyled/styled-components";
import { useEffect, useState } from "react";
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
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (src) {
      setUrl(iconPathOne(src));
      setUrls([iconPathTwo(src)]);
    }
  }, [src]);

  const imageLoaded = (e) => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  const onError = () => {
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
