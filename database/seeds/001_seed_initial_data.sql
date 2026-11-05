-- ==============================================================================
-- Seed Data: 001_seed_initial_data.sql
-- Description: Authentic initial records for Advocate Shivansh Kumar Pandey
-- Note: Qualifications and Bar Enrolment numbers are set to structured client placeholders
-- ==============================================================================

-- 1. Advocate Profile Seed
INSERT INTO advocate_profile (
    id,
    full_name,
    designation,
    tagline,
    biography,
    qualifications,
    enrolment_number,
    enrolment_council,
    image_path,
    email,
    phone,
    office_address,
    office_timings
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Shivansh Kumar Pandey',
    'Advocate',
    'Civil, Family & Taxation Law Expert',
    'Advocate Shivansh Kumar Pandey is a dedicated legal professional practicing at the Civil Court, Gorakhpur, Uttar Pradesh. Committed to upholding constitutional principles and the highest standards of the Indian legal profession, Adv. Pandey provides authoritative counsel and representation across civil disputes, family law, comprehensive taxation and corporate compliances.',
    '[Degree / Qualifications Pending Client Verification]',
    '[Enrolment Number Pending Client Verification]',
    'Bar Council of Uttar Pradesh',
    '/assets/images/advocate-placeholder.jpg',
    'advshiv43@gmail.com',
    '+91 9198106052',
    'Chamber No. [Pending Client Verification], Civil Court Campus, Gorakhpur, Uttar Pradesh - 273001, India',
    'Monday – Saturday: 10:00 AM – 5:00 PM (By Prior Appointment)'
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    tagline = EXCLUDED.tagline,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone;

-- 2. Practice Areas Seed (7 Core Categories)
-- Category 1: Civil Litigation
INSERT INTO practice_areas (id, title, slug, short_description, full_description, display_order, is_published)
VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'Civil Litigation',
    'civil-litigation',
    'Strategic legal representation in title disputes, contract enforcement, writ petitions, and appellate matters before judicial forums.',
    'Civil litigation encompasses disputes concerning private rights, property ownership, contractual obligations, and statutory remedies. We provide rigorous research, meticulous drafting of plaints and written statements, and dedicated representation before Civil Courts, Revenue Courts, and Appellate authorities. Every matter is approached with a commitment to procedural precision under the Code of Civil Procedure.',
    1,
    true
) ON CONFLICT (slug) DO NOTHING;

-- Category 2: Family Law
INSERT INTO practice_areas (id, title, slug, short_description, full_description, display_order, is_published)
VALUES (
    'b0000000-0000-0000-0000-000000000002',
    'Family Law',
    'family-law',
    'Sensitive, confidential, and steadfast legal support in matrimonial disputes, custody proceedings, maintenance, and domestic matters.',
    'Family and matrimonial disputes require a balanced combination of legal acumen and empathetic professionalism. We assist clients through mutual and contested divorce proceedings, maintenance and alimony petitions under Section 125 CrPC and personal laws, child custody and guardianship matters, as well as representation under the Protection of Women from Domestic Violence Act.',
    2,
    true
) ON CONFLICT (slug) DO NOTHING;

-- Category 3: Taxation & GST
INSERT INTO practice_areas (id, title, slug, short_description, full_description, display_order, is_published)
VALUES (
    'b0000000-0000-0000-0000-000000000003',
    'Taxation & GST',
    'taxation-gst',
    'Comprehensive direct and indirect taxation advisory, ITR filing, GST registration, assessment proceedings, and compliance audits.',
    'Navigating the evolving landscape of Indian taxation law demands rigorous compliance and forward-looking advisory. We provide structured guidance on Income Tax filings, advance tax planning, GST registration, monthly and annual GST return filings, handling show-cause notices, and representation before departmental appellate authorities.',
    3,
    true
) ON CONFLICT (slug) DO NOTHING;

-- Category 4: Business Registration
INSERT INTO practice_areas (id, title, slug, short_description, full_description, display_order, is_published)
VALUES (
    'b0000000-0000-0000-0000-000000000004',
    'Business Registration',
    'business-registration',
    'End-to-end statutory registration for MSME/Udyam, partnership firms, private limited companies, and LLP incorporations.',
    'Establishing a business venture with a sound legal foundation is crucial for long-term growth and investor confidence. We assist entrepreneurs and commercial entities through MSME / Udyam registration, partnership deed drafting and registrar filings, Private Limited and LLP incorporations with the Ministry of Corporate Affairs (MCA), and obtaining requisite local commercial licences.',
    4,
    true
) ON CONFLICT (slug) DO NOTHING;

-- Category 5: ESI & Labour Welfare
INSERT INTO practice_areas (id, title, slug, short_description, full_description, display_order, is_published)
VALUES (
    'b0000000-0000-0000-0000-000000000005',
    'ESI & Labour Welfare',
    'esi-labour-welfare',
    'Guidance on statutory labour law compliance, Employee Provident Fund (PF) registration, ESI matters, and monthly return filings.',
    'Compliance with statutory employment welfare regulations protects employers from penal liabilities while safeguarding worker rights. We assist enterprises with Employees Provident Fund (EPF) and Employees State Insurance (ESI) code generation, employee data management, statutory monthly return submissions, and legal response to departmental notices.',
    5,
    true
) ON CONFLICT (slug) DO NOTHING;

-- Category 6: Trademark & Intellectual Property
INSERT INTO practice_areas (id, title, slug, short_description, full_description, display_order, is_published)
VALUES (
    'b0000000-0000-0000-0000-000000000006',
    'Trademark & Intellectual Property',
    'trademark-ipr',
    'Protection of intellectual property assets, brand name registration, logo trademarks, trademark objection responses, and copyright filings.',
    'Your brand identity and intellectual property are invaluable business assets. We offer comprehensive trademark availability searches, class classification, application filing before the Trade Marks Registry, drafting responses to examination reports and objections, as well as copyright registrations for original artistic and literary creations.',
    6,
    true
) ON CONFLICT (slug) DO NOTHING;

-- Category 7: Government-Sponsored Schemes
INSERT INTO practice_areas (id, title, slug, short_description, full_description, display_order, is_published)
VALUES (
    'b0000000-0000-0000-0000-000000000007',
    'Government-Sponsored Schemes',
    'government-schemes',
    'Legal documentation, detailed project report (DPR) preparation, and loan assistance under PMEGP, MUDRA, and Startup India initiatives.',
    'Accessing sovereign financial schemes requires structured documentation and compliance with departmental guidelines. We assist micro, small, and medium enterprises with project profile preparation, DPR compilation, and regulatory documentation for Prime Minister Employment Generation Programme (PMEGP), Pradhan Mantri MUDRA Yojana, and Startup India seed/credit assistance schemes.',
    7,
    true
) ON CONFLICT (slug) DO NOTHING;

-- 3. Services Seed (Linked to each Practice Area)
-- Civil Litigation Services
INSERT INTO services (practice_area_id, title, slug, description, display_order, is_published) VALUES
('b0000000-0000-0000-0000-000000000001', 'Property Disputes', 'property-disputes', 'Legal representation in title suits, boundary disputes, partition suits, and injunction proceedings before Civil Courts.', 1, true),
('b0000000-0000-0000-0000-000000000001', 'Contracts & Agreements', 'contracts-agreements', 'Drafting, legal vetting, and litigation regarding breach of contract, specific performance, and commercial accords.', 2, true),
('b0000000-0000-0000-0000-000000000001', 'Writs & Constitutional Remedies', 'writs-constitutional', 'Filing and representation in writ petitions under Articles 226/227 for the enforcement of fundamental and legal rights.', 3, true),
('b0000000-0000-0000-0000-000000000001', 'Appeals & Revisions', 'appeals-revisions', 'Handling first appeals, second appeals, and civil revisions before District and High Court appellate benches.', 4, true)
ON CONFLICT (practice_area_id, slug) DO NOTHING;

-- Family Law Services
INSERT INTO services (practice_area_id, title, slug, description, display_order, is_published) VALUES
('b0000000-0000-0000-0000-000000000002', 'Divorce Proceedings', 'divorce-proceedings', 'Counsel and legal representation in mutual consent divorce petitions and contested matrimonial proceedings.', 1, true),
('b0000000-0000-0000-0000-000000000002', 'Child Custody & Visitation', 'child-custody', 'Legal guidance regarding the welfare of minors, guardianship rights, and interim and permanent custody orders.', 2, true),
('b0000000-0000-0000-0000-000000000002', 'Alimony & Maintenance', 'alimony-maintenance', 'Representation in claims for interim and permanent maintenance under Section 125 CrPC and personal status statutes.', 3, true),
('b0000000-0000-0000-0000-000000000002', 'Domestic Violence Matters', 'domestic-violence-matters', 'Legal assistance and defense in proceedings under the Protection of Women from Domestic Violence Act (PWDVA).', 4, true)
ON CONFLICT (practice_area_id, slug) DO NOTHING;

-- Taxation & GST Services
INSERT INTO services (practice_area_id, title, slug, description, display_order, is_published) VALUES
('b0000000-0000-0000-0000-000000000003', 'ITR Filing & Assessment', 'itr-filing-assessment', 'Filing of individual, firm, and corporate income tax returns with rigorous audit trail verification.', 1, true),
('b0000000-0000-0000-0000-000000000003', 'Tax Planning & Advisory', 'tax-planning-advisory', 'Lawful optimization of tax obligations for professionals, traders, and corporate entities within statutory exemptions.', 2, true),
('b0000000-0000-0000-0000-000000000003', 'GST Registration', 'gst-registration', 'End-to-end documentation, application submission, and departmental clearance for fresh GSTIN issuance.', 3, true),
('b0000000-0000-0000-0000-000000000003', 'GST Compliance & Notice Handling', 'gst-compliance-notices', 'Periodic GSTR-1, GSTR-3B filings, annual reconciliations, and drafting responses to departmental audit queries.', 4, true)
ON CONFLICT (practice_area_id, slug) DO NOTHING;

-- Business Registration Services
INSERT INTO services (practice_area_id, title, slug, description, display_order, is_published) VALUES
('b0000000-0000-0000-0000-000000000004', 'MSME / Udyam Registration', 'udyam-registration', 'Online certification and benefits entitlement documentation under the Micro, Small and Medium Enterprises Act.', 1, true),
('b0000000-0000-0000-0000-000000000004', 'Partnership Firm Registration', 'firm-registration', 'Drafting of formal Partnership Deeds, notary attestations, and registration with the Registrar of Firms.', 2, true),
('b0000000-0000-0000-0000-000000000004', 'Company Incorporation (Pvt Ltd / LLP)', 'company-incorporation', 'Name reservation, DSC, DIN, SPICe+ e-filings, MOA/AOA drafting, and MCA Certificate of Incorporation procurement.', 3, true)
ON CONFLICT (practice_area_id, slug) DO NOTHING;

-- ESI & Labour Welfare Services
INSERT INTO services (practice_area_id, title, slug, description, display_order, is_published) VALUES
('b0000000-0000-0000-0000-000000000005', 'PF Registration & Setup', 'pf-registration-setup', 'Employer establishment registration with the EPFO, universal account number (UAN) generation, and portal setup.', 1, true),
('b0000000-0000-0000-0000-000000000005', 'Monthly Returns (PF & ESI)', 'monthly-returns', 'Monthly wage computation, electronic challan cum return (ECR) generation, and timely deposit verification.', 2, true),
('b0000000-0000-0000-0000-000000000005', 'Labour Compliance Advisory', 'labour-compliance', 'Advisory on Shops & Commercial Establishments Act, minimum wages compliance, register maintenance, and inspections.', 3, true)
ON CONFLICT (practice_area_id, slug) DO NOTHING;

-- Trademark & Intellectual Property Services
INSERT INTO services (practice_area_id, title, slug, description, display_order, is_published) VALUES
('b0000000-0000-0000-0000-000000000006', 'Trademark Registration', 'trademark-registration', 'Trademark search, class selection, filing Form TM-A, and monitoring trademark journal publications.', 1, true),
('b0000000-0000-0000-0000-000000000006', 'Brand Name Protection', 'brand-name-protection', 'Strategic legal counsel on brand distinctiveness, cease & desist notices, and passing-off remedies.', 2, true),
('b0000000-0000-0000-0000-000000000006', 'Logo & Device Registration', 'logo-registration', 'Filing and safeguarding stylized device marks and visual brand emblems against infringement.', 3, true),
('b0000000-0000-0000-0000-000000000006', 'Copyright Registration', 'copyright-registration', 'Statutory registration of literary, dramatic, musical, artistic works, and digital assets under Copyright Act.', 4, true)
ON CONFLICT (practice_area_id, slug) DO NOTHING;

-- Government-Sponsored Schemes Services
INSERT INTO services (practice_area_id, title, slug, description, display_order, is_published) VALUES
('b0000000-0000-0000-0000-000000000007', 'Project Reports (DPR)', 'project-reports', 'Drafting technically sound Detailed Project Reports compliant with banking and institutional credit guidelines.', 1, true),
('b0000000-0000-0000-0000-000000000007', 'PMEGP Application Assistance', 'pmegp-assistance', 'Eligibility verification, online portal documentation, and margin money subsidy guidance under PMEGP.', 2, true),
('b0000000-0000-0000-0000-000000000007', 'MUDRA Loan Advisory', 'mudra-loan-advisory', 'Documentation preparation for Shishu, Kishore, and Tarun loan categories under the Pradhan Mantri MUDRA scheme.', 3, true),
('b0000000-0000-0000-0000-000000000007', 'Startup India Loan & Seed Assistance', 'startup-india-assistance', 'DPIIT recognized startup application facilitation, tax exemption documentation, and credit guarantee navigation.', 4, true)
ON CONFLICT (practice_area_id, slug) DO NOTHING;

-- 4. Initial Educational Articles (Legal Resources)
INSERT INTO articles (
    id,
    title,
    slug,
    excerpt,
    content,
    cover_image_path,
    category,
    status,
    meta_title,
    meta_description,
    published_at
) VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'Understanding the Essentials of Civil Title Disputes in Uttar Pradesh',
    'understanding-civil-title-disputes-up',
    'A practical explainer on evidentiary requirements, revenue records (Khatauni), and declaratory injunction suits under the Specific Relief Act.',
    '<h2>Introduction to Title Disputes</h2><p>In civil litigation involving immovable property, the question of title and lawful possession stands paramount. Under Indian jurisprudence, possession is considered prima facie evidence of ownership against all but the true owner.</p><h3>Key Statutory Frameworks</h3><p>Title and boundary disputes in Uttar Pradesh are governed primarily by:</p><ul><li><strong>Specific Relief Act, 1963:</strong> Provisions concerning Declaratory Decrees (Section 34) and Permanent Injunctions (Section 38).</li><li><strong>Code of Civil Procedure, 1908:</strong> Procedural rules governing the institution of suits, framing of issues, and evidentiary scrutiny.</li><li><strong>U.P. Revenue Code, 2006:</strong> Special provisions governing agricultural holdings, mutation entries, and demarcations.</li></ul><h3>Evidentiary Value of Revenue Entries</h3><p>It is well settled through authoritative pronouncements of the Supreme Court of India that revenue entries (such as Khatauni or Khasra) are maintained primarily for fiscal purposes and do not confer absolute title by themselves. Rather, substantive title must be substantiated through registered conveyances, partition decrees, or inheritance genealogies.</p><p><em>Disclaimer: This article is intended solely for general legal literacy and does not constitute formal legal counsel.</em></p>',
    '/assets/images/article-civil.jpg',
    'Civil Litigation',
    'published',
    'Understanding Civil Title Disputes in Uttar Pradesh | Legal Guide',
    'Comprehensive legal overview on property title suits, revenue records, and declaratory decrees under Indian Civil Law.',
    timezone('utc'::text, now())
), (
    'c0000000-0000-0000-0000-000000000002',
    'A Practical Guide to GST Compliance and Notice Resolutions for Small Businesses',
    'guide-gst-compliance-notice-resolution',
    'An overview of critical deadlines, common causes for departmental audit notices, and systematic methods for filing replies under the CGST Act.',
    '<h2>The Importance of Timely GST Compliance</h2><p>For small and medium enterprises, maintaining synchronized compliance across GSTR-1 (outward supplies), GSTR-3B (summary returns), and GSTR-2B (input tax credit reconciliation) is vital to preventing mismatch notices under Section 61 of the CGST Act.</p><h3>Common Triggers for Departmental Notices</h3><ul><li><strong>ITC Mismatch:</strong> Discrepancies between input tax claimed in GSTR-3B versus supplies auto-populated in GSTR-2B.</li><li><strong>E-Way Bill Inconsistencies:</strong> Turnover variations between reported outward supplies and generated e-way documents.</li><li><strong>Non-filing or Delayed Filing:</strong> Suspension of GSTIN after persistent non-compliance for specified tax periods.</li></ul><h3>Procedure for Responding to Scrutiny Notices</h3><p>Upon receipt of Form GST ASMT-10, the taxpayer must formulate a point-by-point factual submission supported by invoices, payment vouchers, and bank verification certificates within the statutory thirty-day timeline. Timely and well-reasoned replies often obviate the need for penal adjudication under Sections 73 or 74.</p>',
    '/assets/images/article-taxation.jpg',
    'Taxation & GST',
    'published',
    'Guide to GST Compliance & Notice Resolution | Legal Resources',
    'Learn how small businesses can navigate GST notices, reconcile ITC, and maintain statutory tax compliance effectively.',
    timezone('utc'::text, now())
) ON CONFLICT (slug) DO NOTHING;

-- 5. Default Site Settings
INSERT INTO site_settings (setting_key, setting_value, is_public) VALUES
('general_contact', '{
    "phone": "+91 9198106052",
    "email": "advshiv43@gmail.com",
    "location": "Civil Court, Gorakhpur, Uttar Pradesh, India",
    "office_address": "Chamber No. [Pending Client Verification], Civil Court Campus, Gorakhpur, Uttar Pradesh - 273001, India",
    "timings": "Monday – Saturday: 10:00 AM – 5:00 PM (By Prior Appointment)"
}'::jsonb, true),
('bar_council_disclaimer', '{
    "statutory_text": "As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising in any manner. By accessing this website (advshivpandey.in or equivalent), the user acknowledges that the information provided herein is solely for informational and educational purposes at the user’s voluntary request, and does not create an advocate-client relationship. No material on this website constitutes legal advice or solicitation."
}'::jsonb, true)
ON CONFLICT (setting_key) DO NOTHING;

