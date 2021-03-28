export async function getNewToken (): Promise<string> {
  const url = `http://movie-database/auth/get-token`
  const response = await fetch(url,
    {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  const token = await response.json()
  return String(token.jwt)
}
