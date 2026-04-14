import { NextApiRequest, NextApiResponse } from "next";

export interface ProductsData {
    ano: number
    meses: ProductsItem[]
}

export interface ProductsItem {
    mes_numero: string;
    mes_nome: string;
    produto_id: number;
    nome_produto: string;
    total_vendido: number;
}

export default async function handlerVendasQuantity(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { year } = req.query;
    const resp = await fetch(
      `${process.env.ROTA_BASE_RENDER}/overview/produtos/${year}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );
    console.log("Status da API externa (GET): ", resp.status);

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
