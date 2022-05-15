import { createClient, Provider } from "urql"

const client = createClient({
  url: "https://roszti-suite.hasura.app/v1/graphql",
  fetchOptions: {
    headers: {
      "x-hasura-admin-secret":
        "HSVOxcCJkzF6pGOMyKjrzhHex6l8Yi2UnyM206bIvISUR7BbFC1L0vPzDPsJvvnK",
    },
  },
})

interface Props {
  children: React.ReactNode
}

export const ClientProvider: React.FC<Props> = ({ children }) => (
  <Provider value={client}>{children}</Provider>
)
