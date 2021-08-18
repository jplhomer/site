import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import hydrogen from '@shopify/hydrogen/plugin';
import path from 'path';

import shopifyConfig from './shopify.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hydrogen(shopifyConfig), reactRefresh()],
  resolve: {
    // This is a shitshow and breaks things. Comment out for now.
    // alias: [{find: /@\/(.+)$/, replacement: path.join(__dirname, './src/$1')}],
  },
});
