import { Avatar } from '../components/avatar';
import { Anchor } from '../components/anchor';
import Page from '../components/page';
import { PageTitle } from '../components/page-title';
import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <>
      <NextSeo
        title="Home"
        description="I’m a web engineer based in Chicago, IL. I’ve been making beautiful and functional user experiences on the
              World Wide Web for over 9 years."
      />

      <Page>
        <div className="flex flex-col items-center mt-auto">
          <header className="md:flex items-center md:space-x-6 sm:mt-24 mt-12 mb-6">
            <div className="flex-0 mb-4 md:mb-0">
              <Avatar className="w-24 h-24" />
            </div>
            <PageTitle className="m-0">
              I’m a software engineer based in Chicago, IL.
            </PageTitle>
          </header>

          <section className="space-y-6 sm:text-lg leading-relaxed">
            <p>
              I’ve been making beautiful and functional user experiences on the
              World Wide Web for 15 years. At Sprout Social, I founded and grew
              the team web developers tasked with elevating the brand and
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
              , which draw millions of visitors each month. After that, I
              managed a team of software engineers building Sprout’s flagship
              social media management product used by over 30,000 customers.
            </p>

            <p>
              In 2021, I joined{' '}
              <Anchor
                href="https://www.arcadia.com"
                rel="noopener"
                target="_blank"
              >
                Arcadia
              </Anchor>{' '}
              to help build a platform that makes renewable energy more
              accessible to everyone. As a Senior Staff Engineer, I help cast
              the vision for our team’s technical direction and guide the
              implementation of our product roadmap. I work closely with product
              managers, designers, and other engineers to deliver features that
              help our customers save money and reduce their carbon footprint.
              Beyond building new features, I’m a fierce advocate for improving
              our app’s UI and UX, accessibility, and performance.
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
              . You wont’t find me on social media, so you can write me the
              old-fashioned way at{' '}
              <a href="mailto:eric.cecchi@gmail.com">eric.cecchi@gmail.com</a>.
            </p>

            <p>—E</p>
          </section>
        </div>
      </Page>
    </>
  );
};

export default Home;
