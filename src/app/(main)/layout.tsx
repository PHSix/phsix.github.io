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
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className="w-screen h-screen flex justify-center">
        <div className="w-full lg:w-[1024px] px-2 lg:px-0">
          {children}
        </div>
      </body>
    </html>
  )
}
