export interface SetupOption {
  id: string;
  label: string;
  emoji: string;
  popular?: boolean;
}

export const GROWING_OPTIONS: SetupOption[] = [
  { id: 'apples', label: 'Apples', emoji: '🍎', popular: true },
  { id: 'basil', label: 'Basil', emoji: '🌿', popular: true },
  { id: 'blueberries', label: 'Blueberries', emoji: '🫐', popular: true },
  { id: 'carrots', label: 'Carrots', emoji: '🥕', popular: true },
  { id: 'cherry-sapling', label: 'Cherry sapling', emoji: '🌱', popular: true },
  { id: 'tomatoes', label: 'Tomatoes', emoji: '🍅' },
  { id: 'kale', label: 'Kale', emoji: '🥬' },
  { id: 'meyer-lemons', label: 'Meyer lemons', emoji: '🍋' },
  { id: 'jalapenos', label: 'Jalapeños', emoji: '🌶️' },
  { id: 'sunflowers', label: 'Sunflowers', emoji: '🌻' },
  { id: 'concord-grapes', label: 'Concord grapes', emoji: '🍇' },
  { id: 'shiitake', label: 'Shiitake logs', emoji: '🍄' },
];

export const INTEREST_OPTIONS: SetupOption[] = [
  { id: 'cherry-tomatoes', label: 'Cherry tomatoes', emoji: '🍅', popular: true },
  { id: 'basil', label: 'Fresh basil', emoji: '🌿', popular: true },
  { id: 'backyard-eggs', label: 'Backyard eggs', emoji: '🥚', popular: true },
  { id: 'plant-trades', label: 'Plant trades', emoji: '🤝', popular: true },
  { id: 'local-honey', label: 'Local honey', emoji: '🍯' },
  { id: 'fruit-cuttings', label: 'Fruit cuttings', emoji: '✂️' },
  { id: 'peach-seedlings', label: 'Peach seedlings', emoji: '🍑' },
  { id: 'compost', label: 'Compost', emoji: '♻️' },
  { id: 'heirloom-seeds', label: 'Heirloom seeds', emoji: '🌱' },
  { id: 'lavender', label: 'Lavender bundles', emoji: '💜' },
];

export const INTEREST_COACHMARK_TARGETS = new Set([
  'cherry-tomatoes',
  'basil',
  'plant-trades',
]);

export function filterSetupOptions(options: SetupOption[], query: string): SetupOption[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return options.filter((option) => option.popular);
  }
  return options.filter((option) => option.label.toLowerCase().includes(trimmed));
}
