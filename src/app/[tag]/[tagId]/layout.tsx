import type { Metadata } from 'next';
import Header from '../../components/Header'

export const metadata: Metadata = {
  title: 'Topic',
};

export default function TopicLayout({children,}: {
children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
    );
}