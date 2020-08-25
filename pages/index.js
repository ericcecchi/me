import React from 'react';
import '../styles/index.css';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="container mx-auto py-8 px-3">
      <header className="font-sans">
        <Link href="/">
          <a className="font-bold no-underline text-gray-500 hover:text-blue-700">
            Eric Cecchi
          </a>
        </Link>
      </header>

      <section id="about" className="max-w-lg mt-16 lg:mt-32">
        <h1 className="mb-5 md:mb-8 text-3xl md:text-5xl leading-tight">
          I’m a web engineer based in Chicago, IL.
        </h1>
        <p>
          I’ve been making beautiful and functional user experiences on the
          World Wide Web for over 9 years. I have spent the majority of that
          time at Sprout Social, where I founded and grew the team web developers
          tasked with elevating our brand and growing our customer base through
          digital marketing, including the{' '}
          <a href="https://sproutsocial.com/" rel="noopener" target="_blank">
            website
          </a>{' '}
          and{' '}
          <a
            href="https://sproutsocial.com/insights/"
            rel="noopener"
            target="_blank"
          >
            Insights blog
          </a>
          , which draw over 1.5 million visitors each month.  Now, I
          manage a team of web and platform engineers building our flagship
          social media management software product used by over 20,000 customers.
        </p>

        <p className="mt-5 md:mt-8">
          I’m a husband and a father, a thinker and a tinkerer, a minimalist and{' '}
          <a href="http://www.sleepingatlast.com/blog/2018/6/8/five">
            an observer
          </a>
          . You wont’t find me on social media, so you can write me the
          old-fashioned way at{' '}
          <a href="mailto:eric.cecchi@gmail.com">eric.cecchi@gmail.com</a>.
        </p>

        <p className="mt-5 md:mt-8 font-bold">—E</p>
      </section>
    </main>
  );
};

export default Home;
