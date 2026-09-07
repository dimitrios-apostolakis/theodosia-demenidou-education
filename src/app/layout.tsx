import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://theodosia-demenidou-education.vercel.app'),
  title: "Μαθαίνουμε Μαζί | Θεοδοσία Δεμενίδου - Δημοτικό Σχολείο",
  description: "Εκπαιδευτική πλατφόρμα πρωτοβάθμιας εκπαίδευσης από την εκπαιδευτικό Θεοδοσία Δεμενίδου. Δωρεάν φύλλα εργασίας, PDF, ασκήσεις και έξυπνος βοηθός μελέτης για παιδιά Δημοτικού.",
  keywords: [
    "Θεοδοσία Δεμενίδου",
    "Δημοτικό Σχολείο",
    "Φύλλα εργασίας",
    "Ασκήσεις Δημοτικού",
    "Πρωτοβάθμια Εκπαίδευση",
    "Ελληνικό Σχολείο",
    "Προπαίδεια",
    "Γραμματική",
    "Μαθηματικά",
    "Βοηθός Μελέτης",
  ],
  authors: [{ name: "Θεοδοσία Δεμενίδου" }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: "Μαθαίνουμε Μαζί - Θεοδοσία Δεμενίδου",
    description: "Δωρεάν φύλλα εργασίας, PDF και εκπαιδευτικό υλικό για το Δημοτικό Σχολείο.",
    locale: "el_GR",
    type: "website",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Μαθαίνουμε Μαζί - Θεοδοσία Δεμενίδου | Δημοτικό Σχολείο',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Μαθαίνουμε Μαζί - Θεοδοσία Δεμενίδου",
    description: "Δωρεάν φύλλα εργασίας, PDF και εκπαιδευτικό υλικό για το Δημοτικό Σχολείο.",
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className="overflow-x-hidden max-w-full">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body className="antialiased selection:bg-indigo-200 selection:text-slate-900 overflow-x-hidden max-w-full w-full">
        {children}
      </body>
    </html>
  );
}
