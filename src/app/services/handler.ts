// pages/api/exchangeCode.js
export default async function handler(req, res): Promise<void> {
  const { code } = req.body;

  const clientId = process.env.INFOJOBS_CLIENT_ID;
  const clientSecret = process.env.INFOJOBS_CLIENT_SECRET;
  const redirectUri = process.env.APP_REDIRECT_URI;

  const response = await fetch("https://www.infojobs.net/oauth/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  // Aquí puedes guardar el token de acceso y el token de actualización en la sesión del usuario

  res.json({ status: "success" });
}
