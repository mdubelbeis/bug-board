export async function getCurrentUser(token: string) {
  const authResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const authData = await authResponse.json();

  if (!authResponse.ok) {
    throw new Error(authData.message || 'Failed to fetch projects');
  }

  return authData;
}
