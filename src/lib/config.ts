// Spotify API Config
export const SPOTIFY_CLIENT_ID = '88c7340d9847484cab2a890ab8d2a63c';
export const SPOTIFY_CLIENT_SECRET = 'de90633c9273463c8310ea140de8424c';

// Refresh token - получи через /api/spotify/login и вставь сюда
export const SPOTIFY_REFRESH_TOKEN = 'AQBs7_hB0GWraEWfwqR8wD5tU44IiOHwwqH83xuytULn_WnyOXjWBQS4OBjsu6NhsYgXECrmQFQKXhhBC4wdVevqKyBiX4IJ_cIdokZh1tCOjBMfqbeqQp_lcBduCTAMSMk';

// Определяем redirect URI в зависимости от окружения
export function getSpotifyRedirectUri() {
	if (typeof window !== 'undefined') {
		return `${window.location.origin}/api/spotify/callback`;
	}
	// Для серверной части - проверяем переменные окружения или дефолт
	return process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}/api/spotify/callback`
		: 'http://localhost:5173/api/spotify/callback';
}
