export type SchemaColumn = {
  name: string;
  type: string;
  constraints: string[];
  notes?: string;
};

export type SchemaTable = {
  name: string;
  description: string;
  columns: SchemaColumn[];
};

export type UserFlowStory = {
  id: string;
  title: string;
  actor: string;
  goal: string;
  steps: string[];
  tables: string[];
};

export const SAPP_DESIGN_OVERVIEW = {
  title: 'How SApp could work',
  subtitle: 'Schema and flows for a local plant-trading app',
  intro:
    'SApp matches nearby gardeners who want to trade plants. Auth stays separate from the public profile used in discovery and swipes. Matches only appear when both people tap Grow.',
  scope: [
    'Separate login account (users) from public profile (user_profiles)',
    'Nearby discovery by neighborhood / coordinates',
    'Swipe once per pair; match only on mutual Grow',
    'Chat lives on the match thread',
  ],
};

export const SAPP_USER_FLOW_STORIES: UserFlowStory[] = [
  {
    id: 'onboard',
    title: 'New gardener signs up',
    actor: 'New user',
    goal: 'Make an account and say what they grow and want.',
    steps: [
      'Register with email and a hashed password.',
      'Add name, neighborhood, and location for nearby search.',
      'Save growing plants and seeking interests as simple tags.',
      'Mark onboarding done when the profile is ready to swipe.',
    ],
    tables: ['users', 'user_profiles', 'profile_plants', 'profile_interests'],
  },
  {
    id: 'discover',
    title: 'Discover and swipe',
    actor: 'Signed-in user',
    goal: 'See nearby gardeners and Pass or Grow.',
    steps: [
      'Load profiles in range, skip yourself and anyone already swiped.',
      'Show plant tags so overlap is obvious.',
      'Pass or Grow writes one swipe row (unique per pair).',
      'If they already Grew you, create a match and notify both.',
    ],
    tables: ['user_profiles', 'profile_plants', 'profile_interests', 'swipes', 'matches'],
  },
  {
    id: 'coordinate',
    title: 'Match and arrange a trade',
    actor: 'Matched gardeners',
    goal: 'Message each other and set up a pickup or swap.',
    steps: [
      'Open an active match and load its messages.',
      'Send chat on that match thread.',
      'Optionally tie the thread to a listing (surplus / cuttings).',
    ],
    tables: ['matches', 'messages', 'listings'],
  },
];

export const SAPP_SCHEMA_TABLES: SchemaTable[] = [
  {
    name: 'users',
    description: 'Login account. Password hash only - never plaintext.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'email', type: 'VARCHAR', constraints: ['UNIQUE', 'NOT NULL'] },
      { name: 'password_hash', type: 'VARCHAR', constraints: ['NOT NULL'], notes: 'bcrypt / Argon2' },
      { name: 'first_name', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'last_name', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'phone', type: 'VARCHAR', constraints: ['NULL'], notes: 'Optional' },
      { name: 'email_verified_at', type: 'TIMESTAMPTZ', constraints: ['NULL'] },
      { name: 'is_active', type: 'BOOLEAN', constraints: ['DEFAULT true'] },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraints: ['NOT NULL'] },
    ],
  },
  {
    name: 'user_profiles',
    description: 'Public card shown in discovery - one per user.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'user_id', type: 'UUID', constraints: ['FK users', 'UNIQUE'] },
      { name: 'display_name', type: 'VARCHAR', constraints: ['NULL'] },
      { name: 'neighborhood', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'latitude', type: 'DECIMAL', constraints: ['NOT NULL'] },
      { name: 'longitude', type: 'DECIMAL', constraints: ['NOT NULL'] },
      { name: 'bio', type: 'TEXT', constraints: ['NULL'] },
      { name: 'avatar_url', type: 'VARCHAR', constraints: ['NULL'] },
      { name: 'onboarding_completed_at', type: 'TIMESTAMPTZ', constraints: ['NULL'] },
    ],
  },
  {
    name: 'profile_plants',
    description: 'What this gardener grows (chips / filters).',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'profile_id', type: 'UUID', constraints: ['FK user_profiles'] },
      { name: 'plant_slug', type: 'VARCHAR', constraints: ['NOT NULL'], notes: 'e.g. apples' },
      { name: '(profile_id, plant_slug)', type: '-', constraints: ['UNIQUE'] },
    ],
  },
  {
    name: 'profile_interests',
    description: 'What they want to find nearby.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'profile_id', type: 'UUID', constraints: ['FK user_profiles'] },
      { name: 'interest_slug', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: '(profile_id, interest_slug)', type: '-', constraints: ['UNIQUE'] },
    ],
  },
  {
    name: 'listings',
    description: 'Optional surplus / cuttings offers on a profile.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'profile_id', type: 'UUID', constraints: ['FK user_profiles'] },
      { name: 'title', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'description', type: 'TEXT', constraints: ['NULL'] },
      { name: 'tags', type: 'TEXT[]', constraints: ['DEFAULT {}'], notes: 'free, trade…' },
      { name: 'status', type: 'VARCHAR', constraints: ['DEFAULT active'] },
    ],
  },
  {
    name: 'swipes',
    description: 'Pass or Grow. One decision per pair.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'swiper_profile_id', type: 'UUID', constraints: ['FK user_profiles'] },
      { name: 'target_profile_id', type: 'UUID', constraints: ['FK user_profiles'] },
      { name: 'decision', type: 'ENUM', constraints: ['NOT NULL'], notes: 'pass | grow' },
      { name: '(swiper, target)', type: '-', constraints: ['UNIQUE'] },
    ],
  },
  {
    name: 'matches',
    description: 'Created when both profiles Grow each other.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'profile_a_id', type: 'UUID', constraints: ['FK user_profiles'] },
      { name: 'profile_b_id', type: 'UUID', constraints: ['FK user_profiles'] },
      { name: 'matched_at', type: 'TIMESTAMPTZ', constraints: ['NOT NULL'] },
      { name: 'canonical pair', type: '-', constraints: ['UNIQUE'], notes: 'ordered a/b' },
    ],
  },
  {
    name: 'messages',
    description: 'Chat on a match thread.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'match_id', type: 'UUID', constraints: ['FK matches'] },
      { name: 'sender_user_id', type: 'UUID', constraints: ['FK users'], notes: 'Account, not profile' },
      { name: 'body', type: 'TEXT', constraints: ['NOT NULL'] },
      { name: 'listing_id', type: 'UUID', constraints: ['FK listings', 'NULL'] },
      { name: 'sent_at', type: 'TIMESTAMPTZ', constraints: ['NOT NULL'] },
    ],
  },
];

export const SAPP_SCHEMA_LINKS = [
  { from: 'user_profiles', to: 'users' },
  { from: 'profile_plants', to: 'user_profiles' },
  { from: 'profile_interests', to: 'user_profiles' },
  { from: 'listings', to: 'user_profiles' },
  { from: 'swipes', to: 'user_profiles' },
  { from: 'matches', to: 'user_profiles' },
  { from: 'messages', to: 'matches' },
] as const;
