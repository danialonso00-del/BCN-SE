import type { IconName } from './components/Icons';

export const EMAIL = 'contact@bcnsportsevents.com';

export const mailto = (subject?: string) =>
  `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export type Service = {
  id: string;
  num: string;
  title: string;
  short: string;
  body: string;
  topics: string[];
  icon: IconName;
  image: { name: string; ratio: [number, number]; alt: string; position?: string };
};

export const SERVICES: Service[] = [
  {
    id: 'football-academy',
    num: '01',
    title: 'Football Academy',
    short: 'Academy model, methodology and player pathway.',
    body: 'Build a football academy with a clear sporting model. We help define its structure, training methodology and player development pathway, and how the academy is organised day to day.',
    topics: ['Academy model & structure', 'Training methodology', 'Player development pathway'],
    icon: 'academy',
    image: {
      name: 'academy',
      ratio: [1600, 900],
      alt: 'Aerial view of a football training session, players working through drills between cones',
    },
  },
  {
    id: 'training-knowledge',
    num: '02',
    title: 'Training & Knowledge Transfer',
    short: 'Programmes and exchanges built around practical learning.',
    body: 'Make sporting expertise easier to share and apply. We design training programmes and knowledge exchanges around clear learning goals, relevant content and practical takeaways for the people involved.',
    topics: ['Programme design', 'Learning formats', 'Exchange of sporting know-how'],
    icon: 'knowledge',
    image: {
      name: 'knowledge',
      ratio: [1600, 978],
      alt: 'A team gathered in a tight huddle on a blue hockey pitch',
    },
  },
  {
    id: 'sports-events',
    num: '03',
    title: 'Sports Event Organisation',
    short: 'From concept and format to planning and delivery.',
    body: 'Turn a sporting idea into a well-run event. We help shape the concept, audience and format, plan the priorities and coordinate the people and partners involved on the way to event day.',
    topics: ['Concept & format', 'Planning & logistics', 'Stakeholder coordination'],
    icon: 'event',
    image: {
      name: 'event',
      ratio: [1600, 1200],
      alt: 'Stadium exterior lit at dusk beside a river, its roof masts against a deep blue sky',
    },
  },
  {
    id: 'infrastructure',
    num: '04',
    title: 'Sports Infrastructure Optimisation',
    short: 'Getting more from the facilities you already have.',
    body: 'Make sports facilities work harder for the people who use them. We review how infrastructure is used and organised, and identify practical improvements in scheduling, operations and use of space.',
    topics: ['Facility use review', 'Scheduling & operations', 'Improvement roadmap'],
    icon: 'infrastructure',
    image: {
      name: 'infrastructure',
      ratio: [1600, 1000],
      alt: 'Aerial night view of a compact floodlit football ground surrounded by trees',
    },
  },
  {
    id: 'business-marketing',
    num: '05',
    title: 'Sports Business Development & Marketing',
    short: 'Positioning, partnerships and audience growth.',
    body: 'Help your sports project grow. We support business development and marketing, from positioning and partnership strategy to the communication that connects you with your audience.',
    topics: ['Strategy & positioning', 'Partnership development', 'Marketing & communication'],
    icon: 'business',
    image: {
      name: 'business',
      ratio: [1600, 1067],
      alt: 'Rows of empty stadium seats curving into the distance',
    },
  },
];

export const NEEDS: { title: string; body: string; icon: IconName; subject: string }[] = [
  {
    title: 'A football academy',
    body: 'Define the model, the methodology and the pathway for your players.',
    icon: 'academy',
    subject: 'Football academy enquiry',
  },
  {
    title: 'A training programme',
    body: 'Connect participants’ needs with relevant content and a practical learning format.',
    icon: 'knowledge',
    subject: 'Training & knowledge transfer enquiry',
  },
  {
    title: 'A sports event',
    body: 'Shape the concept, define the audience and organise the planning priorities.',
    icon: 'event',
    subject: 'Sports event enquiry',
  },
  {
    title: 'Better-used facilities',
    body: 'Review how your infrastructure is used and where it can work harder.',
    icon: 'infrastructure',
    subject: 'Sports infrastructure enquiry',
  },
  {
    title: 'A growing sports business',
    body: 'Clarify your positioning, partnerships and how you reach your audience.',
    icon: 'business',
    subject: 'Sports business & marketing enquiry',
  },
];

export const STEPS: { title: string; body: string; icon: IconName }[] = [
  { title: 'Understand', body: 'We start with your context, objectives and the people involved.', icon: 'understand' },
  { title: 'Structure', body: 'We shape a focused approach, with clear priorities and a shared direction.', icon: 'structure' },
  { title: 'Prepare', body: 'We translate the approach into practical plans, formats and next steps.', icon: 'prepare' },
  { title: 'Transfer', body: 'We focus on knowledge and tools your team can carry forward.', icon: 'transfer' },
];
