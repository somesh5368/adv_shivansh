export interface Advocate {
  id: string;
  name: string;
  title: string;
  specialization: string;
  phone?: string;
  email: string;
  initials: string;
  isPrimary?: boolean;
  court: string;
  bio: string;
  disciplines: string[];
}

export const FIRM_ADVOCATES: Advocate[] = [
  {
    id: 'adv-shivansh',
    name: 'Adv. Shivansh',
    title: 'Senior Partner & Practice Lead',
    specialization: 'Civil & Taxation',
    email: 'justicealliencelaw@gmail.com',
    initials: 'AS',
    isPrimary: true,
    court: 'Civil Court Campus, Gorakhpur & Allahabad High Court',
    bio: 'Directs the civil litigation and direct/indirect taxation divisions at Justice Alliance Associates. Focuses on immovable property disputes, constitutional writs, and complex corporate tax controversies with statutory precision and strategic rigor.',
    disciplines: ['Civil Litigation', 'Direct & Indirect Taxation', 'Property Title & Partition', 'Commercial Agreements'],
  },
  {
    id: 'adv-rahul-maurya',
    name: 'Adv. Rahul Maurya',
    title: 'Partner',
    specialization: 'Cyber & Criminal',
    phone: '+91 89350 90610',
    email: 'justicealliencelaw@gmail.com',
    initials: 'RM',
    isPrimary: false,
    court: 'Civil & Sessions Court, Gorakhpur',
    bio: 'Leads the cyber law defense and criminal litigation practice. Handles technical digital forensics, IT Act proceedings, financial cyber fraud, emergency bails, and white-collar defense with relentless evidentiary scrutiny.',
    disciplines: ['Cyber Crime & IT Act', 'Bail & Criminal Defense', 'Financial Frauds', 'Electronic Evidence (Sec 65B)'],
  },
  {
    id: 'adv-ratnakar-yadav',
    name: 'Adv. Ratnakar Yadav',
    title: 'Partner',
    specialization: 'Criminal & Family',
    phone: '+91 95174 52736',
    email: 'justicealliencelaw@gmail.com',
    initials: 'RY',
    isPrimary: false,
    court: 'Civil & Family Court, Gorakhpur',
    bio: 'Spearheads criminal trial defense and matrimonial dispute resolution. Experienced in Section 125 CrPC maintenance claims, contested divorce, child custody petitions, and Sessions Court criminal defense.',
    disciplines: ['Criminal Trials & Appeals', 'Family & Matrimonial Law', 'Maintenance & Custody', 'Domestic Violence Matters'],
  },
];
