"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  fallbackSrc: string;
};

/**
 * next/image with a single retry on the fallback asset, so a dead remote
 * photo never leaves a broken frame.
 */
export default function SafeImage({
  src,
  fallbackSrc,
  alt,
  ...props
}: SafeImageProps) {
  const [current, setCurrent] = useState(src);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
