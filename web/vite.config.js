import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	// Explicitly inject environment variables from Vercel
	define: {
		'import.meta.env.PUBLIC_VOICE_API_URL': JSON.stringify(
			process.env.PUBLIC_VOICE_API_URL || ''
		),
		'import.meta.env.PUBLIC_API_URL': JSON.stringify(
			process.env.PUBLIC_API_URL || 'https://obsidian-api.chuhaihub.org'
		),
		'import.meta.env.PUBLIC_API_KEY': JSON.stringify(
			process.env.PUBLIC_API_KEY || ''
		)
	},
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['icons/*.png'],
			manifest: {
				name: 'Quick Capture',
				short_name: 'QuickCapture',
				description: 'AI-powered knowledge capture for Obsidian',
				theme_color: '#7c3aed',
				background_color: '#1e1b4b',
				display: 'standalone',
				orientation: 'portrait-primary',
				icons: [
					{
						src: '/icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
				runtimeCaching: [
					{
						urlPattern: /^http:\/\/localhost:8000\/api\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 60 * 24 // 24 hours
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			}
		})
	],
	server: {
		port: 5173,
		host: true, // Allow external connections (for mobile testing)
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true
			}
		}
	}
});
