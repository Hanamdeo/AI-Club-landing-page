import './globals.css';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

export const metadata = {
  title: 'PHOENIX AI LAB // Official College AI Club',
  description: 'The premier artificial intelligence research lab and collegiate community. High-agency engineering, autonomous agents, and deep learning.',
  keywords: ['AI Club', 'Artificial Intelligence', 'College AI Club', 'Machine Learning', 'Autonomous Agents', 'Deep Learning', 'Three.js'],
  authors: [{ name: 'Phoenix AI Lab Engineering Core' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#05070B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                background-color: #05070B !important;
                color: #F5F7FA !important;
                font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 0;
              }
              a { color: inherit; text-decoration: none; }
            `,
          }}
        />
      </head>
      <body className="bg-background text-primary antialiased overflow-x-hidden selection:bg-phoenix-blue selection:text-white min-h-screen flex flex-col">
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
