import { FormattedDate } from './formatted-date';
import { Card } from './card';
import { Anchor } from './anchor';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { Blockquote, Cite } from './blockquote';
import React from 'react';

export type TimelineEntry = {
  type: 'event' | 'milestone' | 'job' | 'quote';
  date: string;
  title: string;
  content: string;
  link?: {
    text: string;
    href: string;
  };
};

export function TimelineCard({
  date,
  title,
  link,
  content,
  ...props
}: React.ComponentProps<typeof Card> & TimelineEntry) {
  return (
    <Card {...props}>
      {date && (
        <FormattedDate
          from="MM-yyyy"
          to="MMMM yyyy"
          className="text-sm text-muted-600 dark:text-muted-400"
        >
          {date}
        </FormattedDate>
      )}

      <h2 className="text-xl font-semibold my-2">&gt; {title}</h2>

      <p>{content}</p>

      {link && (
        <Anchor
          href={link.href}
          rel="noopener"
          target="_blank"
          className="font-semibold mt-4 flex items-center space-x-1"
        >
          <span>{link.text}</span>
          <ExternalLinkIcon />
        </Anchor>
      )}
    </Card>
  );
}

function TimelineQuote({ title, content }: TimelineEntry) {
  return (
    <Blockquote>
      <p>{content}</p>
      <Cite>{title}</Cite>
    </Blockquote>
  );
}

export function getTimelineComponent(entry: TimelineEntry) {
  switch (entry.type) {
    case 'quote':
      return TimelineQuote(entry);
    default:
      return TimelineCard(entry);
  }
}
