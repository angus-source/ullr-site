# ULLR Systems Website

A single-page landing site for ULLR Systems, built with React + Vite.

## How to Deploy (Step by Step)

### 1. Create a GitHub account
- Go to https://github.com and sign up (free)

### 2. Create a new repository
- Click the **+** button (top right) → **New repository**
- Name it `ullr-site`
- Keep it **Public** or **Private** (either works)
- Click **Create repository**

### 3. Upload these files
- On the repository page, click **"uploading an existing file"**
- Drag and drop ALL the files/folders from this project
- Click **Commit changes**

### 4. Deploy on Vercel
- Go to https://vercel.com and sign up with your GitHub account
- Click **"Add New..." → Project**
- Select your `ullr-site` repository
- Framework Preset should auto-detect **Vite** — if not, select it
- Click **Deploy**
- Wait ~60 seconds. Your site is now live on a `.vercel.app` URL

### 5. Connect your IONOS domain
- In Vercel: go to your project → **Settings → Domains**
- Type your domain (e.g. `ullrsystems.co.uk`) and click **Add**
- Vercel will show you DNS records to add
- In IONOS: go to **Domains & SSL → your domain → DNS**
- Add the records Vercel gave you (usually A records + CNAME for www)
- Wait for DNS propagation (minutes to hours)
- Vercel will auto-provision SSL

### 6. Submit to Google
- Go to https://search.google.com/search-console
- Add your domain and verify via DNS TXT record in IONOS
- Use **URL Inspection → Request Indexing** on your homepage

## To update the site later
- Edit files in GitHub (or locally with `git push`)
- Vercel auto-deploys on every push — no manual step needed

## To run locally (optional)
```bash
npm install
npm run dev
```

## Important files
- `index.html` — SEO meta tags, Open Graph tags, page title
- `public/robots.txt` — tells Google to index the site
- `public/sitemap.xml` — tells Google what pages exist
- `src/App.jsx` — the actual landing page

## Notes
- Update the domain in `index.html`, `robots.txt`, and `sitemap.xml` if your domain is different from `ullrsystems.co.uk`
- The `og:image` and `twitter:image` tags are commented out — uncomment and add an image URL once you have one
- Favicon is also commented out — add a `favicon.png` to the `public/` folder and uncomment the link tag
