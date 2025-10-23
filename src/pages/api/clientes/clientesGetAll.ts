import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerClients(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const resp = await fetch(`${process.env.ROTA_BASE_RENDER}/cliente`, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Status da API externa (GET): ", resp.status);

      if (!resp.ok) throw new Error(`Erro na requisição: ${resp.status}`);

      const data = await resp.json();
      return res.status(200).json({ data });
    }
  } catch (err) {
    const error = err as Error;
    console.error("Erro: ", err);
    return res
      .status(500)
      .json({ message: `Erro ao fazer a requisição: ${error.message}` });
  }
}
