/**
 * Voice Transcription API Endpoint
 *
 * Provides server-side voice transcription using Whisper models
 * Supports multiple providers with intelligent fallback:
 * 1. Cloudflare Workers AI (primary - already configured)
 * 2. OpenAI Whisper API (fallback for high accuracy needs)
 *
 * Benefits:
 * - Resolves CORS issues (server-side API calls)
 * - Protects API keys (not exposed to frontend)
 * - Smart routing based on audio quality/language
 * - Preprocessing and error handling
 */

import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		// Extract audio blob from request
		const audioBlob = await request.blob();

		// Validate audio data
		if (!audioBlob || audioBlob.size === 0) {
			throw error(400, {
				message: 'No audio data provided',
				code: 'INVALID_AUDIO'
			});
		}

		// Log transcription attempt
		console.log('[Transcribe API] Starting transcription:', {
			size: `${Math.round(audioBlob.size / 1024)}KB`,
			type: audioBlob.type,
			timestamp: new Date().toISOString()
		});

		// Strategy 1: Use Cloudflare Workers AI (Primary)
		const voiceApiUrl = env.PUBLIC_VOICE_API_URL;

		if (voiceApiUrl) {
			try {
				const result = await transcribeWithCloudflare(audioBlob, voiceApiUrl);

				return json({
					success: true,
					text: result.text,
					provider: 'cloudflare-workers-ai',
					model: '@cf/openai/whisper',
					metadata: {
						duration: result.duration,
						language: result.language || 'zh',
						confidence: result.confidence
					}
				});
			} catch (cfError) {
				console.error('[Transcribe API] Cloudflare Workers AI failed:', cfError);

				// Fallback to OpenAI Whisper if available
				if (env.OPENAI_API_KEY) {
					console.log('[Transcribe API] Falling back to OpenAI Whisper');
					const result = await transcribeWithOpenAI(audioBlob);

					return json({
						success: true,
						text: result.text,
						provider: 'openai-whisper',
						model: 'whisper-1',
						fallback: true,
						metadata: {
							duration: result.duration,
							language: result.language || 'zh'
						}
					});
				}

				// If no fallback available, throw error
				throw cfError;
			}
		}

		// Strategy 2: Use OpenAI Whisper API directly
		if (env.OPENAI_API_KEY) {
			const result = await transcribeWithOpenAI(audioBlob);

			return json({
				success: true,
				text: result.text,
				provider: 'openai-whisper',
				model: 'whisper-1',
				metadata: {
					duration: result.duration,
					language: result.language || 'zh'
				}
			});
		}

		// No transcription service configured
		throw error(503, {
			message: 'No transcription service configured. Please set PUBLIC_VOICE_API_URL or OPENAI_API_KEY',
			code: 'SERVICE_UNAVAILABLE'
		});

	} catch (err) {
		console.error('[Transcribe API] Error:', err);

		if (err.status) {
			throw err; // Re-throw SvelteKit errors
		}

		throw error(500, {
			message: err.message || 'Transcription failed',
			code: 'TRANSCRIPTION_ERROR',
			details: err.toString()
		});
	}
}

/**
 * Transcribe audio using Cloudflare Workers AI
 * @param {Blob} audioBlob - Audio file
 * @param {string} voiceApiUrl - Cloudflare Workers AI endpoint URL
 * @returns {Promise<{text: string, duration?: number, language?: string, confidence?: number}>}
 */
async function transcribeWithCloudflare(audioBlob, voiceApiUrl) {
	const apiKey = env.API_KEY || env.CLOUDFLARE_API_KEY;

	const response = await fetch(voiceApiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': audioBlob.type || 'audio/webm',
			...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
		},
		body: audioBlob
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Cloudflare Workers AI failed: ${response.status} ${errorText}`);
	}

	const result = await response.json();

	// Handle different response formats
	if (result.text) {
		return {
			text: result.text,
			duration: result.duration,
			language: result.language,
			confidence: result.confidence
		};
	}

	if (result.result && result.result.text) {
		return {
			text: result.result.text,
			duration: result.result.duration,
			language: result.result.language,
			confidence: result.result.confidence
		};
	}

	throw new Error('Invalid response format from Cloudflare Workers AI');
}

/**
 * Transcribe audio using OpenAI Whisper API
 * @param {Blob} audioBlob - Audio file
 * @returns {Promise<{text: string, duration?: number, language?: string}>}
 */
async function transcribeWithOpenAI(audioBlob) {
	const formData = new FormData();
	formData.append('file', audioBlob, 'audio.webm');
	formData.append('model', 'whisper-1');
	formData.append('language', 'zh'); // Chinese language hint
	formData.append('response_format', 'verbose_json'); // Get detailed metadata

	const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${env.OPENAI_API_KEY}`
		},
		body: formData
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`OpenAI Whisper failed: ${response.status} ${errorText}`);
	}

	const result = await response.json();

	return {
		text: result.text,
		duration: result.duration,
		language: result.language
	};
}

/**
 * GET endpoint for health check
 */
export async function GET() {
	const services = {
		cloudflare: !!env.PUBLIC_VOICE_API_URL,
		openai: !!env.OPENAI_API_KEY
	};

	return json({
		status: 'healthy',
		services,
		primary: services.cloudflare ? 'cloudflare-workers-ai' : services.openai ? 'openai-whisper' : 'none',
		timestamp: new Date().toISOString()
	});
}
