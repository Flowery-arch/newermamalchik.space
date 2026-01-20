import type { RequestHandler } from './$types';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$lib/config';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	const error = url.searchParams.get('error');

	if (error) {
		return new Response(`Error: ${error}`, { status: 400 });
	}

	if (!code) {
		return new Response('No code provided', { status: 400 });
	}

	// Для localhost используем 127.0.0.1 (Spotify разрешает HTTP только для 127.0.0.1)
	let origin = url.origin;
	if (origin.includes('localhost')) {
		origin = origin.replace('localhost', '127.0.0.1');
	}
	const redirectUri = `${origin}/api/spotify/callback`;

	try {
		const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${basic}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code,
				redirect_uri: redirectUri
			})
		});

		const data = await response.json();

		if (data.error) {
			return new Response(`Token error: ${data.error_description}`, { status: 400 });
		}

		// Показываем refresh_token - его нужно сохранить
		return new Response(`
			<!DOCTYPE html>
			<html>
				<head>
					<title>Spotify Auth Success</title>
					<style>
						body {
							background: #09090b;
							color: #fafafa;
							font-family: 'JetBrains Mono', monospace;
							padding: 40px;
							max-width: 800px;
							margin: 0 auto;
						}
						h1 { color: #22c55e; }
						pre {
							background: #18181b;
							padding: 20px;
							border-radius: 8px;
							overflow-x: auto;
							border: 1px solid #27272a;
						}
						code { color: #60a5fa; }
						.path { color: #a1a1aa; }
						.note { color: #71717a; margin-top: 20px; font-size: 14px; }
					</style>
				</head>
				<body>
					<h1>✓ Успешно!</h1>
					<p>Скопируй refresh_token и добавь его в файл:</p>
					<p class="path">src/lib/config.ts</p>
					<pre><code>export const SPOTIFY_REFRESH_TOKEN = '${data.refresh_token}';</code></pre>
					<p class="note">Этот токен работает бессрочно, пока ты не отзовёшь доступ в настройках Spotify.</p>
					<p class="note">После добавления токена перезапусти dev сервер.</p>
				</body>
			</html>
		`, {
			headers: { 'Content-Type': 'text/html; charset=utf-8' }
		});
	} catch (err) {
		return new Response(`Error: ${err}`, { status: 500 });
	}
};
