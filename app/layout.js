export const metadata = {
  title: 'App Transporte VIP',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="manifest" href="/manifest.json" />
        
        {/* Tags essenciais para o iPhone reconhecer como App e não página */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Transporte VIP" />
        <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" />
        
        {/* Cor da barra de status no Android */}
        <meta name="theme-color" content="#FBBF24" />

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
      <body>{children}</body>
    </html>
  )
}
