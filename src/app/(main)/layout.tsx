import './global.css'

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
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" />
        <script src="/dark.js"></script>
      </head>
      <body className="w-screen h-screen flex justify-center dark:bg-stone-900 dark:text-stone-100">
        <div className="w-full lg:w-[1024px] px-2 lg:px-0" id="app">
          {children}
        </div>
      </body>
    </html>
  )
}
