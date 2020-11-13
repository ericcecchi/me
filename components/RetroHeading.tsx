import { Heading, HeadingProps } from '@chakra-ui/core';
import css from '@emotion/css';

export default function RetroHeading(props: HeadingProps) {
  return (
    <Heading
      fontSize={{ _: '4xl', md: '5xl' }}
      lineHeight="shorter"
      color="white"
      fontWeight="bold"
      // @ts-ignore
      css={css`
        text-shadow: 1px 1px #1d2135ff, 2px 2px #4299e1, 5px 5px #743df3;
      `}
      {...props}
    />
  );
}
