import React from 'react';

export function Avatar({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, className = "" }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img src={src} alt={alt} className={`aspect-square h-full w-full object-cover ${className}`} />
  );
}

export function AvatarFallback({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 font-medium ${className}`} {...props}>
      {children}
    </div>
  );
}
