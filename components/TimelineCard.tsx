import React from 'react';
import { Box, useColorModeValue, Flex, Text } from '@chakra-ui/react';
import { FormattedDate } from './FormattedDate';
import styled from '@emotion/styled';
import { Card } from './Card';

interface TimelineCard {
  date: string;
}

const Line = styled(Box)``;
const TimelineContainer = styled(Flex)`
  &:first-of-type ${Line} {
    margin-top: 1.25rem;
  }
  &:last-of-type ${Line} {
    height: 1.25rem;
  }
`;

export const TimelineCard: React.FC<TimelineCard> = ({
  children,
  date,
  ...props
}) => {
  const lineBg = useColorModeValue('gray.300', 'brand.300');
  const dotBg = useColorModeValue('purple.300', 'purple.300');

  return (
    <TimelineContainer align="stretch" position="relative">
      <Text
        display={['none', 'block']}
        w="14ch"
        flex={'0 0 auto'}
        textAlign="right"
        pr={6}
        mt={5}
      >
        {date && (
          <FormattedDate
            fontSize="sm"
            as="span"
            from="MM-yyyy"
            to="MMMM yyyy"
            mb={2}
          >
            {date}
          </FormattedDate>
        )}
      </Text>

      <Line
        minW="2px"
        bg={lineBg}
        mr={10}
        flexShrink={0}
        position="relative"
        left={['1.5ch', 0]}
      />

      <Box
        mt={5}
        position={'absolute'}
        display={'block'}
        bg={dotBg}
        left={[0, '12.5ch']}
        w="3ch"
        h="3ch"
        borderRadius={'full'}
        flexShrink={0}
      />

      <Card mb={6} {...props}>
        {date && (
          <FormattedDate
            display={['block', 'none']}
            fontSize="sm"
            as="span"
            from="MM-yyyy"
            to="MMMM yyyy"
            mb={2}
          >
            {date}
          </FormattedDate>
        )}

        {children}
      </Card>
    </TimelineContainer>
  );
};

export default TimelineCard;
