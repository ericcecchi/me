import React from 'react';
import { format, formatRelative } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface FormattedDate extends React.ComponentProps<'span'> {
  from: Date;
  to?: string | 'relative';
}

export const FormattedDate: React.FC<FormattedDate> = ({
  from,
  to = 'relative',
  children,
  ...props
}) => {
  const timeZone = 'UTC';

  const fromDate = toZonedTime(from, timeZone);

  const date =
    to === 'relative'
      ? formatRelative(fromDate, new Date())
      : format(fromDate, to);

  return (
    <span {...props}>
      {date}
      {children}
    </span>
  );
};
