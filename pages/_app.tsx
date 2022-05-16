import "../styles/globals.css"
import type { AppProps } from "next/app"
import { UserProvider } from "../providers/firebase-provider"
import { QueryClient, QueryClientProvider } from "react-query"
import { ClientProvider } from "../providers/client.provider"
import { UserStorageProvider } from "../providers/user.provider"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ClientProvider>
      <QueryClientProvider client={queryClient}>
        <UserStorageProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </UserStorageProvider>
      </QueryClientProvider>
    </ClientProvider>
  )
}

export default MyApp
