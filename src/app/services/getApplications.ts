export default async function handler(req, res) {
  const accessToken = req.session.accessToken; // Aquí es donde recuperas el token de acceso de la sesión del usuario

  const response = await fetch("https://api.infojobs.net/api/1/application", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  res.json(data);
}
