import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
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
  openGraph: {
    title: "Μαθαίνουμε Μαζί - Θεοδοσία Δεμενίδου",
    description: "Δωρεάν φύλλα εργασίας, PDF και εκπαιδευτικό υλικό για το Δημοτικό Σχολείο.",
    locale: "el_GR",
    type: "website",
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>" />
      </head>
      <body className="antialiased selection:bg-indigo-200 selection:text-slate-900 overflow-x-hidden max-w-full w-full">
        {children}
      </body>
    </html>
  );
}
