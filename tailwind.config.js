const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        default: {
          css: {
            color: theme('colors.gray.900'),

            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
          },
        },

        dark: {
          css: {
            color: theme('colors.gray.100'),

            a: {
              color: theme('colors.blue.100'),
              '&:hover': {
                color: theme('colors.blue.100'),
              },
            },

            h1: {
              color: theme('colors.gray.100'),
            },

            h2: {
              color: theme('colors.gray.100'),
            },

            strong: {
              color: theme('colors.gray.100'),
            },

            code: {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
};
