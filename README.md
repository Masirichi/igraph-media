# Igraph Media — Production Web Platform & Backend Infrastructure

> **Own Your Narrative · Digital Growth Agency**  
> Establishing Enduring Brand Authority through data-backed public relations and precision digital advertising.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        IGRAPH MEDIA PLATFORM                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌───────────────────────────┐                       ┌───────────────────┐
│     VERCEL HOSTING        │                       │     SUPABASE      │
│  (Edge CDN & Serverless)  │                       │   (PostgreSQL 15) │
├───────────────────────────┤                       ├───────────────────┤
│ • index.html (Home)       │                       │ • public.leads    │
│ • services.html (Services)│       REST / SQL      │ • appointments    │
│ • about.html (About Us)   │ ────────────────────► │ • handovers       │
│ • contact.html (Contact)  │      (RLS Protected)  │ • chat_logs       │
│                           │                       │ • subscribers     │
│ Serverless API Routes:    │                       │ • leads_overview  │
│ • /api/leads              │                       └───────────────────┘
│ • /api/appointments       │                                 ▲
│ • /api/handover           │                                 │
│ • /api/chat ──────────────┼──────────┐                      │
│ • /api/status             │          │ (Auto CRM Logging)   │
└───────────────────────────┘          ▼                      │
                               ┌───────────────────┐          │
                               │ GOOGLE GEMINI API │ ─────────┘
                               │  (Gemini 3.8/2.5) │
                               │ Autonomous AI     │
                               │ Growth Concierge  │
                               └───────────────────┘
```

---

## 🚀 Quick Deployment Guide

### Step 1: Push Codebase to GitHub

1. Stage all files and create your initial release commit:
   ```bash
   git add .
   git commit -m "feat: complete Igraph Media production platform with Supabase & Vercel backend"
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `igraph-media`.
3. Link your local repository and push:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/igraph-media.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Configure Supabase Database

1. Sign in to [Supabase](https://supabase.com/) and click **New Project**.
2. Name your project (e.g. `igraph-media-db`), choose a strong database password, and select your preferred region.
3. Once the database is provisioned:
   * Navigate to the **SQL Editor** tab in the left sidebar.
   * Click **New query**.
   * Open [`supabase/schema.sql`](./supabase/schema.sql) in this repository, copy its full contents, paste into the query editor, and click **Run**.
4. The following tables and policies will be created automatically:
   * `public.leads`: All brief submissions and qualified prospective clients.
   * `public.appointments`: Scheduled 20-minute private growth consultations.
   * `public.handovers`: Live human partner escalation requests.
   * `public.chat_logs`: Conversation logs and AI tool interactions.
   * `public.subscribers`: Newsletter signups.
   * `public.leads_overview`: Real-time aggregated reporting view.
   * **Row Level Security (RLS)**: Pre-configured to allow public anonymous submissions while securing read/update access exclusively to your service role keys and authenticated partners.
5. Retrieve your project credentials from **Project Settings > API**:
   * `Project URL` (e.g. `https://xyzcompany.supabase.co`)
   * `anon public` key
   * `service_role` secret key

---

### Step 3: Deploy to Vercel

1. Sign in to [Vercel](https://vercel.com/) and click **Add New... > Project**.
2. Select your `igraph-media` repository from GitHub and click **Import**.
3. In the **Configure Project** screen:
   * **Framework Preset**: Select `Other` (or leave default).
   * **Root Directory**: `./`
4. Expand the **Environment Variables** section and add:

   | Variable Name | Description | Example Value |
   |---|---|---|
   | `SUPABASE_URL` | Supabase project URL | `https://your-id.supabase.co` |
   | `SUPABASE_ANON_KEY` | Public anonymous client key | `eyJhbGciOi...` |
   | `SUPABASE_SERVICE_ROLE_KEY` | Secure service role key | `eyJhbGciOi...` |
   | `GEMINI_API_KEY` | Google Gemini API Key | `AIzaSy...` (from [Google AI Studio](https://aistudio.google.com/)) |
   | `ADMIN_NOTIFICATION_EMAIL` | Direct notification inbox | `advisory@igraphmedia.com` |

5. Click **Deploy**. Vercel will build the edge assets and deploy your serverless endpoints within 60 seconds!

---

## 🛠️ Local Development & Testing

You can run the full serverless-emulated stack locally:

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional for local mock testing)
cp .env.example .env.local

# 3. Start local development server
npm run dev
# Or run directly: node server.js
```

The server will launch at `http://localhost:8080/` with live endpoints:
* Web pages: `http://localhost:8080/`, `/services`, `/about`, `/contact`
* Health Check: `http://localhost:8080/api/status`
* Lead Intake: `POST http://localhost:8080/api/leads`
* Appointment Booking: `POST http://localhost:8080/api/appointments`
* Human Handover: `POST http://localhost:8080/api/handover`
* AI Concierge: `POST http://localhost:8080/api/chat`

---

## 📂 Repository Structure

```
igraph-media/
├── api/                    # Vercel Serverless Functions
│   ├── leads.js            # POST /api/leads -> Inserts into Supabase
│   ├── appointments.js     # POST /api/appointments -> Schedules consultations
│   ├── handover.js         # POST /api/handover -> Escalates to live partner
│   ├── chat.js             # POST /api/chat -> Google Gemini + auto-save
│   └── status.js           # GET /api/status -> Backend health probe
├── lib/
│   └── supabase.js         # Unified Supabase client & REST helpers
├── supabase/
│   ├── schema.sql          # Complete PostgreSQL DDL, RLS, Indexes & Views
│   └── seed.sql            # Development sample records
├── components/             # React/Next.js Component Library
│   ├── IgraphMediaLanding.tsx
│   ├── ServicesPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── SupportAgent.tsx
│   └── ...
├── assets/                 # Brand logos, icons, photography
├── index.html              # Main Landing Page
├── services.html           # 8 Core Services Page
├── about.html              # Standard About Us Page
├── contact.html            # Standard Contact Us Page
├── styles.css              # LineaDS Dark Luxury Stylesheet
├── script.js               # Client interaction & form submission logic
├── agent.js                # Gemini-powered conversational concierge widget
├── agent.css               # Isolated chatbot styles
├── server.js               # Node.js local dev server (emulates Vercel)
├── vercel.json             # Vercel configuration, routing & security headers
├── package.json            # Node.js configuration & dependencies
├── .env.example            # Environment variable template
└── .gitignore              # Production git exclude patterns
```

---

## 🔒 Security & Compliance
* **Data Sovereignty & Privacy**: All contact briefs and appointments are stored with Row-Level Security (RLS) enabled. Public visitors cannot read, scrape, or manipulate competitor submissions.
* **API Key Protection**: The Google Gemini API key and Supabase Service Role key are stored strictly in Vercel environment variables and executed server-side. They are never exposed to browser clients.
* **Security Headers**: `vercel.json` applies strict `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, and `Referrer-Policy`.
* **Zero Prohibited Terms**: Audited and confirmed compliant with all brand naming and copy guidelines.
