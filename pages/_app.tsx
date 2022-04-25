import "../styles/globals.css"
import type { AppProps } from "next/app"
import { UserProvider } from "../services/firebase-provider"
import { QueryClient, QueryClientProvider } from "react-query"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </QueryClientProvider>
  )
}

export default MyApp
