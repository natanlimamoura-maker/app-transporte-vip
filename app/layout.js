export const metadata = {
  title: 'App Transporte VIP',
  description: 'Sistema de gestão para transporte escolar',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="theme-color" content="#FBBF24" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `
        }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
