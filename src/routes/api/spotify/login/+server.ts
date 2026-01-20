import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SPOTIFY_CLIENT_ID } from '$lib/config';

const SCOPES = 'user-read-currently-playing user-read-playback-state';

export const GET: RequestHandler = async ({ url }) => {
	// Для localhost используем 127.0.0.1 (Spotify разрешает HTTP только для 127.0.0.1)
	let origin = url.origin;
	if (origin.includes('localhost')) {
		origin = origin.replace('localhost', '127.0.0.1');
	}
	const redirectUri = `${origin}/api/spotify/callback`;

	const params = new URLSearchParams({
		client_id: SPOTIFY_CLIENT_ID,
		response_type: 'code',
		redirect_uri: redirectUri,
		scope: SCOPES
	});

	throw redirect(302, `https://accounts.spotify.com/authorize?${params}`);
};
