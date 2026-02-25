# Steven & Bonnie Wedding — December 19, 2026

Bilingual (EN/中文) wedding website for the celebration at Fleur de Chine Hotel, Sun Moon Lake, Taiwan.

## Quick Deploy

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Click "Import Project" → select this repo
4. Framework: Vite (auto-detected). Click Deploy.
5. Done. Your site is live at `your-project.vercel.app`

## Adding Photos

Drop your photos into `/public/photos/` with these filenames:

| Filename | Source Photo | Description |
|---|---|---|
| `lake-sunset.jpg` | 481084563...jpeg | Sun Moon Lake golden hour |
| `hotel-aerial-mist.jpg` | 568750566...jpeg | Misty aerial, hotel + lake |
| `ceremony-hall.jpg` | 487278758...jpeg | Banquet hall with round tables |
| `hotel-aerial-green.jpg` | 486459009...jpeg | Bright aerial, hotel on peninsula |
| `lake-morning.jpg` | 534489555...jpeg | Calm blue lake panorama |
| `lobby-fireplace.jpg` | 585875276...jpeg | Lobby with sunburst mirror |
| `hotel-dusk-fountain.jpg` | 488210228...jpeg | Entrance at twilight |
| `lake-dock-mist.jpg` | 488483192...jpeg | Misty lake with dock |

## Local Development

```bash
npm install
npm run dev
```

## Making Changes

Ask Claude to edit `src/App.jsx` — all content is in the structured `content` object at the top of the file. Push to GitHub and Vercel auto-deploys.

## RSVP

RSVP form is hosted via Notion Forms, linked directly from the site.
Database: Wedding RSVP — Steven & Bonnie (in Notion, under "Our Life")
