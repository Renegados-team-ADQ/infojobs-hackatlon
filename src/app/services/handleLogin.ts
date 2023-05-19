export function handleLogin(): void {
  const clientId = process.env.NEXT_PUBLIC_INFOJOBS_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_APP_REDIRECT_URI;
  const scope = "TU_LISTA_DE_NOMBRES_DE_SCOPE_SEPARADOS_POR_COMAS";

  const authUrl = `https://www.infojobs.net/api/oauth/user-authorize/index.xhtml?scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

  // Redirige al usuario a la página de autorización de InfoJobs
  window.location.href = authUrl;
}
