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

export const FSL_DESIGN_OVERVIEW = {
  title: 'How Flash Sale Lab could work',
  subtitle: 'Schema and flows for a checkout stress-test console',
  intro:
    'Flash Sale Lab connects to a customer staging store, runs flash-sale scenarios with virtual buyers, and records every request so teams can compare naive checkout against hold + idempotent complete.',
  scope: [
    'One tenant connection per staging store (keys hashed, never stored plain)',
    'Each test run picks a scenario, concurrency, and checkout strategy',
    'Append-only request log for replay and reports',
    'Pass/fail from oversells, timeouts, and P95 against a simple SLA',
  ],
};

export const FSL_USER_FLOW_STORIES: UserFlowStory[] = [
  {
    id: 'connect',
    title: 'Connect staging',
    actor: 'QA lead',
    goal: 'Point the lab at a sandbox and prove it can talk to inventory.',
    steps: [
      'Add the store name, base URL, and environment.',
      'Save the API key as a hash plus a short display prefix.',
      'Ping inventory GET; unlock runs only if that succeeds.',
    ],
    tables: ['tenants', 'tenant_api_keys'],
  },
  {
    id: 'run',
    title: 'Run a flash sale test',
    actor: 'QA engineer',
    goal: 'Fire concurrent buyers and watch hold → complete traffic.',
    steps: [
      'Create a run: scenario, SKU, stock, concurrency, strategy.',
      'Spawn virtual buyers; each follows the strategy path against staging.',
      'Log every HTTP call (status + latency) for the live console.',
      'Mark the run completed and store aggregate metrics.',
    ],
    tables: ['test_runs', 'virtual_buyers', 'request_log', 'strategies'],
  },
  {
    id: 'report',
    title: 'Review the report',
    actor: 'Engineering manager',
    goal: 'See if checkout is safe enough to launch.',
    steps: [
      'Compare success, oversells, timeouts, and P95 for each strategy.',
      'Replay the request log side by side.',
      'Export a short evidence pack if stakeholders need it.',
    ],
    tables: ['test_runs', 'request_log', 'strategies'],
  },
];

export const FSL_SCHEMA_TABLES: SchemaTable[] = [
  {
    name: 'tenants',
    description: 'A customer staging / sandbox connection.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'name', type: 'VARCHAR', constraints: ['NOT NULL'], notes: 'e.g. Meridian Hobby' },
      { name: 'base_url', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'environment', type: 'ENUM', constraints: ['NOT NULL'], notes: 'sandbox | staging' },
      { name: 'status', type: 'VARCHAR', constraints: ['DEFAULT pending'], notes: 'pending | active' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraints: ['NOT NULL'] },
    ],
  },
  {
    name: 'tenant_api_keys',
    description: 'Credentials. Hash only - never store the raw key.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'tenant_id', type: 'UUID', constraints: ['FK tenants'] },
      { name: 'key_prefix', type: 'VARCHAR', constraints: ['NOT NULL'], notes: 'sk_test_••••' },
      { name: 'secret_hash', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'revoked_at', type: 'TIMESTAMPTZ', constraints: ['NULL'] },
    ],
  },
  {
    name: 'strategies',
    description: 'Checkout patterns under test (seed data, not per-run config soup).',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'slug', type: 'VARCHAR', constraints: ['UNIQUE'], notes: 'naive | hold-idempotent' },
      { name: 'hold_enabled', type: 'BOOLEAN', constraints: ['NOT NULL'] },
      { name: 'idempotent_complete', type: 'BOOLEAN', constraints: ['NOT NULL'] },
      { name: 'hold_ttl_sec', type: 'INTEGER', constraints: ['DEFAULT 90'] },
    ],
  },
  {
    name: 'test_runs',
    description: 'One job: scenario + load + results.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'tenant_id', type: 'UUID', constraints: ['FK tenants'] },
      { name: 'strategy_id', type: 'UUID', constraints: ['FK strategies'] },
      { name: 'scenario', type: 'VARCHAR', constraints: ['NOT NULL'], notes: 'last-unit, …' },
      { name: 'sku', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'stock', type: 'INTEGER', constraints: ['CHECK >= 0'] },
      { name: 'concurrency', type: 'INTEGER', constraints: ['CHECK > 0'] },
      { name: 'status', type: 'ENUM', constraints: ['NOT NULL'], notes: 'queued → completed' },
      { name: 'successful_checkouts', type: 'INTEGER', constraints: ['DEFAULT 0'] },
      { name: 'oversells', type: 'INTEGER', constraints: ['DEFAULT 0'] },
      { name: 'timeouts', type: 'INTEGER', constraints: ['DEFAULT 0'] },
      { name: 'p95_latency_ms', type: 'INTEGER', constraints: ['NULL'] },
      { name: 'started_at', type: 'TIMESTAMPTZ', constraints: ['NULL'] },
      { name: 'completed_at', type: 'TIMESTAMPTZ', constraints: ['NULL'] },
    ],
  },
  {
    name: 'virtual_buyers',
    description: 'One row per concurrent shopper in a run (optional if you only keep the log).',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'run_id', type: 'UUID', constraints: ['FK test_runs'] },
      { name: 'buyer_index', type: 'INTEGER', constraints: ['NOT NULL'] },
      { name: 'idempotency_key', type: 'VARCHAR', constraints: ['NULL'] },
      { name: 'state', type: 'ENUM', constraints: ['NOT NULL'], notes: 'queued → done' },
      { name: '(run_id, buyer_index)', type: '-', constraints: ['UNIQUE'] },
    ],
  },
  {
    name: 'request_log',
    description: 'Append-only HTTP trace for the console and exports.',
    columns: [
      { name: 'id', type: 'UUID', constraints: ['PK'] },
      { name: 'run_id', type: 'UUID', constraints: ['FK test_runs'] },
      { name: 'buyer_index', type: 'INTEGER', constraints: ['NULL'] },
      { name: 'method', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'path', type: 'VARCHAR', constraints: ['NOT NULL'] },
      { name: 'status', type: 'INTEGER', constraints: ['NOT NULL'] },
      { name: 'latency_ms', type: 'INTEGER', constraints: ['NOT NULL'] },
      { name: 'note', type: 'VARCHAR', constraints: ['NULL'], notes: 'oversold, replay…' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraints: ['NOT NULL'] },
    ],
  },
];

export const FSL_SCHEMA_LINKS = [
  { from: 'tenant_api_keys', to: 'tenants' },
  { from: 'test_runs', to: 'tenants' },
  { from: 'test_runs', to: 'strategies' },
  { from: 'virtual_buyers', to: 'test_runs' },
  { from: 'request_log', to: 'test_runs' },
] as const;
