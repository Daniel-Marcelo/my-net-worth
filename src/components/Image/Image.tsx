import { x } from "@xstyled/styled-components";
import { useEffect, useRef, useState } from "react";
import { XStyledProps } from "../../types";
import axios from "axios";

interface MyImageProps {
  src: string;
  width: string;
  height: string;
  inViewport: boolean;
  ticker?: string;
}

const iconPathOne = (url: string) =>
  `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=96`;
const iconPathTwo = (url: string) => `icons.duckduckgo.com/ip2/${url}.ico`;

export function Image({ ticker, src, width, height, inViewport, ...props }: MyImageProps & XStyledProps) {
  const ref = useRef<HTMLImageElement>();
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (url) {
      const get = async () => {
        const data = await axios.get(url);
        console.log(data);
      };
      get();
    }
  }, [url]);

  console.log(ref);
  useEffect(() => {
    if (src) {
      setUrl(iconPathOne(src));
      setUrls([iconPathTwo(src)]);
    }
  }, [src]);

  const imageLoaded = (e) => {
    // eslint-disable-next-line no-console
    console.log(e);
    const element = ref.current;
    if (ticker && element?.height < 20) {
      setUrl(`https://s3.polygon.io/logos/${ticker}/logo.png`);
    }
  };

  const onError = () => {
    if (urls.length) {
      setUrl(urls.pop());
    }
  };
  return (
    <>
      {inViewport && url && (
        <x.img ref={ref} width={width} height={height} src={url} onError={onError} onLoad={imageLoaded} {...props} />
      )}
    </>
  );
}
