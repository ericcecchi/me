import React from 'react';
import { format, formatRelative, parse } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

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
  const timeZone = 'America/Chicago';

  const fromDate = from
    ? toZonedTime(parse(children, from, new Date()), timeZone)
    : toZonedTime(new Date(children), timeZone);

  const date =
    to === 'relative'
      ? formatRelative(fromDate, new Date())
      : format(fromDate, to);

  return <span {...props}>{date}</span>;
};
