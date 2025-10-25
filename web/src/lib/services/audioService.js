/**
 * Audio Recording Service
 * Handles microphone access, recording, and audio processing
 */

import {
	MAX_RECORDING_DURATION,
	AUDIO_SAMPLE_RATE,
	AUDIO_BIT_RATE,
	AUDIO_MIME_TYPES,
	ERROR_MESSAGES
} from '$utils/constants.js';

class AudioService {
	constructor() {
		this.mediaRecorder = null;
		this.audioChunks = [];
		this.stream = null;
		this.audioContext = null;
		this.analyser = null;
		this.isRecording = false;
		this.recordingStartTime = null;
		this.maxDurationTimeout = null;
	}

	/**
	 * Request microphone permission
	 * @returns {Promise<boolean>} Permission granted status
	 */
	async requestPermission() {
		try {
			this.stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
					sampleRate: AUDIO_SAMPLE_RATE
				}
			});
			return true;
		} catch (error) {
			console.error('Microphone permission error:', error);
			if (error.name === 'NotAllowedError') {
				throw new Error('PERMISSION_DENIED');
			}
			throw new Error('RECORDING_ERROR');
		}
	}

	/**
	 * Get supported audio MIME type
	 * @private
	 * @returns {string} Supported MIME type
	 */
	_getSupportedMimeType() {
		for (const mimeType of AUDIO_MIME_TYPES) {
			if (MediaRecorder.isTypeSupported(mimeType)) {
				console.log('Using MIME type:', mimeType);
				return mimeType;
			}
		}
		console.warn('No preferred MIME type supported, using default');
		return '';
	}

	/**
	 * Setup audio analyser for waveform visualization
	 * @private
	 */
	_setupAnalyser() {
		try {
			this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
			this.analyser = this.audioContext.createAnalyser();
			const source = this.audioContext.createMediaStreamSource(this.stream);
			source.connect(this.analyser);
			this.analyser.fftSize = 2048;
			console.log('Audio analyser initialized');
		} catch (error) {
			console.error('Failed to setup analyser:', error);
		}
	}

	/**
	 * Start recording audio
	 * @returns {Promise<void>}
	 */
	async startRecording() {
		if (this.isRecording) {
			console.warn('Already recording');
			return;
		}

		// Request permission if not already granted
		if (!this.stream) {
			await this.requestPermission();
		}

		// Get supported MIME type
		const mimeType = this._getSupportedMimeType();

		// Initialize MediaRecorder
		this.mediaRecorder = new MediaRecorder(this.stream, {
			mimeType,
			audioBitsPerSecond: AUDIO_BIT_RATE
		});

		this.audioChunks = [];
		this.isRecording = true;
		this.recordingStartTime = Date.now();

		// Collect audio data
		this.mediaRecorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				this.audioChunks.push(event.data);
			}
		};

		// Start recording
		this.mediaRecorder.start();

		// Setup waveform analyser
		this._setupAnalyser();

		// Auto-stop after max duration
		this.maxDurationTimeout = setTimeout(() => {
			if (this.isRecording) {
				console.log('Max recording duration reached, stopping');
				this.stopRecording();
			}
		}, MAX_RECORDING_DURATION);

		console.log('Recording started');
	}

	/**
	 * Stop recording and return audio blob
	 * @returns {Promise<Blob>} Recorded audio blob
	 */
	async stopRecording() {
		if (!this.isRecording || !this.mediaRecorder) {
			console.warn('Not recording');
			return null;
		}

		return new Promise((resolve, reject) => {
			this.mediaRecorder.onstop = () => {
				const audioBlob = new Blob(this.audioChunks, {
					type: this.mediaRecorder.mimeType
				});

				const duration = Date.now() - this.recordingStartTime;
				console.log(`Recording stopped. Duration: ${duration}ms, Size: ${audioBlob.size} bytes`);

				this.isRecording = false;
				clearTimeout(this.maxDurationTimeout);

				resolve(audioBlob);
			};

			this.mediaRecorder.onerror = (error) => {
				console.error('MediaRecorder error:', error);
				this.isRecording = false;
				clearTimeout(this.maxDurationTimeout);
				reject(new Error('RECORDING_ERROR'));
			};

			try {
				this.mediaRecorder.stop();
			} catch (error) {
				console.error('Failed to stop recording:', error);
				this.isRecording = false;
				reject(error);
			}
		});
	}

	/**
	 * Get current waveform data for visualization
	 * @returns {Uint8Array|null} Waveform data array
	 */
	getWaveformData() {
		if (!this.analyser || !this.isRecording) {
			return null;
		}

		const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
		this.analyser.getByteTimeDomainData(dataArray);
		return dataArray;
	}

	/**
	 * Get current volume level (0-100)
	 * @returns {number} Volume level percentage
	 */
	getVolumeLevel() {
		if (!this.analyser || !this.isRecording) {
			return 0;
		}

		const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
		this.analyser.getByteTimeDomainData(dataArray);

		let sum = 0;
		for (let i = 0; i < dataArray.length; i++) {
			sum += Math.abs(dataArray[i] - 128);
		}
		const average = sum / dataArray.length;
		return Math.min(100, (average / 128) * 100);
	}

	/**
	 * Get recording duration in seconds
	 * @returns {number} Duration in seconds
	 */
	getRecordingDuration() {
		if (!this.isRecording || !this.recordingStartTime) {
			return 0;
		}
		return Math.floor((Date.now() - this.recordingStartTime) / 1000);
	}

	/**
	 * Cancel current recording
	 */
	cancelRecording() {
		if (this.isRecording && this.mediaRecorder) {
			this.mediaRecorder.stop();
			this.audioChunks = [];
			this.isRecording = false;
			clearTimeout(this.maxDurationTimeout);
			console.log('Recording cancelled');
		}
	}

	/**
	 * Cleanup resources and stop all tracks
	 */
	cleanup() {
		if (this.stream) {
			this.stream.getTracks().forEach((track) => {
				track.stop();
				console.log('Audio track stopped');
			});
			this.stream = null;
		}

		if (this.audioContext && this.audioContext.state !== 'closed') {
			this.audioContext.close();
			console.log('Audio context closed');
		}

		this.mediaRecorder = null;
		this.analyser = null;
		this.audioChunks = [];
		this.isRecording = false;
		clearTimeout(this.maxDurationTimeout);
	}

	/**
	 * Check if browser supports audio recording
	 * @returns {boolean} Support status
	 */
	static isSupported() {
		return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
	}
}

// Export singleton instance
export const audioService = new AudioService();

// Export class for testing
export { AudioService };
