"use client";

import Image from "next/image";
import { isDataImage } from "@/lib/image-upload";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  priority,
}: Props) {
  if (isDataImage(src)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className || ""}`} />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
