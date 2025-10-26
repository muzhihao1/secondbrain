/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// Apple-style semantic colors
			colors: {
				// Primary Brand Colors (keeping for backwards compatibility)
				primary: {
					DEFAULT: '#6D5BFF',
					hover: '#8B7FFF',
					active: '#5A4ACC',
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#6D5BFF',
					600: '#5A4ACC',
					700: '#4c3fb3',
					800: '#3e3299',
					900: '#2d2380'
				},

				// Apple-style Background System
				'background-primary': 'rgb(22, 22, 24)',      // 主背景
				'background-secondary': 'rgb(38, 38, 40)',   // 卡片背景
				'background-tertiary': 'rgb(58, 58, 60)',    // 浮动元素

				// Legacy support
				background: {
					base: 'rgb(22, 22, 24)',
					surface: 'rgb(38, 38, 40)',
					muted: 'rgb(58, 58, 60)',
				},

				// Apple-style Fill Colors
				'fill-primary': 'rgba(118, 118, 128, 0.24)',
				'fill-secondary': 'rgba(118, 118, 128, 0.16)',

				// Apple-style Text System
				'text-primary': 'rgb(245, 245, 247)',
				'text-secondary': 'rgb(170, 170, 174)',
				'text-tertiary': 'rgb(110, 110, 115)',

				// Legacy support
				text: {
					base: 'rgb(245, 245, 247)',
					muted: 'rgb(170, 170, 174)',
					subtle: 'rgb(110, 110, 115)',
				},

				// Apple Accent Colors
				'accent': 'rgb(0, 122, 255)',
				'accent-light': 'rgb(10, 132, 255)',

				// Separator
				'separator': 'rgba(84, 84, 88, 0.65)',

				// Status Colors (Apple-style)
				status: {
					success: '#30D158',    // Apple Green
					warning: '#FFD60A',    // Apple Yellow
					error: '#FF453A',      // Apple Red
					info: '#64D2FF',       // Apple Blue
				},

				// Workflow Theme Colors (keeping existing)
				workflow: {
					blue: '#3498DB',
					purple: '#8E44AD',
					green: '#27AE60',
					orange: '#F39C12',
				}
			},

			// Background Gradients for Workflows
			backgroundImage: {
				'gradient-workflow-reflection': 'linear-gradient(135deg, #27AE60, #2ECC71)',
				'gradient-workflow-planning': 'linear-gradient(135deg, #3498DB, #5DADE2)',
				'gradient-workflow-creative': 'linear-gradient(135deg, #8E44AD, #9B59B6)',
				'gradient-workflow-daily': 'linear-gradient(135deg, #F39C12, #F1C40F)',
				'gradient-workflow-monthly': 'linear-gradient(135deg, #2980B9, #3498DB)',
				'gradient-workflow-lifewheel': 'linear-gradient(135deg, #16A085, #1ABC9C)',
			},

			// Apple-style Typography
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'SF Pro',
					'system-ui',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif'
				],
				mono: ['SF Mono', 'Monaco', 'Menlo', 'Consolas', 'monospace']
			},

			fontSize: {
				'large-title': ['2.125rem', { lineHeight: '1.2', fontWeight: '700' }],
				'title-1': ['1.75rem', { lineHeight: '1.2', fontWeight: '700' }],
				'title-2': ['1.375rem', { lineHeight: '1.25', fontWeight: '700' }],
				'headline': ['1.0625rem', { lineHeight: '1.3', fontWeight: '600' }],
				'body': ['1.0625rem', { lineHeight: '1.4', fontWeight: '400' }],
				'callout': ['1rem', { lineHeight: '1.4', fontWeight: '400' }],
				'subhead': ['0.9375rem', { lineHeight: '1.4', fontWeight: '400' }],
				'footnote': ['0.8125rem', { lineHeight: '1.4', fontWeight: '400' }],
				'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
			},

			lineHeight: {
				'normal': '1.6',
				'tight': '1.4',
			},

			// Apple-style Border Radius
			borderRadius: {
				'sm': '0.25rem',   // 4px
				'md': '0.625rem',  // 10px
				'lg': '1.25rem',   // 20px
				'xl': '1.875rem',  // 30px
				'full': '9999px',
			},

			// Apple-style Shadows
			boxShadow: {
				'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.1), 0 1px 3px 0 rgb(0 0 0 / 0.08)',
				'medium': '0 4px 12px 0 rgb(0 0 0 / 0.12), 0 2px 6px 0 rgb(0 0 0 / 0.08)',
				'strong': '0 10px 25px 0 rgb(0 0 0 / 0.15), 0 5px 10px -5px rgb(0 0 0 / 0.1)',
				// Legacy support
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
				'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
			},

			// Apple-style Easing
			transitionTimingFunction: {
				'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
				'apple-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
			},

			// Animations
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideIn: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				spinner: {
					'to': { transform: 'rotate(360deg)' },
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				}
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'slide-in': 'slideIn 0.3s ease-out forwards',
				'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
				'spin-slow': 'spinner 1.5s linear infinite',
				'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},

			// Backdrop Blur
			backdropBlur: {
				'xs': '2px',
				'sm': '4px',
				'md': '8px',
				'lg': '16px',
				'xl': '24px',
				'2xl': '40px',
			}
		}
	},
	plugins: []
};
