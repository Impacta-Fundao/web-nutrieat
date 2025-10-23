import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "Error, id not found" });
    const resp = await fetch(`${process.env.ROTA_BASE_RENDER}/cliente/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      const errorTxt = await resp.text();
      console.error("Erro da API externa: ", errorTxt);
      throw new Error(`Erro: ${resp.status} - ${resp.statusText}`);
    }
    const data = await resp.json();
    return res.status(200).json({ message: data });
  } catch (error) {
    const err = error as Error;
    console.error("Erro delete: ", err);
    return res
      .status(500)
      .json({ message: `Erro na atualização: ${err.message}` });
  }
}
