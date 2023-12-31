//** globals css imports */
import '../styles/globals.css'

//** Next imports */
import { Inter } from 'next/font/google'

//** shadcn components imports */
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from "@/components/provider/theme-provider"
import { ModalProvider } from '@/components/provider/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ModalProvider />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
