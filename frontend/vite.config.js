import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
            enabled: true
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
            name: 'Warehouse',
            short_name: 'Warehouse',
            start_url: '/',
            icons: [
                {
                    src: '/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '/android-chrome-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ],
            theme_color: '#ffffff',
            background_color: '#ffffff',
            display: 'standalone'
        }

    })],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
        }
    },
    server: {
        proxy: {
            '/api': { target: 'http://localhost:3000' }
        }
    }
})
