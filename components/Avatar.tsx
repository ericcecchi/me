import React from 'react';
import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react';

const Avatar: React.FC<AvatarProps> = ({
  name = 'Eric Cecchi',
  src = '/me.jpg',
  ...rest
}) => {
  return <ChakraAvatar name={name} src={src} {...rest} />;
};

export default Avatar;
