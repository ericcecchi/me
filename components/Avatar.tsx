import { Image } from '@chakra-ui/core';

const Avatar = ({
  src = '/me.jpg',
  width = '100px',
  height = '100px',
  ...rest
}) => {
  return (
    <Image
      display="block"
      rounded="full"
      src={src}
      htmlWidth={width}
      htmlHeight={height}
      {...rest}
    />
  );
};

export default Avatar;
