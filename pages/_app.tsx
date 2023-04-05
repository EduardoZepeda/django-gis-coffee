import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/Layout'
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>)
}
