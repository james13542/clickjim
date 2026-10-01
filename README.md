# clickjim.com

Source for the ClickJim Cloudflare Worker. The `ai` branch contains the routed site and admin login.

## Project MP3 files

The Projects page lists persistent MP3 uploads with browser audio controls and download links. Visitors can listen and download; a logged-in admin can upload or remove files. Uploads accept MP3 files up to 25 MB, with an optional title (otherwise the filename is used). The API checks the extension and MP3 header, bounds upload bodies, and supports byte-range playback and seeking.

Before deploying this change, create the private R2 bucket configured in `wrangler.toml` and set the admin secrets:

```sh
npx wrangler r2 bucket create clickjim-project-audio
npx wrangler secret put AUTH_DEMO_PASSWORD
npx wrangler secret put SESSION_SECRET
```

Use a strong admin password and a random session secret. `AUTH_DEMO_EMAIL` in `wrangler.toml` is the admin login email; change it to your own email if desired. The old example password and session secret cannot authorize audio uploads or removal. Keeping the bucket private is sufficient: the Worker serves audio through its same-origin API, so public R2 access and CORS configuration are unnecessary.

Deploy from this branch with the existing Cloudflare integration or `npx wrangler deploy`. Log in on the home page, open **Projects**, enter an optional title, choose an MP3, and select **Upload MP3**. The uploaded file remains available after page reloads and Worker deployments. Admins can use **Remove** on an audio card to delete it from storage.

## Development

```sh
npm ci
npm test
```

`npm test` builds the Worker and exercises uploads, session authorization, validation, listing, playback ranges, downloads, and deletion with in-memory storage. For a local Cloudflare preview, put `AUTH_DEMO_PASSWORD` and `SESSION_SECRET` in an untracked `.dev.vars` file and run `npx wrangler dev`; local R2 data is separate from the production bucket.

R2 binding and bucket setup: <https://developers.cloudflare.com/r2/get-started/workers-api/>.
