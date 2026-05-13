import './globals.css'
export const metadata = {
  title: 'Serenity — AI Wellness Companion',
  description: 'Calm, emotionally intelligent AI wellness companion powered by local open-source AI.',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="preconnect" href="https://fonts.googleapis.com" /><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" /></head>
      <body>{children}</body>
    </html>
  )
}
