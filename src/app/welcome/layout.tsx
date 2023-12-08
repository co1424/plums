import type { Metadata } from 'next';
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'Welcome',
};

export default function WelcomeLayout({children,}: {
children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
    );
}