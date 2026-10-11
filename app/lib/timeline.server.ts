// The career timeline lives in the repo as events.json, so a change ships by
// pull request and no database credential is involved. Vite reads the file
// into the server bundle at build time.
import events from '../../events.json';

export type TimelineEvent = {
  date: string;
  title: string;
  content: string;
  link: { href: string; text: string } | null;
  type: 'event' | 'quote' | 'job' | 'milestone';
};

export async function getTimeline(): Promise<TimelineEvent[]> {
  return [...(events as TimelineEvent[])].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}
