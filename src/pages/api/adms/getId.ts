import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const resp = await fetch(
      `${process.env.ROTA_BASE_RENDER || "http://localhost:9090"}/admin/${id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Status da API externa: ", resp.status);
    const data = await resp.json();
    if (!resp.ok)
      return res.status(resp.status).json(data.message || resp.status);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json(err.message);
  }
}
