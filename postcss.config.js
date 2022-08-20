import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './src/assets/css/tailwind.config';

module.exports = {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};
