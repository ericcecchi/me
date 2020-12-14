import React from 'react';
import { format, formatRelative, parse } from '../lib/date';
import { Text, TextProps } from '@chakra-ui/react';

interface FormattedDate extends TextProps {
  children: string;
  from?: string;
  to?: string | 'relative';
}

export const FormattedDate: React.FC<FormattedDate> = ({
  from = '',
  to = 'relative',
  children,
  ...props
}) => {
  const fromDate = from
    ? parse(children, from, new Date())
    : new Date(children);

  const date =
    to === 'relative'
      ? formatRelative(fromDate, new Date())
      : format(fromDate, to);

  return <Text {...props}>{date}</Text>;
};
