import React from 'react';
import Link from 'next/link';
import Avatar from '../components/Avatar';
import {Box, Text} from '@chakra-ui/core'
import Anchor from '../components/Anchor';
import Page from '../components/Page';
import RetroHeading from '../components/RetroHeading';

const Home = () => {
    return (
        <Page>
            <Box as='main' mx='auto' maxWidth='6xl' py={8} px={3}>
                <Box as='section' id="about" maxWidth='2xl' mt={{_: 16, lg: 48}}>
                    <Box display={{sm: 'flex'}} alignItems='center' mb={{_: 5, md: 8}}>
                        <Box flexShrink={0}>
                            <Avatar/>
                        </Box>
                        <RetroHeading as='h1'>
                            I’m a web engineer based in Chicago, IL.
                        </RetroHeading>
                    </Box>

                    <Box fontSize={{_: 'l', md: 'xl'}}>
                        <Text>
                            I’ve been making beautiful and functional user experiences on the
                            World Wide Web for over 9 years. I have spent the majority of that
                            time at Sprout Social, where I founded and grew the team web developers
                            tasked with elevating our brand and growing our customer base through
                            digital marketing, including the{' '}
                            <Anchor href="https://sproutsocial.com/" rel="noopener" target="_blank">
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
                            , which draw over 1.5 million visitors each month. Now, I
                            manage a team of web and platform engineers building our flagship
                            social media management software product used by over 20,000 customers.
                        </Text>

                        <Text mt={{_: 5, md: 8}}>
                            I’m a husband and a father, a thinker and a tinkerer, a minimalist and{' '}
                            <Anchor href="http://www.sleepingatlast.com/blog/2018/6/8/five">
                                an observer
                            </Anchor>
                            . You wont’t find me on social media, so you can write me the
                            old-fashioned way at{' '}
                            <a href="mailto:eric.cecchi@gmail.com">eric.cecchi@gmail.com</a>.
                        </Text>

                        <Text mt={{_: 5, md: 8}} fontWeight='bold'>—E</Text>
                    </Box>
                </Box>
            </Box>
        </Page>
    );
};

export default Home;
