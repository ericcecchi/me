import { FormattedDate } from './formatted-date';
import { Card } from './card';
import { Anchor } from './anchor';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { Blockquote, Cite } from './blockquote';
import React from 'react';
import { Event } from '@prisma/client';

export function TimelineCard({
  date,
  title,
  link,
  content,
  ...props
}: React.ComponentProps<typeof Card> & Event) {
  return (
    <Card {...props}>
      {date && (
        <FormattedDate
          from={new Date(date)}
          to="MMMM yyyy"
          className="text-sm text-muted-600 dark:text-muted-400"
        />
      )}

      <h2 className="text-xl font-semibold my-2">&gt; {title}</h2>

      <p>{content}</p>

      {link && (
        <Anchor
          href={link.href}
          rel="noopener"
          target="_blank"
          className="font-semibold mt-4 inline-block space-x-1"
        >
          <span>{link.text}</span>
          <ExternalLinkIcon className="inline-block" />
        </Anchor>
      )}
    </Card>
  );
}

function TimelineQuote({ title, content }: Event) {
  return (
    <Blockquote>
      <p>{content}</p>
      <Cite>{title}</Cite>
    </Blockquote>
  );
}

export function getTimelineComponent(entry: Event) {
  switch (entry.type) {
    case 'quote':
      return TimelineQuote(entry);
    default:
      return TimelineCard(entry);
  }
}
