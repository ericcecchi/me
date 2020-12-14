import React from 'react';
import Avatar from '../components/Avatar';
import { Box, Text } from '@chakra-ui/react';
import Anchor from '../components/Anchor';
import Page from '../components/Page';
import RetroBox from '../components/RetroBox';
import RetroHeading from '../components/RetroHeading';
import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <Page>
      <NextSeo
        title="Home"
        description="I’m a web engineer based in Chicago, IL. I’ve been making beautiful and functional user experiences on the
              World Wide Web for over 9 years."
      />
      <Page.Container mt={{ base: 8, sm: '10vh' }}>
        <Box display="flex" alignItems="center" mb={{ base: 5, sm: 8 }}>
          <RetroBox flexShrink={0} borderRadius="full">
            <Avatar size={'xl'} />
          </RetroBox>

          <RetroHeading as="h1" ml={5}>
            I’m a software engineer based in Chicago, IL.
          </RetroHeading>
        </Box>

        <Box fontSize={{ base: 'l', md: 'xl' }}>
          <Text>
            I’ve been making beautiful and functional user experiences on the
            World Wide Web for over a decade. At Sprout Social, I founded and
            grew the team web developers tasked with elevating the brand and
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
            , which draw millions of visitors each month.
          </Text>

          <Text mt={{ base: 5, md: 8 }}>
            For the past two years, I’ve managed a team of software engineers
            building Sprout’s flagship social media management product used by
            over 20,000 customers. Beyond building new features, I’m a fierce
            advocate for improving our app’s UI and UX, accessibility, and
            performance.
          </Text>

          <Text mt={{ base: 5, md: 8 }}>
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
          </Text>

          <Text mt={{ base: 5, md: 8 }} fontWeight="bold">
            —E
          </Text>
        </Box>
      </Page.Container>
    </Page>
  );
};

export default Home;
