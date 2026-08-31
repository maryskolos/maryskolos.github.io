export type PlantProfile = {
  id: string;
  name: string;
  neighborhood: string;
  distance: string;
  headline: string;
  description: string;
  offerings: string[];
  seeking: string[];
  tags: ('free' | 'trade' | 'low-cost' | 'organic' | 'for-sale')[];
  plants: { name: string; emoji: string }[];
  imageUrl: string;
};

export const mockProfiles: PlantProfile[] = [
  {
    id: '1',
    name: 'Pat',
    neighborhood: 'Green Lake',
    distance: '0.7 mi',
    headline: 'Kitchen herbs to share! Too many to use',
    description:
      'My herb bed exploded this summer - happy to share bundles of fresh basil, mint, rosemary, and thyme with neighbors.',
    offerings: ['Basil bundles', 'Mint cuttings', 'Rosemary sprigs', 'Thyme'],
    seeking: ['Tomato starts', 'Compost tips'],
    tags: ['free', 'trade'],
    plants: [
      { name: 'Basil', emoji: '🌿' },
      { name: 'Mint', emoji: '🍃' },
      { name: 'Rosemary', emoji: '🌱' },
    ],
    imageUrl: '/images/profiles/tree-1.png',
  },
  {
    id: '2',
    name: 'Jordan',
    neighborhood: 'Ballard',
    distance: '1.2 mi',
    headline: 'Organic heirloom tomatoes - for sale',
    description:
      'Vine-ripened organic tomatoes from my backyard plot. Roma, cherry, and San Marzano available by the pound.',
    offerings: ['Roma tomatoes', 'Cherry tomatoes', 'San Marzano'],
    seeking: ['Herb cuttings', 'Seed swaps'],
    tags: ['organic', 'for-sale'],
    plants: [
      { name: 'Roma', emoji: '🍅' },
      { name: 'Cherry', emoji: '🍒' },
    ],
    imageUrl: '/images/profiles/tree-2.png',
  },
  {
    id: '3',
    name: 'Riley',
    neighborhood: 'Capitol Hill',
    distance: '0.8 mi',
    headline: 'Apple tree cuttings from winter prune',
    description:
      'Just finished pruning my backyard apple tree - sharing healthy scion wood and cuttings from the trim. Great for grafting or rooting.',
    offerings: ['Apple scion wood', 'Pruning cuttings', 'Grafting tips'],
    seeking: ['Rootstock advice', 'Pollinator plants'],
    tags: ['free'],
    plants: [{ name: 'Apple Tree', emoji: '🍎' }],
    imageUrl: '/images/profiles/tree-3.png',
  },
];
