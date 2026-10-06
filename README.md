# clickjim.com

Source for the ClickJim Cloudflare Worker. The `ai` branch contains the routed site and admin login.

## Project MP3 files

The Projects page lists persistent MP3 uploads with browser audio controls and download links. Visitors can listen and download; a logged-in admin can upload or remove files. Uploads accept MP3 files up to 25 MB, with an optional title (otherwise the filename is used).

The default configuration now uses a home audio server at `https://audio.clickjim.com`. The website and admin sessions stay on Cloudflare. Uploads, listing, and removal go through the Worker to the home server using a private shared secret; audio playback and downloads go directly to the home server. MP3 files and titles are saved on disk. No R2 subscription or bucket is required to deploy the default configuration.

See [the Arch Linux setup guide](server/ARCH_SETUP.md) for installation, the systemd service, Caddy HTTPS, DNS, router forwarding, and Worker secrets. Set `AUTH_DEMO_PASSWORD`, `SESSION_SECRET`, and `PROJECT_AUDIO_SERVER_SECRET` as Worker secrets, and set the matching `PROJECT_AUDIO_SERVER_SECRET` on the home server. `AUTH_DEMO_EMAIL` in `wrangler.toml` is the admin login email. The old example credentials cannot authorize audio changes.

After setup, log in on the home page, open **Projects**, choose an MP3, and select **Upload MP3**. Uploaded files persist through page reloads, home server restarts, and Worker deployments. **Remove** deletes the audio file and its metadata from the home server. Audio is available while the home server and its internet connection are online; the rest of the website can remain available when the audio server is down.

## Development

```sh
npm ci
npm test
```

`npm test` builds the Worker and exercises uploads, session authorization, validation, listing, playback ranges, downloads, and deletion. Home server tests use real HTTP and temporary directories, including persistence across a server restart and the Worker-to-server connection. Node.js 22 or later is required for the home server and tests; the home server uses only built-in Node modules and does not need `npm install` to run.

For a local Worker preview, put the admin and home server secrets in an untracked `.dev.vars` file and run `npx wrangler dev`. The configured home server URL must use HTTPS.

## Optional R2 storage

The original R2 handler remains available. To use it, remove `PROJECT_AUDIO_SERVER_URL` from the Worker configuration and add an `r2_buckets` binding named `PROJECT_AUDIO` to your bucket. The home server takes precedence when its URL is set. R2 setup: <https://developers.cloudflare.com/r2/get-started/workers-api/>.
