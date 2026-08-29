import type {Metadata} from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dr. Aranya Sen - Consultant Neurologist & Clinical Triage Portal',
  description:
    'DM Neurology, MD, MBBS. Specialized neurological triage, live OPD chamber status, red-flag emergency screening, and direct WhatsApp consult booking.',
  openGraph: {
    title: 'Dr. Aranya Sen - Consultant Neurologist & Clinical Triage Portal',
    description:
      'DM Neurology, MD, MBBS. Specialized neurological triage, live OPD chamber status, red-flag emergency screening, and direct WhatsApp consult booking.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Aranya Sen - Consultant Neurologist & Clinical Triage Portal',
    description:
      'DM Neurology, MD, MBBS. Specialized neurological triage, live OPD chamber status, red-flag emergency screening, and direct WhatsApp consult booking.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-[#F8FAFC] text-[#0B132B] font-sans antialiased min-h-screen selection:bg-[#0D9488]/20 selection:text-[#0B132B]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


