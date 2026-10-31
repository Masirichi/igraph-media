-- ==============================================================================
-- IGRAPH MEDIA — PRODUCTION SUPABASE BACKEND SCHEMA
-- Independent Media & Brand Advisory (https://igraphmedia.com)
-- Compatible with Supabase PostgreSQL 15+ / Vercel Serverless
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'nurture', 'closed_won', 'closed_lost');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'rescheduled', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE handover_urgency AS ENUM ('immediate', 'high', 'normal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE handover_status AS ENUM ('requested', 'assigned', 'in_progress', 'resolved');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. HELPER FUNCTION: AUTO-UPDATE 'updated_at' TIMESTAMP
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ==============================================================================
-- TABLE 1: LEADS (Website Briefs & AI Qualified Prospects)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Client Identification
    client_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    
    -- Strategic Fit & Project Details
    service_interest TEXT NOT NULL, -- e.g. '01. Press Release Distribution', '02. Social Media Management', etc.
    growth_goal TEXT,               -- Primary bottleneck or commercial milestone
    monthly_budget TEXT,            -- e.g. '₦1.5M – ₦3M / month' or '$5k - $10k'
    timeline TEXT,                  -- Launch urgency (e.g. 'Immediate', 'Within 30 days')
    message TEXT,                   -- Project brief or additional context
    nda_requested BOOLEAN DEFAULT false,
    
    -- Attribution & CRM Status
    source TEXT DEFAULT 'website_form', -- 'website_form', 'ai_concierge', 'referral', 'direct'
    status lead_status DEFAULT 'new' NOT NULL,
    assigned_to TEXT,
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_company ON public.leads (company_name);

DROP TRIGGER IF EXISTS trigger_leads_updated_at ON public.leads;
CREATE TRIGGER trigger_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- TABLE 2: APPOINTMENTS (Private 20-Minute Growth Consultations)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Attendee Information
    client_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    
    -- Meeting Scheduling
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL, -- e.g. '14:00 WAT'
    timezone TEXT DEFAULT 'WAT' NOT NULL,
    duration_minutes INTEGER DEFAULT 20 NOT NULL,
    growth_focus TEXT,
    
    -- Lifecycle
    status appointment_status DEFAULT 'pending' NOT NULL,
    meeting_link TEXT,           -- Google Meet / Zoom URL populated upon confirmation
    calendar_event_id TEXT,
    executive_partner TEXT,      -- Assigned partner conducting the session
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments (preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments (status);

DROP TRIGGER IF EXISTS trigger_appointments_updated_at ON public.appointments;
CREATE TRIGGER trigger_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- TABLE 3: HANDOVERS (AI Concierge Human Escalations)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.handovers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Escalation Details
    client_name TEXT,
    company_name TEXT,
    email TEXT,
    phone TEXT,
    reason TEXT NOT NULL,
    conversation_summary TEXT,
    urgency handover_urgency DEFAULT 'normal' NOT NULL,
    status handover_status DEFAULT 'requested' NOT NULL,
    
    -- Operational Routing
    assigned_partner TEXT,
    resolution_notes TEXT,
    session_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_handovers_created_at ON public.handovers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_handovers_status ON public.handovers (status);
CREATE INDEX IF NOT EXISTS idx_handovers_urgency ON public.handovers (urgency);

DROP TRIGGER IF EXISTS trigger_handovers_updated_at ON public.handovers;
CREATE TRIGGER trigger_handovers_updated_at
    BEFORE UPDATE ON public.handovers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- TABLE 4: CHAT_LOGS (Conversational Agent Audit & Lead Sessions)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    session_id TEXT NOT NULL,
    interaction_id TEXT,
    user_message TEXT NOT NULL,
    bot_reply TEXT,
    function_called TEXT,
    function_arguments JSONB,
    model_version TEXT DEFAULT 'gemini-3.8-flash',
    ip_hash TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_chat_logs_session ON public.chat_logs (session_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created ON public.chat_logs (created_at DESC);


-- ==============================================================================
-- TABLE 5: SUBSCRIBERS (Newsletter & Advisory Intelligence Briefings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    source TEXT DEFAULT 'footer_form'
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (email);


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.handovers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 1. LEADS RLS
-- Public website visitors can INSERT leads (brief submissions / chatbot qualification)
CREATE POLICY "Public anonymous can insert leads"
    ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only service_role (Vercel backend functions & authenticated partners) can SELECT/UPDATE
CREATE POLICY "Service role has full access to leads"
    ON public.leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 2. APPOINTMENTS RLS
CREATE POLICY "Public anonymous can book appointments"
    ON public.appointments
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Service role has full access to appointments"
    ON public.appointments
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 3. HANDOVERS RLS
CREATE POLICY "Public anonymous can request handovers"
    ON public.handovers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Service role has full access to handovers"
    ON public.handovers
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 4. CHAT_LOGS RLS
CREATE POLICY "Public anonymous can log chat interactions"
    ON public.chat_logs
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Service role has full access to chat_logs"
    ON public.chat_logs
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 5. SUBSCRIBERS RLS
CREATE POLICY "Public anonymous can subscribe"
    ON public.subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Service role has full access to subscribers"
    ON public.subscribers
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ==============================================================================
-- REPORTING VIEW: LEADS OVERVIEW
-- ==============================================================================
CREATE OR REPLACE VIEW public.leads_overview AS
SELECT 
    l.id,
    l.created_at,
    l.client_name,
    l.company_name,
    l.email,
    l.phone,
    l.service_interest,
    l.monthly_budget,
    l.timeline,
    l.status,
    l.source,
    COUNT(a.id) AS booked_appointments,
    COUNT(h.id) AS handover_requests
FROM public.leads l
LEFT JOIN public.appointments a ON a.email = l.email
LEFT JOIN public.handovers h ON h.email = l.email
GROUP BY l.id, l.created_at, l.client_name, l.company_name, l.email, l.phone, l.service_interest, l.monthly_budget, l.timeline, l.status, l.source
ORDER BY l.created_at DESC;
