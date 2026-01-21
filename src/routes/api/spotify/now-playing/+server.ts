import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from '$lib/config';

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const PLAYER_ENDPOINT = 'https://api.spotify.com/v1/me/player';

async function getAccessToken() {
	if (!SPOTIFY_REFRESH_TOKEN) {
		return null;
	}

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: SPOTIFY_REFRESH_TOKEN
		})
	});

	return response.json();
}

export const GET: RequestHandler = async () => {
	if (!SPOTIFY_REFRESH_TOKEN) {
		return json({ isPlaying: false, noToken: true });
	}

	try {
		const { access_token } = await getAccessToken();

		// Get current playback state (includes device info)
		const playerResponse = await fetch(PLAYER_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});

		const response = await fetch(NOW_PLAYING_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});

		if (response.status === 204 || response.status > 400) {
			return json({ isPlaying: false });
		}

		const song = await response.json();

		if (!song.item) {
			return json({ isPlaying: false });
		}

		// Get device info
		let deviceName = null;
		let volumePercent = null;

		if (playerResponse.status === 200) {
			const playerData = await playerResponse.json();
			if (playerData.device) {
				deviceName = playerData.device.name;
				volumePercent = playerData.device.volume_percent;
			}
		}

		const isPlaying = song.is_playing;
		const title = song.item.name;
		const artist = song.item.artists.map((a: { name: string }) => a.name).join(', ');
		const album = song.item.album.name;
		const albumImageUrl = song.item.album.images[0]?.url;
		const songUrl = song.item.external_urls.spotify;
		const progress = song.progress_ms;
		const duration = song.item.duration_ms;

		return json({
			isPlaying,
			title,
			artist,
			album,
			albumImageUrl,
			songUrl,
			progress,
			duration,
			deviceName,
			volumePercent
		});
	} catch {
		return json({ isPlaying: false, error: true });
	}
};
