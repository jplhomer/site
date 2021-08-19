import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import hydrogen from '@shopify/hydrogen/plugin';
import mdPlugin from 'vite-plugin-markdown';

import shopifyConfig from './shopify.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hydrogen(shopifyConfig), reactRefresh(), mdPlugin({mode: 'html'})],
  resolve: {
    // This is a shitshow and breaks things. Comment out for now.
    // alias: [{find: /@\/(.+)$/, replacement: path.join(__dirname, './src/$1')}],
  },
  optimizeDeps: {
    include: ['@heroicons/react/solid', '@heroicons/react/outline'],
  },
});
