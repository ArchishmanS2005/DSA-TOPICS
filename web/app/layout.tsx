import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { getTopics } from '@/lib/dsa'
import { Sidebar } from '@/components/sidebar/sidebar'
import { SpotlightSearch } from '@/components/search/spotlight-search'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'DSA Visualizer | Data Structures & Algorithms in C',
    description: 'Interactive visualization of Data Structures and Algorithms implemented in C. Learn through code and visual representations.',
    keywords: ['DSA', 'Data Structures', 'Algorithms', 'C Programming', 'Visualization'],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const topics = getTopics()

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SpotlightSearch topics={topics}>
                        <div className="flex h-screen overflow-hidden">
                            <Sidebar topics={topics} />
                            <main className="flex-1 overflow-auto">
                                {children}
                            </main>
                        </div>
                    </SpotlightSearch>
                </ThemeProvider>
            </body>
        </html>
    )
}
