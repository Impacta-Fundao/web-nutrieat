import { NextApiRequest, NextApiResponse } from "next";

export interface VendaItem {
  mes_nome: string;
  mes_numero: string;
  quantidade_vendas: number;
}

export interface VendaResponse {
  ano: number;
  meses: Array<VendaItem>;
}

export default async function handlerVendasYearMonth(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { year } = req.query;
    const resp = await fetch(
      `${process.env.ROTA_BASE_RENDER}/overview/vendas/${year}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );
    console.log("Status da api externa (GET): ", resp.status);

    if (!resp.ok) throw new Error(`Erro na requisição: ${resp.status}`);
    const data = await resp.json();
    return res.status(200).json(data.data);
  } catch (error) {
    const err = error as Error;
    return res
      .status(500)
      .json({ message: `Erro na requisição: ${err.message}` });
  }
}
