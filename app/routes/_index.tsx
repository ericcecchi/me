import { Avatar } from '~/components/avatar';
import { Anchor } from '~/components/anchor';
import Page from '~/components/page';
import { PageTitle } from '~/components/page-title';

export const meta = [
  {
    title: 'Home',
    description:
      'I’m a software and security engineering leader based in Chicago, IL. I’ve been making beautiful and functional user experiences on the World Wide Web for 15 years.',
  },
];

export default function Home() {
  return (
    <Page>
      <div className="flex flex-col items-center mt-auto">
        <header className="md:flex items-center md:space-x-6 sm:mt-24 mt-12 mb-6">
          <div className="flex-0 mb-4 md:mb-0">
            <Avatar className="w-24 h-24" />
          </div>
          <PageTitle className="m-0">
            I’m a software and security engineering leader based in Chicago, IL.
          </PageTitle>
        </header>

        <section className="space-y-6 sm:text-lg leading-relaxed">
          <p>
            I currently lead security engineering at{' '}
            <Anchor
              href="https://www.arcadia.com"
              rel="noopener"
              target="_blank"
            >
              Arcadia
            </Anchor>
            , helping protect a platform that makes renewable energy accessible
            to everyone. My work centers on cloud infrastructure security,
            vendor security assessments, and compliance and audit
            support—ensuring our systems and data stay secure as we scale.
            Before stepping into security leadership, I worked as a Staff and
            Senior Staff Engineer guiding platform architecture and technical
            direction across our teams.
          </p>

          <p>
            I’ve also been making beautiful and functional user experiences on
            the World Wide Web for 15 years. At Sprout Social, I founded and
            grew the team of web developers tasked with elevating the brand and
            growing the customer base through digital marketing, including the{' '}
            <Anchor
              href="https://sproutsocial.com/"
              rel="noopener"
              target="_blank"
            >
              website
            </Anchor>{' '}
            and{' '}
            <Anchor
              href="https://sproutsocial.com/insights/"
              rel="noopener"
              target="_blank"
            >
              Insights blog
            </Anchor>
            , which draw millions of visitors each month. After that, I managed
            a team of software engineers building Sprout’s flagship social media
            management product used by over 30,000 customers. Years of frontend
            and software engineering give me a pragmatic perspective on
            security: grounded in how developers actually work and how systems
            are built.
          </p>

          <p>
            I’m a husband and a father, a thinker and a tinkerer, a minimalist
            and{' '}
            <Anchor
              href="http://www.sleepingatlast.com/blog/2018/6/8/five"
              rel="noopener"
              target="_blank"
            >
              an observer
            </Anchor>
            . You won’t find me on social media, so you can write me the
            old-fashioned way at{' '}
            <Anchor href="mailto:eric.cecchi@gmail.com">
              eric.cecchi@gmail.com
            </Anchor>
            .
          </p>

          <p>—E</p>
        </section>
      </div>
    </Page>
  );
}
