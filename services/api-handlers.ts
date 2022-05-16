export const hashPassword = async (password: string) => {
  const response = await fetch("/api/hashpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  })
  const data = await response.json()
  return data.password
}

export const comparePassword = async (
  password: string,
  confirmPassword: string
) => {
  const response = await fetch("/api/comparepassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, confirmPassword }),
  })
  const data = await response.json()
  return data
}
