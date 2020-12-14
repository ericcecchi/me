import { extendTheme, theme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  useSystemColorMode: true,
  styles: {
    global: (props) => ({
      'html, body': {
        bg: mode('white', 'brand.800')(props),
        color: mode('brand.800', 'whiteAlpha.900')(props),
        scrollBehavior: 'smooth',
      },
    }),
  },
  colors: {
    brand: {
      50: '#eef0fb',
      100: '#ced1e4',
      200: '#aeb3cf',
      300: '#8d94bc',
      400: '#6d76a9',
      500: '#535c90',
      600: '#414870',
      700: '#2e3350',
      800: '#1b1f31',
      900: '#080a15',
    },
  },
  components: {
    NavLink: {
      baseStyle: ({ colorMode }: { colorMode: string }) => ({
        display: 'inline-flex',
        alignItems: 'center',
        color: colorMode === 'dark' ? 'brand.300' : 'brand.600',
        px: 3,
        py: 2,
        borderRadius: '3xl',
        _hover: {
          color: colorMode === 'dark' ? 'brand.200' : 'brand.700',
          bg: colorMode === 'dark' ? 'brand.700' : 'gray.200',
        },
      }),
      variants: {
        active: {
          fontWeight: 'semibold',
        },
      },
    },
  },
});

export default customTheme;
