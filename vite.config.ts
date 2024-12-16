import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import postcss from './postcss.config'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'

const prefix = process.env.NODE_ENV === 'development' ? './public/' : './'
// https://vitejs.dev/config/
export default defineConfig({
    publicDir: './public',
    plugins: [
        uni(),
        AutoImport({
          dts: false, // 需要更新配置的时候设置为true，可自动更新根目录的auto-imports.d.ts，否则设置为false，避免auto-imports.d.ts在项目运行时重新生成
          imports: [ // 需要自动导入的插件，自定义导入的API
            'vue',
            'vue-router',
            'pinia',
            'uni-app',
            {
              '@/store': ['useCommonStore', 'i18nStore', 'useUsersStore'],
              '@/common': ['i18n','ga', 'ErrorHandler'],
              '@/lib/components/Modal': ['modal']
            }
          ]
        })
        // VitePWA({
        //     mode: 'production',
        //     devOptions: {
        //         enabled: process.env.NODE_ENV !== 'dev',
        //         /* when using generateSW the PWA plugin will switch to classic */
        //         type: 'module',
        //     },
        //     filename: 'own_lobby_bra.sw.js',
        //     manifestFilename: 'own_lobby_bra.webmanifest',
        //     injectRegister: null,
        //     includeManifestIcons: false,
        //     includeAssets: './public',
        //     registerType: 'autoUpdate',
        //     workbox: {
        //         cacheId: 'lobby-cache',
        //         globPatterns: [],
        //         navigateFallback: null,
        //         runtimeCaching: [
        //             {
        //                 urlPattern: ({ url }) => {
        //                     return url.pathname.startsWith('/api')
        //                 },
        //                 handler: 'NetworkFirst',
        //                 options: {
        //                     cacheName: 'lobby-api',
        //                     cacheableResponse: {
        //                         statuses: [200],
        //                     },
        //                 },
        //             },
        //             {
        //                 urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
        //                 handler: 'NetworkFirst',
        //                 options: {
        //                     cacheName: 'lobby-images',
        //                     expiration: {
        //                         // 最多30个图
        //                         maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
        //                         maxAgeSeconds: 24 * 60 * 60,
        //                     },
        //                 },
        //             },
        //             {
        //                 urlPattern: /.*\.js$/,
        //                 handler: 'CacheFirst',
        //                 options: {
        //                     cacheName: 'lobby-js',
        //                     expiration: {
        //                         maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
        //                         maxAgeSeconds: 24 * 60 * 60,
        //                     },
        //                     cacheableResponse: {
        //                         statuses: [200],
        //                     },
        //                 },
        //             },
        //             {
        //                 urlPattern: /.*\.css.*/,
        //                 handler: 'CacheFirst',
        //                 options: {
        //                     cacheName: 'lobby-css',
        //                     expiration: {
        //                         maxEntries: 30,
        //                         maxAgeSeconds: 24 * 60 * 60,
        //                     },
        //                     cacheableResponse: {
        //                         statuses: [200],
        //                     },
        //                 },
        //             },
        //             {
        //                 urlPattern: ({ url }) => {
        //                     return (
        //                         /.*\.html.*/.test(url.pathname) ||
        //                         url.pathname === '/'
        //                     )
        //                 },
        //                 handler: 'NetworkFirst',
        //                 options: {
        //                     cacheName: 'lobby-html',
        //                     expiration: {
        //                         maxEntries: 20,
        //                         maxAgeSeconds: 24 * 60 * 60,
        //                     },
        //                     cacheableResponse: {
        //                         statuses: [200],
        //                     },
        //                 },
        //             },
        //         ],
        //     },
        //     manifest: {
        //         short_name: 'LUCRO777',
        //         name: 'LUCRO777',
        //         description: 'LUCRO777',
        //         id: 'LUCRO777',
        //         start_url: './',
        //         scope: '.',
        //         icons: [
        //             {
        //                 src: prefix + 'icon/own_lobby_bra/192x192.png',
        //                 sizes: '192x192',
        //                 type: 'image/png',
        //             },
        //             {
        //                 src: prefix + 'icon/own_lobby_bra/512x512.png',
        //                 sizes: '512x512',
        //                 type: 'image/png',
        //             },
        //         ],
        //         background_color: '#0e0e0f',
        //         display: 'standalone',
        //         theme_color: '#0e0e0f',
        //     },
        // }),
    ],
    css: {
        postcss,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
})
