export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ai-and-development',
    title: 'On AI in Software Development',
    excerpt:
      'AI is a powerful tool that will alter many industries, software included. It should not be a crutch, nor ignored.',
    tags: ['AI', 'Engineering'],
    sections: [
      {
        paragraphs: [
          'AI is a powerful tool that is going to slowly but surely alter the shape of many industries, software included. AI should not be a crutch, nor ignored. It should be used, understood, discussed, and ultimately integrated with developers - but not replace them.',
        ],
      },
      {
        paragraphs: [
          'Code generation and reviews may be AI and human-guided, but business context and human understanding of given business problems are even more crucial than they were before.',
        ],
      },
    ],
  },
  {
    slug: 'introduction',
    title: 'Introduction',
    excerpt:
      "I'm Mary - I've been building websites in Laravel and more for a long time. I could code before AI, and now I get to code faster with it.",
    tags: ['About'],
    sections: [
      {
        paragraphs: [
          'Hello,',
        ],
      },
      {
        paragraphs: [
          "I'm Mary, and I've been working on websites in Laravel and more for a long time now. I could code before AI, and now I get to code faster with it.",
        ],
      },
      {
        paragraphs: [
          'I care about aesthetics, client relationships, the products I develop for, and the codebase. My understanding of problems has to come from the real source - why it matters and who it matters to.',
        ],
      },
      {
        paragraphs: [
          'In my free time I study philosophy, AI, and do a lot of gaming (video, tabletop, and board games). Ask me about my competitive MtG travels!',
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
