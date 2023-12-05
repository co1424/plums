import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Topic',
};

export default function NewTopicLayout({children,}: {
children: React.ReactNode;
}) {
  return (
    children
    );
}