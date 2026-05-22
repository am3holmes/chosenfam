# ChosenFam

**Write your own divorce decree. Free. In every US state.**

---

## Deploy in 30 minutes — no coding required

### Step 1 — Install Node.js (one time only)
Go to **nodejs.org** → download the LTS version → install it.
This is what runs JavaScript on your computer.

### Step 2 — Test locally (optional but recommended)
Open Terminal (Mac) or Command Prompt (Windows).
Navigate to this folder:
```
cd path/to/chosenfam
npm install
npm run dev
```
Open your browser to `http://localhost:5173` — you'll see the app.

### Step 3 — Push to GitHub
1. Go to **github.com** → sign up (free)
2. Click **+** → **New repository** → name it `chosenfam` → **Create**
3. Upload all files in this folder to that repository
   (drag and drop in the GitHub web interface, or use GitHub Desktop app)

### Step 4 — Deploy to Vercel
1. Go to **vercel.com** → sign up with your GitHub account (free)
2. Click **Add New Project** → import your `chosenfam` repository
3. Framework: **Vite** (Vercel detects this automatically)
4. Click **Deploy** → your site is live in ~2 minutes

Your live URL will be something like `chosenfam.vercel.app`

### Step 5 — Connect your domain
1. Buy **chosenfam.com** on Namecheap ($15/yr)
2. In Vercel: Settings → Domains → Add `chosenfam.com`
3. Vercel gives you DNS records to paste into Namecheap
4. Takes 10–30 minutes to go live

### Step 6 — Connect Stripe payments
1. Go to **stripe.com** → create account (free — they charge 2.9% per transaction)
2. Create 4 payment links:
   - $29 — "ChosenFam Court-Ready Document"
   - $149 — "ChosenFam Paralegal Review"
   - $400 — "ChosenFam Mediation Session"
   - $1,800 — "ChosenFam Decree Package"
3. Open `src/App.jsx` → search for `YOUR_STRIPE_LINK`
4. Replace each placeholder with your actual Stripe payment link URL
5. Push the updated file to GitHub → Vercel redeploys automatically

### Step 7 — Set up session booking
1. Go to **calendly.com** → sign up (free)
2. Create 1 event type: "ChosenFam Mediation Session — 90 minutes"
3. Set price to $0 (Stripe handles payment separately)
4. Copy your Calendly link
5. In `src/App.jsx` → search for `YOUR_CALENDLY_LINK`
6. Replace with your actual link → push to GitHub

### Step 8 — Email capture
1. Go to **convertkit.com** → sign up free (up to 1,000 subscribers)
2. Create a form → get the embed code
3. Optional: add to the footer of the app

---

## What each button does right now

| Button | Connects to |
|--------|-------------|
| "Start building my decree" | The decree builder — works immediately |
| "Generate my decree" | Generates the text decree — works immediately |
| "Copy full decree" | Copies to clipboard — works immediately |
| "Send to my partner" | Opens email client — works immediately |
| "Book this session" | Needs your Calendly link |
| "Choose this →" (paid tiers) | Needs your Stripe payment links |

The core product — building and generating a decree — works on day one with zero configuration.

---

## Stripe payment link placeholders to replace

Search in `src/App.jsx` for these strings and replace with your Stripe links:

```
YOUR_STRIPE_LINK_29
YOUR_STRIPE_LINK_149  
YOUR_STRIPE_LINK_400
YOUR_STRIPE_LINK_1800
YOUR_CALENDLY_LINK
```

---

## The legal disclaimer (keep this everywhere)
ChosenFam generates legal templates and educational guidance.
This is legal orientation — not legal advice.
We recommend review by a legal aid organization before filing.

---

## Monthly costs at launch
- Domain: $15/yr
- Vercel hosting: $0
- Stripe: 2.9% per transaction (no monthly fee)
- Calendly: $0 (free tier)
- ConvertKit: $0 (free up to 1,000 subscribers)
- Claude API (paralegal reviews): ~$0.20 per review

**Total fixed monthly cost: $0**
Break-even: your first session ($400) covers everything.

---

## Questions?
hello@chosenfam.com
