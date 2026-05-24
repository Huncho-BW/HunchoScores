// tailwind.config.js (ESM version)
export default {
  theme: {
    extend: {
      screens: {
        'sm-range': { min: '300px', max: '640px' },
        'md-range': { min: '641px', max: '1023px' },
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
};