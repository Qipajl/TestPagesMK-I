import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from 'path';
import * as fs from "node:fs";

export default defineConfig({
    plugins: [
        vue(),

        AutoImport({
            resolvers: [
                ElementPlusResolver()
            ],
        }),

        Components({
            resolvers: [
                ElementPlusResolver()
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 6634,
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'certs/127.0.0.1+2-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/127.0.0.1+2.pem'))
        }
    }
})