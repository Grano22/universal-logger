import {defineConfig} from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/Logger.ts'),
            name: 'Flagger',
            fileName: 'FlaggerFeaturesManager'
        }
    },
    server: {
      watch: {
        usePolling: true
      }
    },
})
