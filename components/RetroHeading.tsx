import { Heading, HeadingProps } from "@chakra-ui/core";
import css from '@emotion/css';

export default function RetroHeading(props: HeadingProps) {
    return (
        <Heading fontSize={{_: '4xl', md: '5xl'}} lineHeight='shorter' mt={{_: 5, sm: 0}}
                 ml={{_: 0, sm: 5}}
                 fontWeight='bold'
                 // @ts-ignore
                 css={css`text-shadow: 1px 1px #1D2135ff, 2px 2px #4299E1, 5px 5px #743df3;`}
                 {...props}
        />
    );
}
