import './globals.css'

export const metadata = {
  title: '',
  description: 'PH\'s Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      {children}
      <head>
        <title>PH's Site</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
