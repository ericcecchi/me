import React, { PropsWithChildren } from 'react';
import { FormattedDate } from './formatted-date';
import { Card } from './card';

type TimelineCard = React.ComponentProps<'div'> & {
  date: string;
};

/**
 * Timeline
 */

export const TimelineCard: React.FC<PropsWithChildren<TimelineCard>> = ({
  children,
  date,
  ...props
}) => {
  return (
    <Card {...props}>
      {date && (
        <FormattedDate
          from="MM-yyyy"
          to="MMMM yyyy"
          className="text-sm text-muted"
        >
          {date}
        </FormattedDate>
      )}

      {children}
    </Card>
  );
};
