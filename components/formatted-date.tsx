import React from 'react';
import { format, formatRelative, parse } from 'date-fns';

interface FormattedDate extends React.ComponentProps<'span'> {
  children: string;
  from?: string;
  to?: string | 'relative';
}

export const FormattedDate: React.FC<FormattedDate> = ({
  from = '',
  to = 'relative',
  children,
  ...props
}) => {
  const fromDate = from
    ? parse(children, from, new Date())
    : new Date(children);

  const date =
    to === 'relative'
      ? formatRelative(fromDate, new Date())
      : format(fromDate, to);

  return <span {...props}>{date}</span>;
};
