import {Box, Flex} from "@chakra-ui/core";
import Page from "../../components/Page";
import RetroHeading from "../../components/RetroHeading";

export default function TheVerse() {
    return (
        <Page>
            <Flex height='100vh' alignItems='center' justifyContent='center'>
                <RetroHeading as='h1'>The Verse</RetroHeading>
            </Flex>
        </Page>
    );
}
