# SHOPVERSE

Fashion landing + shop listing built with **Next.js** and **Framer Motion**.

No cart / no auth — visitors browse products and contact you via WhatsApp, Instagram, or email.

## Stack

- Next.js (App Router) — frontend + API on Vercel free
- Framer Motion — animations
- Tailwind CSS v4
- API routes: `/api/products`, `/api/products/[id]` (Node.js serverless on Vercel)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update your contact links

Edit `src/data/contact.ts`, **or** set these in Vercel → Settings → Environment Variables:

| Variable | Example |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_URL` | `https://wa.me/923001234567` |
| `NEXT_PUBLIC_WHATSAPP_HANDLE` | `+92 300 1234567` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | `https://instagram.com/yourhandle` |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | `@yourhandle` |
| `NEXT_PUBLIC_EMAIL` | `hello@yourdomain.com` |

## Admin — list products (password protected)

1. Open [http://localhost:3000/admin](http://localhost:3000/admin)
2. Log in with the password from `.env.local` (`ADMIN_PASSWORD`, default `shopverse123`)
3. Add / edit / delete products — they appear in Shop (and Home if featured)
4. Shoppers cannot access `/admin` without the password

**Vercel:** set `ADMIN_PASSWORD` and `ADMIN_SECRET` in Project → Environment Variables.

For permanent product saves on Vercel (free), add [Upstash Redis](https://upstash.com/) and set:
`UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`

Locally, products save to `data/products.json` automatically.

## How to list products (admin UI)

Use `/admin` — do not edit code for day-to-day listings.

Fields: name, price, category, description, image URL, colors, details, featured.


## Deploy free on Vercel

1. Push this project to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add optional contact env vars (above), then **Deploy**.
5. You get a free `*.vercel.app` URL.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
