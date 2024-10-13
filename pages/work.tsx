import { NextSeo } from 'next-seo';
import { Anchor } from '../components/anchor';
import { Page } from '../components/page';
import { TimelineCard } from '../components/timeline-card';
import { PageTitle } from '../components/page-title';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

const timeline = [
  {
    date: '05-2010',
    title: 'Graduated from Michigan State University',
    content:
      'Graduated with a B.S. in Mathematics. Took Intro to Programming as an elective in my third and final year of college. Worked 3 weeks ahead and completed the lab exercises prior to class. My passion for programming was ignited.',
  },
  {
    date: '08-2010',
    title: 'Started grad school',
    content:
      'Began to work on my Masters in Teaching. Craving puzzles and code challenges, I continued to read about computer science and work on programming exercises in my free time.',
  },
  {
    date: '01-2011',
    title: 'First opportunity',
    content:
      'Approached by a friend looking for an Android developer to build an app for his new nonprofit. Young, naive, and hungry to learn, I said, “Yes” and started to learn Java.',
  },
  {
    date: '05-2011',
    title: 'Released an Android app',
    content:
      'Taught myself Java and the Android SDK, created a UI with Photoshop and Illustrator, and developed the app in 4 months—while simultaneously designing a website for the nonprofit.',
  },
  {
    date: '06-2011',
    title: 'Internship at Redemption Bible Church',
    content:
      "Embarked on a volunteer internship at my church, focused on graphic and web design. In 3 months, my mentor and I redesigned the church's brand, rebuilt the website, and created brand identities for 7 programs and events.",
  },
  {
    date: '01-2012',
    title: 'Embraced the freelance life',
    content:
      'Designed and developed 7 Wordpress-based websites and blogs in 2 years. Helped pay my way through grad school and then some.',
  },
  {
    date: '07-2012',
    title: 'Just for fun',
    content:
      'Completed 3 CodeSchool courses for Ruby on Rails in 2 months. Designed, developed, and deployed a MongoDB + Nginx + Rails pet project on Amazon EC2.',
  },
  {
    date: '03-2013',
    title: 'Built my first single-page app',
    content:
      'Built a Markdown-based, flat-file backend in PHP and a jQuery + AJAX frontend for my blog. My first single-page app was born.',
  },
  {
    date: '04-2013',
    title: 'Built my second single-page app (and got PAID)',
    content:
      'Built a simple web app to replace the Android app I developed 1.5 years ago. Used a Github repo to host Markdown files, parsed them to JSON in PHP, then rendered the content with a jQuery + AJAX frontend. Developed and deployed in 2 weeks.',
  },
  {
    date: '05-2013',
    title: 'Tech coordinator at Keller Williams Success Realty',
    content:
      'Designed web and print marketing materials for real estate agents. Wrote and published numerous web technology guides and tutorials. Designed and developed recruiting and personal websites for agents.',
  },
  {
    date: '04-2014',
    title: 'Built a SasS product, marketed it, and tried to run a business',
    content:
      'Developed and deployed a Meteor.js web app for building personal landing pages. Used a mobile-first, responsive approach to design. Coded the backend in Coffeescript and frontend in Coffeescript, LESS, and HTML templates.',
  },
  {
    date: '08-2014',
    title: 'Pioneered marketing development at Sprout Social',
    content:
      'Talked my way into an incredible company despite having just a handle of Wordpress sites, a few pet projects, and a lot of gusto.',
  },
  {
    date: '12-2014',
    title: 'Built my first design system',
    content:
      'Refactored the website to use semantic HTML and CSS in place of one-offs. Added Sass variables to standardize colors, font sizes, and more. Implemented responsive design methods. Created shared templates from bespoke pages.',
  },
  {
    date: '07-2015',
    title: 'Hired a human',
    content:
      'Finding the right person is hard, but I got really lucky on my first attempt to hire someone. It was probably the single best decision I made in my career. (He’s pretty great, as far as humans go.)',
    link: {
      text: 'Check out my first hire’s website',
      href: 'https://conwaydev.com/',
    },
  },
  {
    date: '04-2016',
    title: 'Ventured into Engineering Management',
    content:
      'It was like when my dad handed me the keys to the car for the first time: equal parts empowering and f*ing terrifying.',
    link: {
      text: 'View my Manager README',
      href: 'https://managerreadme.com/readme/ericcecchi',
    },
  },
  {
    date: '06-2016',
    title: 'Turned over a new leaf',
    content:
      'All the template-making and design system work paid dividends pretty quickly. Rebranding the company is a helluva lot easier when you just need to update a few color variables used throughout hundreds of website and blog pages.',
  },
  {
    date: '03-2017',
    title: 'Architected a headless CMS and static site generator',
    content:
      'Created a utility-class-based CSS framework built on Seeds. Integrated custom, branded components as Twig templates with a Wordpress page builder. Wrote custom plugins to optimize pages and individually deploy them to AWS S3 and Cloudfront as AMP-compliant static HTML. Blew away the competition with page speed scores and watch conversion rates climb.',
    link: {
      text: 'View sproutsocial.com',
      href: 'https://sproutsocial.com/',
    },
  },
  {
    date: '06-2017',
    title: 'Climbed another rung on the corporate ladder',
    content:
      'Somehow they let me get away with putting Señor Engineer on my nameplate.',
  },
  {
    date: '10-2017',
    title: 'Planted Seeds',
    content:
      'Invited to join the team tasked with building a new, unified design system to power brand and product development at Sprout—Seeds. Implemented a “design token”-based system that output color palettes, typography styles, spacing values, border radii, shadow and animation values, and more. The system generated SCSS, JS, Swift, and other assets for design tools, web development, mobile development.',
    link: {
      text: 'View design tokens on the Seeds website',
      href: 'https://seeds.sproutsocial.com/visual/',
    },
  },
  {
    date: '08-2018',
    title: 'Won a Value Award',
    content:
      'I was recognized for my work throughout my tenure at Sprout, including establishing the first design systems used in web development at Sprout and running point on bringing our marketing web properties into compliance the the GDPR and ePrivacy regulations. I received the award for embodying the Sprout Value of “Embracing Accountability.”',
    link: {
      text: 'Learn more about the Sprout Values',
      href: 'https://seeds.sproutsocial.com/brand/values/',
    },
  },
  {
    date: '03-2019',
    title: 'Transitioned to the product team',
    content:
      'After 4.5 years at the helm of the engineering team in marketing, I stepped into an engineering management role on the product team. My first task? Migrating the heart of Sprout—the social media Smart Inbox—to React.js.',
    link: {
      text: 'Check out the Smart Inbox',
      href: 'https://sproutsocial.com/features/social-media-engagement/',
    },
  },
  {
    date: '12-2019',
    title: 'Redesigned the web app',
    content:
      'Redesigned every pixel of our web app in just 6 months. Created new React components for our design system, replaced bespoke components throughout the app with design system components, and finessed CSS to be theme-aware in legacy parts of our app. The result? A cohesive UI. Unprecedented levels of shared code. A seamless rollout. And >85% positive customer feedback.',
    link: {
      text: 'See some components I built in Seeds',
      href: 'https://seeds.sproutsocial.com/components/',
    },
  },
  {
    date: '09-2020',
    title: 'Promoted to Staff Software Engineer',
    content:
      'Yep, Staff, like a wizard, but less awesome. (Still a pretty great job, though.)',
  },
  {
    date: '04-2021',
    title: 'Joined Arcadia to solve climate change',
    content:
      'My passion for making a positive impact on the world led me to join Arcadia, a company on the front lines of the fight against climate change. I joined as an Engineering Manager to grow and lead a team of engineers building the billing and payments platform.',
  },
  {
    date: '09-2021',
    title: 'Promoted to Senior Engineering Manager',
    content:
      'We were growing fast and I was growing with the company. Our CTO took me under his wing and gave me the opportunity to make a broader impact. I took on managing multiple teams and led the initiatives such as revamping the engineering career ladder and building a new onboarding program.',
  },
];
const reverseTimeline = timeline.slice().reverse();

export const Work: React.FC = () => {
  return (
    <>
      <NextSeo
        title="My Work"
        description="A wayward path from humble beginnings to engineering management at
          Chicago’s beloved unicorn startup, Sprout Social."
      />

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
            startup, Sprout Social, to building an industry-leading community
            solar platform at Arcadia.
          </p>

          {reverseTimeline.map(({ content, date, title, link }) => {
            return (
              <TimelineCard key={title} date={date}>
                <h2 className="text-xl font-semibold mb-2">&gt; {title}</h2>

                {content && <p>{content}</p>}

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
              </TimelineCard>
            );
          })}
        </div>
      </Page>
    </>
  );
};

export default Work;
