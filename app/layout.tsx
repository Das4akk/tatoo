import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ATELIER BOTANICA — Премиальная студия татуировки',
  description:
    'Камерная студия художественной татуировки в эстетике скандинавского минимализма. Тонкие линии, авторская ботаника, орнаментал и индивидуальный подход к каждому эскизу.',
  openGraph: {
    title: 'ATELIER BOTANICA — Премиальная студия татуировки',
    description:
      'Камерная студия художественной татуировки в эстетике скандинавского минимализма. Тонкие линии, авторская ботаника, орнаментал и бережная работа с кожей.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATELIER BOTANICA — Премиальная студия татуировки',
    description:
      'Камерная студия художественной татуировки в эстетике скандинавского минимализма.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="bg-[#FBFBFA] text-[#1C201D] selection:bg-[#DCE7E1] selection:text-[#1C201D] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
