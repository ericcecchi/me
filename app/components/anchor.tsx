import { ComponentProps } from 'react';
import { cn } from '~/lib/classnames';
import { Link } from '@remix-run/react';

type AnchorProps = ComponentProps<'a'> | ComponentProps<typeof Link>;

function isAnchorProps(props: AnchorProps): props is ComponentProps<'a'> {
  return 'href' in props;
}

function isLinkProps(props: AnchorProps): props is ComponentProps<typeof Link> {
  return 'to' in props;
}

export function Anchor({ className, ...props }: AnchorProps) {
  if (isAnchorProps(props)) {
    return (
      <a
        className={cn('text-primary-500 underline break-words', className)}
        {...props}
      />
    );
  } else if (isLinkProps(props)) {
    return (
      <Link
        className={cn('text-primary-500 underline break-words', className)}
        {...props}
      />
    );
  }

  return null;
}
