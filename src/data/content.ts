export interface TechItem {
  name: string;
  category: string;
  iconName: string;
}

export const TECH_STACK: TechItem[] = [
  { name: 'Next.js', category: 'Web Platform', iconName: 'Globe' },
  { name: 'React Native', category: 'Cross-Platform', iconName: 'Smartphone' },
  { name: 'Flutter', category: 'High-Performance Mobile', iconName: 'Layers' },
  { name: 'Node.js', category: 'Enterprise Backend', iconName: 'Server' },
  { name: 'SQLite Sync', category: 'Local-First Engine', iconName: 'Database' },
  { name: 'AWS Cloud', category: 'Infrastructure', iconName: 'Cloud' },
  { name: 'Tailwind CSS', category: 'Design Architecture', iconName: 'Palette' },
  { name: 'Android Studio', category: 'Native POS/Hardware', iconName: 'Cpu' },
  { name: 'TypeScript', category: 'Type-Safe Systems', iconName: 'Code2' },
  { name: 'PostgreSQL', category: 'Relational Cloud DB', iconName: 'HardDrive' },
  { name: 'Docker', category: 'Microservices', iconName: 'Box' },
  { name: 'Redis', category: 'In-Memory Caching', iconName: 'Zap' },
];

export interface Capability {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  techPills: string[];
  metrics: { label: string; value: string }[];
  highlight: string;
  bgImage: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'mobile-web',
    number: '01',
    title: 'Mobile & Web Platforms',
    tagline: 'High-performance cross-platform applications with zero compromise.',
    description:
      'We engineer native-speed mobile applications in React Native and Flutter alongside reactive Next.js enterprise web portals. Designed for seamless user journeys, hardware integration, and high conversion.',
    bulletPoints: [
      'Multi-tenant web architectures with sub-100ms first paint',
      'Unified iOS and Android codebases with native native-bridge performance',
      'Embedded biometric authentication, NFC, and thermal printer drivers',
      'Optimistic state updates with zero screen stuttering',
    ],
    techPills: ['React Native', 'Flutter', 'Next.js', 'TypeScript', 'GraphQL'],
    metrics: [
      { label: 'Render Latency', value: '< 16ms' },
      { label: 'App Store Rating', value: '4.9★' },
    ],
    highlight: 'Unified codebase architecture reduces deployment cycle time by 45%.',
    bgImage: '/src/assets/images/project_logistics_fleet_1793110063230.jpg',
  },
  {
    id: 'pos-kds',
    number: '02',
    title: 'Restaurant POS & Kitchen Display Systems',
    tagline: 'Mission-critical retail hardware & order routing built for rush hour.',
    description:
      'Engineered specifically for high-throughput hospitality and retail environments. When 200 orders strike during lunch rush, our POS terminals and Kitchen Display Systems execute instantly without freezing or delay.',
    bulletPoints: [
      'Multi-terminal sync with split bill, tip management, and table layout',
      'Color-coded Kitchen Display Systems with prep-time alert thresholds',
      'Direct integration with ESC/POS thermal printers & cash drawers',
      'Inventory deduction at the ingredient and SKU batch level',
    ],
    techPills: ['Android Embedded', 'Local SQLite', 'WebSockets', 'Thermal SDKs'],
    metrics: [
      { label: 'Order Execution', value: '0.04s' },
      { label: 'Peak Hour Uptime', value: '100%' },
    ],
    highlight: 'Tested under simulated 2,500 simultaneous table transactions.',
    bgImage: '/src/assets/images/project_retail_pos_1793110063029.jpg',
  },
  {
    id: 'offline-first',
    number: '03',
    title: 'Offline-First Architecture & Sync',
    tagline: 'Zero connectivity? Zero downtime. Continuous transaction integrity.',
    description:
      'Internet outages and power cuts should never halt commerce. Our local-first SQLite sync engine enables complete cashier and staff operation completely offline, seamlessly resolving conflicts when connectivity returns.',
    bulletPoints: [
      'Local-first read/write writes instantly to embedded client databases',
      'Conflict-free Replicated Data Type (CRDT) reconciliation algorithms',
      'Deterministic background sync queue with cryptographic payload verification',
      'Designed specifically for emerging markets with unreliable internet grids',
    ],
    techPills: ['SQLite', 'CRDTs', 'Background Workers', 'Delta Compression'],
    metrics: [
      { label: 'Data Loss Rate', value: '0.00%' },
      { label: 'Sync Resilience', value: '100%' },
    ],
    highlight: 'Processes full shift shifts with zero active internet connection.',
    bgImage: '/src/assets/images/hero_workspace_office_1793110061540.jpg',
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'AI & Automated Retail Workflows',
    tagline: 'Intelligent inventory forecasting and conversational customer channels.',
    description:
      'Modernize operations with practical, high-ROI automation: automated WhatsApp ordering bots that route orders directly to kitchen printers, smart inventory replenishment triggers, and automated sales insights.',
    bulletPoints: [
      'WhatsApp Business API ordering bots with real-time menu synchronization',
      'Predictive inventory exhaustion alerts based on historical velocity',
      'Automated daily reconciliation summaries sent directly to owner phones',
      'Custom CRM automation pipelines for loyalty and customer retention',
    ],
    techPills: ['WhatsApp Cloud API', 'Python', 'FastAPI', 'Node.js', 'LLM Agents'],
    metrics: [
      { label: 'Manual Entry Reduced', value: '85%' },
      { label: 'Order Conversion', value: '+32%' },
    ],
    highlight: 'Transforms high-friction phone orders into automated kitchen tickets.',
    bgImage: '/src/assets/images/agency_team_collaboration_1793110064460.jpg',
  },
];

export interface Industry {
  id: string;
  name: string;
  headline: string;
  description: string;
  features: string[];
  caseStudy: {
    client: string;
    location: string;
    metric: string;
    detail: string;
  };
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'hospitality',
    name: 'Hospitality & Restaurants',
    headline: 'Flawless table turns, rapid order taking, and real-time kitchen routing.',
    description:
      'From single-location artisan cafes to multi-branch casual dining chains, our systems keep staff synchronized through rush hours without missed tickets or split-bill chaos.',
    features: [
      'Visual floor map with live table timers',
      'Modifier & ingredient customization presets',
      'Split tickets by guest, seat, or custom percentage',
      'Automated recipe cost and margin analytics',
    ],
    caseStudy: {
      client: 'Multi-Location Bistro Group',
      location: 'Islamabad & Lahore',
      metric: '3.4x Faster Table Turnover',
      detail: 'Eliminated order re-keying between front-of-house and kitchen stations.',
    },
  },
  {
    id: 'retail',
    name: 'Retail & Supermarkets',
    headline: 'High-speed barcode checkout with multi-warehouse inventory sync.',
    description:
      'Handle thousands of SKUs with sub-second barcode scans, offline cashier lanes that stay open during grid failure, and multi-location central stock replenishment.',
    features: [
      'Instant barcode scanning with weighted scale interface',
      'Customer loyalty points & tiered discounts',
      'Automated low-stock supplier purchase orders',
      'Centralized head-office price management',
    ],
    caseStudy: {
      client: 'Metro Express Retail Chain',
      location: 'Punjab, Pakistan',
      metric: '100% Offline Checkout Uptime',
      detail: 'Operated 14 lanes continuously through a 3-hour regional ISP blackout.',
    },
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Clinics',
    headline: 'Reliable patient check-ins and offline-resilient pharmacy dispensing.',
    description:
      'Mission-critical clinical management where record accessibility is paramount. Enable doctors and pharmacists to log prescriptions and dispensations without cloud latency.',
    features: [
      'HIPAA / data-protection compliant local storage',
      'Automated medicine batch & expiry tracking',
      'Patient appointment queues with SMS reminders',
      'Digital prescription generation with doctor signature',
    ],
    caseStudy: {
      client: 'Al-Shifa Specialty Clinic',
      location: 'Rawalpindi',
      metric: '40% Reduction in Patient Wait Time',
      detail: 'Streamlined doctor consultation workflows and automated pharmacy dispatch.',
    },
  },
  {
    id: 'startups',
    name: 'High-Growth Tech Startups',
    headline: 'Turn ambitious technical blueprints into scalable production products.',
    description:
      'We partner with tech founders to build rock-solid MVPs and enterprise v1 platforms that scale to millions of users with clean, maintainable engineering.',
    features: [
      'Clean modular architecture ready for series-stage audits',
      'Automated CI/CD pipelines with zero-downtime deployments',
      'Comprehensive API documentation and developer SDKs',
      'Direct communication with senior system engineers',
    ],
    caseStudy: {
      client: 'FinTech Logistics Platform',
      location: 'Dubai & Karachi',
      metric: '$1.4M Seed Round Closed',
      detail: 'Built complete dispatch engine and driver app within 9 weeks.',
    },
  },
];

export interface ProjectTypeOption {
  id: string;
  title: string;
  recommendedTimeline: string;
  defaultPkr: string;
  defaultUsd: string;
  features: string[];
}

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'mobile-app',
    title: 'Mobile Application (iOS & Android)',
    recommendedTimeline: '6 – 8 Weeks',
    defaultPkr: '450,000',
    defaultUsd: '2,500',
    features: ['React Native / Flutter', 'Offline Caching', 'Push Notifications', 'App Store Submission'],
  },
  {
    id: 'pos-retail',
    title: 'Retail / Restaurant POS & KDS System',
    recommendedTimeline: '8 – 12 Weeks',
    defaultPkr: '750,000',
    defaultUsd: '3,800',
    features: ['Offline-First SQLite', 'Thermal Printer SDK', 'Kitchen Display System', 'Multi-Terminal Sync'],
  },
  {
    id: 'web-platform',
    title: 'Enterprise Web Application / SaaS',
    recommendedTimeline: '6 – 10 Weeks',
    defaultPkr: '600,000',
    defaultUsd: '3,200',
    features: ['Next.js Architecture', 'Role-Based Auth (RBAC)', 'Custom Analytics Portal', 'REST/GraphQL APIs'],
  },
  {
    id: 'offline-sync',
    title: 'Offline-First Engine Architecture & Migration',
    recommendedTimeline: '4 – 8 Weeks',
    defaultPkr: '550,000',
    defaultUsd: '2,900',
    features: ['CRDT Conflict Resolution', 'Local Embedded Store', 'Background Sync Queue', 'Resilience Testing'],
  },
  {
    id: 'ai-automation',
    title: 'AI & WhatsApp Automation Workflows',
    recommendedTimeline: '3 – 5 Weeks',
    defaultPkr: '350,000',
    defaultUsd: '1,800',
    features: ['WhatsApp Cloud API Bot', 'Automated POS Injection', 'Inventory Prediction', 'CRM Pipeline'],
  },
];
