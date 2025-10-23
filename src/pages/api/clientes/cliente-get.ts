import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const resp = await fetch(`${process.env.ROTA_BASE_RENDER}/cliente/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Status da API externa (GET): ", resp.status);

    if (!resp.ok) throw new Error(`Erro na requisição: ${resp.status}`);

    const data = await resp.json();
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res
      .status(500)
      .json({ message: `Erro na requisição: ${err.message}` });
  }
}
