import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerProductGet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const resp = await fetch("http://localhost:9090/produto", {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Status da API externa:", resp.status);
    if (!resp.ok)
      throw new Error(
        `Erro na requisição: ${resp.status} | ${resp.statusText}`
      );

    const data = await resp.json();
    res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: `Erro ao buscar os dados - ${err.message} | ${err.cause}`,
    });
  }
}

export async function handlerProductPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Método não suportado" });

  try {
    const { nome, preco } = req.body;
    if (!nome || !preco) {
      return res.status(400).json({
        message: "Nome e preço são obrigatórios",
      });
    }
    const resp = await fetch("http://localhost:9090/produto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        preco: parseFloat(preco),
      }),
    });

    if (!resp.ok) throw new Error(`Erro: ${resp.status} - ${resp.statusText}`);

    const data = await resp.json();
    return res.status(200).json({
      message: "Produto criado com sucesso",
      data,
    });
  } catch (error) {
    const err = error as Error;
    return res
      .status(500)
      .json({ message: `Erro na requisição: ${err.message} | ${err.cause}` });
  }
}

export async function handlerProductGetById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const { id } = req.query;
    if (!id || Array.isArray(id))
      return res.status(400).json({ message: "Id é obrigatório" });
    const produtoId = parseInt(id);
    if (isNaN(produtoId))
      return res.status(400).json({ message: "Id deve ser um numero válido" });

    const resp = await fetch(`http://localhost:9090/produto/${produtoId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      return (
        resp.status === 404 &&
        res.status(404).json({ message: "Produto não encontrado" })
      );
    }

    const data = await resp.json();
    return res
      .status(200)
      .json({ message: "Requisição realizada com sucesso", data });
  } catch (error) {
    const err = error as Error;
    return res
      .status(200)
      .json({ message: `Erro na requisição: ${err.message} | ${err.cause}` });
  }
}
