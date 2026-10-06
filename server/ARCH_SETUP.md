# Arch Linux audio server for Clickjim

This setup keeps the website on Cloudflare and stores its MP3s on your Arch Linux server. The audio service runs as a dedicated user on localhost, with Caddy exposing it over HTTPS. Visitors can play and download files; uploads and deletion require Clickjim's admin session plus a private secret shared between the Worker and home server.

These instructions assume the home server changes have been merged into `ai`, a publicly reachable home IP, and control of DNS and router settings. The server must stay on for audio to be available. If your ISP uses CGNAT or blocks incoming web traffic, establish a suitable public connection before configuring the hostname; installing the service locally still works.

## 1. Install and download the source

```sh
sudo pacman -Syu caddy nodejs npm git curl openssl nano
sudo git clone --branch ai https://github.com/james13542/clickjim.git /opt/clickjim
```

If `/opt/clickjim` already exists, update that checkout instead of cloning over it. The home server has no external Node dependencies; `npm ci` is needed only to build or test the Worker.

## 2. Configure the server secret

Create the service user and install the example environment file:

```sh
sudo useradd --system --user-group --home-dir /var/lib/clickjim-audio --shell /usr/bin/nologin clickjim-audio
sudo install -m 600 /opt/clickjim/server/homelab.env.example /etc/clickjim-audio.env
sudo nano /etc/clickjim-audio.env
```

Use `https://audio.clickjim.com` for `PROJECT_AUDIO_SERVER_URL`, or change it to your chosen subdomain. Replace the example secret with a random value of at least 32 characters. To generate one locally:

```sh
openssl rand -hex 32
```

Save that same value as the Worker's `PROJECT_AUDIO_SERVER_SECRET` in step 5. Keep it out of the repository and browser code. Leave `PROJECT_AUDIO_HOST=127.0.0.1` and `PROJECT_AUDIO_PORT=8080`; Caddy will be the public entry point.

## 3. Start the audio service

```sh
sudo install -m 644 /opt/clickjim/server/clickjim-audio.service /etc/systemd/system/clickjim-audio.service
sudo systemctl daemon-reload
sudo systemctl enable --now clickjim-audio
curl http://127.0.0.1:8080/healthz
```

The health check should return `{"ok":true}`. systemd creates `/var/lib/clickjim-audio` with the service user's ownership; MP3s are saved in `files/` and their titles and filenames in `metadata/`. Back up both directories together. For startup errors:

```sh
journalctl -u clickjim-audio --no-pager -n 50
```

## 4. Set up DNS, router access, and HTTPS

1. Give the Arch server a stable LAN address through a router DHCP reservation.
2. Add a Cloudflare DNS **A** record for `audio` pointing to your public home IPv4 address. Set it to **DNS only** (grey cloud), so audio traffic goes directly to your home server. Keep the existing `clickjim.com` website records unchanged. If your public address changes, update this record or configure a DNS updater.
3. Forward TCP ports **80 and 443** on your router to the Arch server, and allow those ports through any host firewall. Do not forward port 8080.
4. Add the following block to `/etc/caddy/Caddyfile`, preserving any existing sites:

```caddyfile
audio.clickjim.com {
    reverse_proxy 127.0.0.1:8080
}
```

Then validate and start Caddy:

```sh
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl enable --now caddy
sudo systemctl reload caddy
curl https://audio.clickjim.com/healthz
```

Caddy obtains and renews the HTTPS certificate. The public health check should return `{"ok":true}`; check from outside your home network as well, such as a phone using cellular data. Ports 80/443 and correct DNS are needed for this standard automatic HTTPS setup.

## 5. Connect the Cloudflare Worker

In the `worker1` Worker settings, configure:

| Type | Name | Value |
| --- | --- | --- |
| Text variable | `PROJECT_AUDIO_SERVER_URL` | `https://audio.clickjim.com` (or your chosen hostname) |
| Secret | `PROJECT_AUDIO_SERVER_SECRET` | The same random value saved on the Arch server |
| Secret | `AUTH_DEMO_PASSWORD` | Your strong admin login password |
| Secret | `SESSION_SECRET` | A separate random session-signing secret |

The home server URL is also set in `wrangler.toml`; change that file if you use another hostname. `AUTH_DEMO_EMAIL` is the admin email. If the admin secrets are already configured, retain them.

Alternatively, from the repository directory using your Cloudflare account:

```sh
npx wrangler secret put PROJECT_AUDIO_SERVER_SECRET
npx wrangler secret put AUTH_DEMO_PASSWORD
npx wrangler secret put SESSION_SECRET
```

Deploy the updated Worker using your Cloudflare Git integration or `npx wrangler deploy`. The default configuration no longer has a mandatory R2 binding.

## 6. Upload a test MP3

Log in on `https://clickjim.com/`, open Projects, and upload a small MP3. Check playback, seeking, download, and page reload. Upload and removal requests stay on Clickjim; media requests go to the HTTPS home server.

If the page reports the home server is unavailable, check the public health endpoint, service status, DNS, and router forwarding. A shared-secret mismatch has its own error message. The server intentionally requires that secret for direct listing, upload, and deletion; public media GET and HEAD requests do not require it.

References: [Caddy on Arch](https://caddyserver.com/docs/install#arch-linux-manjaro-parabola), [Caddy HTTPS](https://caddyserver.com/docs/quick-starts/https), [Linux service configuration](https://caddyserver.com/docs/running).
