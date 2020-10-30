import { Box, BoxProps } from "@chakra-ui/core";

export default function Page(props: BoxProps) {
    return <Box bg='appBackground' color='white' minH='100vh' w='100%' {...props} />;
}
