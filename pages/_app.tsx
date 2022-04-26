import "../styles/globals.css"
import type { AppProps } from "next/app"
import { UserProvider } from "../services/firebase-provider"
import { QueryClient, QueryClientProvider } from "react-query"
import { ClientProvider } from "../services/client.provider"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ClientProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ClientProvider>
  )
}

export default MyApp
