import { Anchor } from '~/components/anchor';
import { Page } from '~/components/page';
import { getTimelineComponent } from '~/components/timeline';
import { PageTitle } from '~/components/page-title';
import { json } from '@vercel/remix';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/lib/db';

export const meta = [
  {
    title: 'My Work',
    description:
      'A wayward path from humble beginnings to engineering management at Chicago’s beloved unicorn startup, Sprout Social.',
  },
];

export default function Work() {
  const { timeline } = useLoaderData<typeof loader>();

  return (
    <Page>
      <div className="space-y-6">
        <PageTitle>A (sort of) brief history of me</PageTitle>

        <p className="sm:text-lg">
          A wayward path from humble beginnings to engineering management at
          Chicago’s beloved{' '}
          <Anchor
            href="https://investors.sproutsocial.com/news/news-details/2019/Sprout-Social-Announces-Launch-of-Initial-Public-Offering/default.aspx"
            rel="noopener"
            target="_blank"
          >
            unicorn
          </Anchor>{' '}
          startup, Sprout Social, to building{' '}
          <Anchor
            href="https://www.arcadia.com/press/2gw-community-solar"
            rel="noopener"
            target="_blank"
          >
            an industry-leading community solar platform
          </Anchor>{' '}
          at Arcadia.
        </p>

        {timeline.map((entry) => {
          return <div key={entry.date}>{getTimelineComponent(entry)}</div>;
        })}
      </div>
    </Page>
  );
}

export async function loader() {
  const timeline = await prisma.event.findMany({
    orderBy: { date: 'desc' },
  });
  return json({ timeline });
}
