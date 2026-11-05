import { PracticeArea } from '@/types';

export const FIRM_PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'pa-criminal-law',
    title: 'Criminal Law',
    slug: 'criminal-law',
    short_description:
      'Vigorous defense in criminal proceedings, anticipatory and regular bail applications, trial representation, FIR quashing under Section 482, and appellate advocacy.',
    full_description:
      'Justice Alliance Associates provides strategic defense across all stages of criminal litigation before Judicial Magistrates, Sessions Courts, and the High Court. From emergency bail interventions and custodial safeguards to cross-examination during trial proceedings and appellate challenges, our criminal defense practitioners examine police chargesheets, evidentiary chains of custody, and forensic procedures to guarantee constitutional liberties under Articles 20, 21, and 22 of the Constitution of India.',
    image_path:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    display_order: 1,
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    services: [
      {
        id: 'srv-crim-1',
        practice_area_id: 'pa-criminal-law',
        title: 'Anticipatory & Regular Bail',
        slug: 'anticipatory-regular-bail',
        description:
          'Urgent representation under Sections 437, 438, and 439 CrPC (and corresponding Bharatiya Nagarik Suraksha Sanhita provisions) across District Courts and High Court benches.',
        display_order: 1,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-crim-2',
        practice_area_id: 'pa-criminal-law',
        title: 'Trial Defense & Cross-Examination',
        slug: 'trial-defense',
        description:
          'Rigorous courtroom representation during framing of charges, evidentiary trials, witness cross-examination, and final arguments.',
        display_order: 2,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-crim-3',
        practice_area_id: 'pa-criminal-law',
        title: 'FIR Quashing & Section 482 Petitions',
        slug: 'fir-quashing',
        description:
          'Inherent powers petitions before the High Court for quashing frivolous, motivated, or compoundable criminal proceedings.',
        display_order: 3,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-crim-4',
        practice_area_id: 'pa-criminal-law',
        title: 'Economic & Financial Offenses',
        slug: 'economic-offenses',
        description:
          'Defense in white-collar allegations, Section 138 Negotiable Instruments Act cheque bounce, forgery, cheating, and statutory tribunal matters.',
        display_order: 4,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
    ],
  },
  {
    id: 'pa-cyber-law',
    title: 'Cyber Law',
    slug: 'cyber-law',
    short_description:
      'Legal counsel and litigation for digital financial fraud, Information Technology Act violations, data privacy breaches, cyber defamation, and digital evidence recovery.',
    full_description:
      'In an increasingly digitized socio-economic ecosystem, cyber offenses and digital civil wrongs demand specialized technical comprehension combined with statutory expertise. Justice Alliance Associates provides dedicated legal counsel across offences under the Information Technology Act 2000, unauthorized database access, digital extortion, online financial phishing, crypto asset disputes, and digital defamation. We coordinate with forensic experts and cyber crime police cells to protect our clients rights and secure remedies under Section 65B of the Indian Evidence Act.',
    image_path:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    display_order: 2,
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    services: [
      {
        id: 'srv-cyb-1',
        practice_area_id: 'pa-cyber-law',
        title: 'Financial Cyber Fraud & Banking Scams',
        slug: 'financial-cyber-fraud',
        description:
          'Immediate administrative and legal recourse for frozen bank accounts, UPI fraud, unauthorized transactions, and digital payment disputes.',
        display_order: 1,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-cyb-2',
        practice_area_id: 'pa-cyber-law',
        title: 'IT Act Offenses & Defense',
        slug: 'it-act-defense',
        description:
          'Defense and prosecution under Sections 43, 66, 66C, 66D, 67, and 72 of the Information Technology Act.',
        display_order: 2,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-cyb-3',
        practice_area_id: 'pa-cyber-law',
        title: 'Online Defamation & Harassment',
        slug: 'online-defamation',
        description:
          'Statutory takedown notices, criminal complaints, and injunctions against social media character assassination and cyberstalking.',
        display_order: 3,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-cyb-4',
        practice_area_id: 'pa-cyber-law',
        title: 'Electronic Evidence Certification (Sec 65B)',
        slug: 'electronic-evidence-cert',
        description:
          'Procedural compliance and verification for presenting digital records, email trails, and phone transcripts in court.',
        display_order: 4,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
    ],
  },
  {
    id: 'pa-family-law',
    title: 'Family Law',
    slug: 'family-law',
    short_description:
      'Sensitive and steadfast counsel for matrimonial matters, mutual and contested divorce, child custody, maintenance claims under Section 125 CrPC, and domestic protection.',
    full_description:
      'Matrimonial disputes and family legal affairs require utmost sensitivity, strict confidentiality, and strategic legal clarity. Justice Alliance Associates guides clients through the intricate statutory procedures of the Hindu Marriage Act, Special Marriage Act, Guardians and Wards Act, and Protection of Women from Domestic Violence Act. Our priority is safeguarding individual dignity, shielding minor children from protracted conflict, and securing equitable financial maintenance through court adjudication or structured mediation.',
    image_path:
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80',
    display_order: 3,
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    services: [
      {
        id: 'srv-fam-1',
        practice_area_id: 'pa-family-law',
        title: 'Divorce Proceedings (Mutual & Contested)',
        slug: 'divorce-proceedings',
        description:
          'Expedited mutual consent divorce under Section 13B and comprehensive advocacy in contested petitions on statutory grounds.',
        display_order: 1,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-fam-2',
        practice_area_id: 'pa-family-law',
        title: 'Child Custody & Visitation Rights',
        slug: 'child-custody-visitation',
        description:
          'Advocacy prioritizing child welfare, legal guardianship, visitation arrangements, and interim custodial reliefs.',
        display_order: 2,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-fam-3',
        practice_area_id: 'pa-family-law',
        title: 'Maintenance & Permanent Alimony',
        slug: 'maintenance-alimony',
        description:
          'Applications and defense under Section 125 CrPC, Section 24/25 HMA, ensuring fair interim and final spousal and child maintenance.',
        display_order: 3,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-fam-4',
        practice_area_id: 'pa-family-law',
        title: 'Domestic Violence Act Proceedings',
        slug: 'domestic-violence-cases',
        description:
          'Filing and defense of complaints under the DV Act, residence orders, protection orders, and monetary relief petitions.',
        display_order: 4,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
    ],
  },
  {
    id: 'pa-civil-litigation',
    title: 'Civil Litigation',
    slug: 'civil-litigation',
    short_description:
      'Rigorous courtroom advocacy in immovable property disputes, partition suits, title declarations, injunctions, specific performance of contracts, and execution proceedings.',
    full_description:
      'Civil litigation demands meticulous evidentiary examination, strict compliance with the Code of Civil Procedure (CPC), and thorough knowledge of property title jurisprudence. Justice Alliance Associates provides representation in property partition, revenue boundary rectifications, cancellation of sale deeds, permanent and mandatory injunctions, specific performance suits, and money recovery. We handle disputes from preliminary legal notices and plaints through to final decrees and execution proceedings before District and Civil Courts.',
    image_path:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    display_order: 4,
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    services: [
      {
        id: 'srv-civ-1',
        practice_area_id: 'pa-civil-litigation',
        title: 'Property Title & Partition Suits',
        slug: 'property-title-partition',
        description:
          'Legal actions for ancestral partition, demarcation of metes and bounds, declaration of ownership, and recovery of possession.',
        display_order: 1,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-civ-2',
        practice_area_id: 'pa-civil-litigation',
        title: 'Injunctions & Stay Orders',
        slug: 'injunctions-stay-orders',
        description:
          'Urgent applications under Order 39 Rules 1 & 2 CPC for restraining illegal dispossession, unauthorized construction, or alienation.',
        display_order: 2,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-civ-3',
        practice_area_id: 'pa-civil-litigation',
        title: 'Specific Performance & Contract Breaches',
        slug: 'specific-performance-contracts',
        description:
          'Enforcement of registered agreements to sell, commercial contract disputes, damages claims, and statutory recovery.',
        display_order: 3,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-civ-4',
        practice_area_id: 'pa-civil-litigation',
        title: 'Decree Execution & Civil Appeals',
        slug: 'execution-petitions-appeals',
        description:
          'Execution petitions under Order 21 CPC to enforce court decrees, along with First and Second Appeals before appellate forums.',
        display_order: 4,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
    ],
  },
  {
    id: 'pa-taxation-gst',
    title: 'Taxation & GST',
    slug: 'taxation-gst',
    short_description:
      'Strategic advisory and statutory representation for GST notices, scrutiny assessments, Income Tax disputes, appellate tribunals, and corporate fiscal structuring.',
    full_description:
      'Navigating dynamic direct and indirect tax legislations requires an analytical approach that synchronizes statutory compliance with dispute prevention. Justice Alliance Associates advises individuals, MSMEs, commercial traders, and corporations on Goods and Services Tax (GST) inquiries, input tax credit (ITC) reconciliations, show cause notice (SCN) responses, and Income Tax assessment disputes. We represent clients before statutory adjudicating authorities, Appellate Commissioners, and Tax Tribunals with rigorous documentary backing.',
    image_path:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    display_order: 5,
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    services: [
      {
        id: 'srv-tax-1',
        practice_area_id: 'pa-taxation-gst',
        title: 'GST Notice Responses & Audit Representation',
        slug: 'gst-notices-audits',
        description:
          'Drafting legally grounded replies to DRC-01 notices, Departmental audits, ITC mismatch inquiries, and cancellation revoking.',
        display_order: 1,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-tax-2',
        practice_area_id: 'pa-taxation-gst',
        title: 'Income Tax Scrutiny & Appeals',
        slug: 'income-tax-scrutiny-appeals',
        description:
          'Assistance in faceless assessment notices, Section 148 reassessment notices, and appeals before CIT(Appeals) and ITAT.',
        display_order: 2,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-tax-3',
        practice_area_id: 'pa-taxation-gst',
        title: 'Corporate Tax Structuring & Advisory',
        slug: 'corporate-tax-structuring',
        description:
          'Proactive fiscal planning, commercial contract tax clauses, MSME compliance advisory, and statutory filings.',
        display_order: 3,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: 'srv-tax-4',
        practice_area_id: 'pa-taxation-gst',
        title: 'Tax Dispute Resolution & Writ Remedies',
        slug: 'tax-dispute-resolution',
        description:
          'Challenging unconstitutional tax attachments, bank freeze notices, and arbitrary demands through statutory remedies and High Court writs.',
        display_order: 4,
        is_published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
    ],
  },
];

export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
  return FIRM_PRACTICE_AREAS.find((area) => area.slug === slug);
}

