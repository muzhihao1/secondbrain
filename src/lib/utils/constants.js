/**
 * Application-wide constants
 */

// Helper function to get environment variables with validation
function getEnv(key, fallback) {
	const val = import.meta.env[key];
	return (val !== undefined && String(val).trim() !== '') ? val : fallback;
}

// Default URLs for different environments
const DEFAULT_API_URL_PRODUCTION = 'https://obsidian-api.chuhaihub.org';
const DEFAULT_API_URL_LOCAL = 'https://127.0.0.1:27124';

// API Configuration - Obsidian Local REST API
export const API_BASE_URL = getEnv(
	'VITE_API_URL',
	import.meta.env.DEV ? DEFAULT_API_URL_LOCAL : DEFAULT_API_URL_PRODUCTION
);
export const API_KEY = getEnv('VITE_API_KEY', '');
export const API_TIMEOUT = 30000; // 30 seconds (increased for Cloudflare Tunnel latency)
export const MAX_RETRIES = 3;

// Validate critical configuration in production
if (import.meta.env.PROD) {
	if (!import.meta.env.VITE_API_URL || !import.meta.env.VITE_API_URL.trim()) {
		console.error('[Config] ERROR: VITE_API_URL is not set in production!');
		console.error('[Config] Using fallback URL:', API_BASE_URL);
	}
	if (!import.meta.env.VITE_API_KEY || !import.meta.env.VITE_API_KEY.trim()) {
		console.warn('[Config] WARNING: VITE_API_KEY is not set in production!');
	}
}

// Log configuration (useful for debugging)
if (typeof window !== 'undefined') {
	console.log('[Config] API_BASE_URL:', API_BASE_URL);
	console.log('[Config] API_KEY configured:', API_KEY ? 'Yes' : 'No');
	console.log('[Config] Environment:', import.meta.env.MODE);
	console.log('[Config] Available env keys:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));
}

// Audio Recording
export const MAX_RECORDING_DURATION = 60000; // 60 seconds in milliseconds
export const AUDIO_SAMPLE_RATE = 16000; // 16kHz for voice
export const AUDIO_BIT_RATE = 16000; // 16kbps

// Supported audio MIME types (in order of preference)
export const AUDIO_MIME_TYPES = [
	'audio/webm;codecs=opus',
	'audio/webm',
	'audio/mp4',
	'audio/ogg;codecs=opus'
];

// IndexedDB Configuration
export const DB_NAME = 'QuickCaptureDB';
export const DB_VERSION = 1;
export const STORE_NAME = 'captures';

// UI Constants
export const TOAST_DURATION = 3000; // 3 seconds
export const DEBOUNCE_DELAY = 500; // 500ms for search/filter

// Capture Types (matching backend)
export const CAPTURE_TYPES = {
	WORK_LOG: 'work_log',
	IDEA: 'idea',
	MEETING_NOTE: 'meeting_note',
	LEARNING_NOTE: 'learning_note',
	QUICK_THOUGHT: 'quick_thought'
};

// Type Colors for UI
export const TYPE_COLORS = {
	[CAPTURE_TYPES.WORK_LOG]: 'bg-blue-500',
	[CAPTURE_TYPES.IDEA]: 'bg-yellow-500',
	[CAPTURE_TYPES.MEETING_NOTE]: 'bg-green-500',
	[CAPTURE_TYPES.LEARNING_NOTE]: 'bg-purple-500',
	[CAPTURE_TYPES.QUICK_THOUGHT]: 'bg-gray-500'
};

// Error Messages
export const ERROR_MESSAGES = {
	OFFLINE: '您当前处于离线状态，内容已保存到本地',
	NETWORK_ERROR: '网络连接失败，请稍后重试',
	PERMISSION_DENIED: '需要麦克风权限才能录音',
	RECORDING_ERROR: '录音失败，请检查麦克风设置',
	API_ERROR: 'API请求失败，请稍后重试',
	TIMEOUT: '请求超时，请检查网络连接'
};

// Success Messages
export const SUCCESS_MESSAGES = {
	CAPTURE_SAVED: '✅ 想法已保存',
	VOICE_CAPTURED: '✅ 语音已转录并保存',
	SYNC_COMPLETE: '✅ 数据同步完成'
};
