import React from 'react';
import { cn } from '~/lib/classnames';

type Avatar = React.ComponentProps<'img'>;

export function Avatar({
  alt = 'Eric Cecchi',
  src = '/me.jpg',
  className,
  ...rest
}: Avatar) {
  return (
    <div
      className={cn(
        `flex-0 rounded-full border-cyan-500 border-4 overflow-hidden w-8 h-8`,
        className,
      )}
    >
      <img alt={alt} src={src} {...rest} />
    </div>
  );
}

export default Avatar;
