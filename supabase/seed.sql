-- Sample seed data for Igraph Media development environment
INSERT INTO public.leads (client_name, company_name, email, phone, service_interest, growth_goal, monthly_budget, timeline, message, source, status)
VALUES 
  ('Katrin K.', 'Cocu Atelier', 'katrin@cocuatelier.com', '+2348000000001', '02. Social Media Management', 'Scale organic presence and brand stature', '₦1.5M – ₦3M / month', 'Within 30 days', 'Looking to overhaul our visual narrative and scale luxury fashion presence.', 'website_form', 'qualified'),
  ('Tobarin .O', 'TFZ Cakes & Academy', 'tobarin@tfzcakes.com', '+2348000000002', '08. Digital Advertising', 'Acquire qualified student leads for culinary cohorts', '₦1.5M – ₦3M / month', 'Immediate', 'Need consistent student cohort enrollments through targeted paid funnels.', 'ai_concierge', 'new')
ON CONFLICT DO NOTHING;

INSERT INTO public.appointments (client_name, company_name, email, phone, preferred_date, preferred_time, growth_focus, status)
VALUES
  ('Katrin K.', 'Cocu Atelier', 'katrin@cocuatelier.com', '+2348000000001', CURRENT_DATE + INTERVAL '3 days', '14:00 WAT', 'Social Media & Narrative Direction', 'confirmed')
ON CONFLICT DO NOTHING;
