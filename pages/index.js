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
        <h1 className="mb-5 md:mb-8 text-3xl md:text-5xl">
          I’m a web engineer based in Chicago, IL.
        </h1>
        <p>
          I’ve been making beautiful and functional user experiences on the
          World Wide Web for over 8 years. I have spent the majority of that
          time at Sprout Social, where I led development of the{' '}
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
          , which draws over 1.5 million pairs of eyeballs monthly.
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
