import type { Metadata } from 'next';
import BlogIndex from '@/components/blog/BlogIndex';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Perspectives on AI in development and a brief introduction to Mary Skolos - full-stack software engineer.',
};

export default function BlogPage() {
  return <BlogIndex />;
}
