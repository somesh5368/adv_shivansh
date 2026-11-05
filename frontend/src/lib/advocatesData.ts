export interface Advocate {
  id: string;
  name: string;
  title: string;
  specialization: string;
  phone: string;
  email: string;
  initials: string;
  court: string;
  bio: string;
  disciplines: string[];
}

export const FIRM_ADVOCATES: Advocate[] = [
  {
    id: 'adv-shivansh-kumar-pandey',
    name: 'Adv. Shivansh Kumar Pandey',
    title: 'Partner Advocate',
    specialization: 'Civil & Taxation',
    phone: '+91 9198106052',
    email: 'justicealliencelaw@gmail.com',
    initials: 'SP',
    court: 'Civil Court Campus, Gorakhpur & High Court',
    bio: 'Leads the civil litigation, property disputes, and direct & indirect taxation divisions. Specializes in ancestral title suits, partition decrees, revenue appeals, and GST/ITAT controversy resolution with rigorous evidentiary analysis.',
    disciplines: ['Civil Litigation', 'Direct & Indirect Taxation', 'Property Title & Partition', 'Commercial Agreements'],
  },
  {
    id: 'adv-rahul-maurya',
    name: 'Adv. Rahul Maurya',
    title: 'Partner Advocate',
    specialization: 'Cyber & Criminal',
    phone: '+91 89350 90610',
    email: 'justicealliencelaw@gmail.com',
    initials: 'RM',
    court: 'Civil & Sessions Court, Gorakhpur',
    bio: 'Leads the cyber law defense and criminal litigation practice. Handles technical digital forensics, IT Act proceedings, financial cyber fraud, emergency bails, and white-collar defense with relentless evidentiary scrutiny.',
    disciplines: ['Cyber Crime & IT Act', 'Bail & Criminal Defense', 'Financial Frauds', 'Electronic Evidence (Sec 65B)'],
  },
  {
    id: 'adv-ratnakar-yadav',
    name: 'Adv. Ratnakar Yadav',
    title: 'Partner Advocate',
    specialization: 'Criminal & Family',
    phone: '+91 95174 52736',
    email: 'justicealliencelaw@gmail.com',
    initials: 'RY',
    court: 'Civil & Family Court, Gorakhpur',
    bio: 'Spearheads criminal trial defense and matrimonial dispute resolution. Experienced in Section 125 CrPC maintenance claims, contested divorce, child custody petitions, and Sessions Court criminal defense.',
    disciplines: ['Criminal Trials & Appeals', 'Family & Matrimonial Law', 'Maintenance & Custody', 'Domestic Violence Matters'],
  },
];
