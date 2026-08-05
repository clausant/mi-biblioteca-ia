import './globals.css';

export const metadata = {
  title: 'Mi Biblioteca IA',
  description: 'Biblioteca personal enriquecida con inteligencia artificial'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
