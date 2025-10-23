import { ProdutoFormData } from "@/models/produtos/types/produtos-props-model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`Método recebido: ${req.method}`);

  if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (id) {
        if (Array.isArray(id)) {
          return res.status(400).json({ message: "ID deve ser único" });
        }

        const produtoId = parseInt(id);
        if (isNaN(produtoId)) {
          return res
            .status(400)
            .json({ message: "ID deve ser um número válido" });
        }

        const resp = await fetch(`https://ms-nutrieat.onrender.com/produto/${produtoId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!resp.ok) {
          if (resp.status === 404) {
            return res.status(404).json({ message: "Produto não encontrado" });
          }
          throw new Error(`Erro: ${resp.status} - ${resp.statusText}`);
        }

        const data = await resp.json();
        return res.status(200).json({
          message: "Produto encontrado com sucesso",
          data,
        });
      }

      const resp = await fetch("https://ms-nutrieat.onrender.com/produto", {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Status da API externa (GET):", resp.status);

      if (!resp.ok) {
        throw new Error(
          `Erro na requisição: ${resp.status} | ${resp.statusText}`
        );
      }

      const data = await resp.json();
      return res.status(200).json({ data });
    } catch (error) {
      const err = error as Error;
      console.error("Erro no GET:", err);
      return res.status(500).json({
        message: `Erro ao buscar os dados - ${err.message}`,
      });
    }
  }

  if (req.method === "POST") {
    try {
      console.log("Dados recebidos no POST:", req.body);

      const { nome, preco } = req.body;

      if (!nome || !preco) {
        return res.status(400).json({
          message: "Nome e preço são obrigatórios",
        });
      }

      const resp = await fetch("https://ms-nutrieat.onrender.com/produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          preco: parseFloat(preco),
        }),
      });

      console.log("Status da API externa (POST):", resp.status);

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("Erro da API externa:", errorText);
        throw new Error(`Erro: ${resp.status} - ${resp.statusText}`);
      }

      const data = await resp.json();
      return res.status(201).json({
        message: "Produto criado com sucesso",
        data,
      });
    } catch (error) {
      const err = error as Error;
      console.error("Erro no POST:", err);
      return res.status(500).json({
        message: `Erro na requisição: ${err.message}`,
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const { nome, preco } = req.body;
      const { id } = req.query;

      if (!nome || !preco || (nome && preco === undefined))
        return res.status(400).json({
          message:
            "Pelo menos um campo (nome ou preço) deve ser fornecido para atualização",
        });

      const updateData: ProdutoFormData = {
        nome,
        preco,
      };
      if (nome) updateData.nome = nome;
      if (preco !== undefined) updateData.preco = parseFloat(preco);
      const resp = await fetch(`https://ms-nutrieat.onrender.com/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      console.log("Status da Api externa (PUT): ", resp.status);

      if (!resp.ok) {
        if (resp.status === 404) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }

        const errorText = await resp.text();
        console.error("Erro da API externa:", errorText);
        throw new Error(`Erro: ${resp.status} - ${resp.statusText}`);
      }

      const data = await resp.json();
      return res.status(200).json({
        message: "Produto atualizado com sucesso",
        data,
      });
    } catch (error) {
      const err = error as Error;
      console.error("Erro no PUT:", err);
      return res.status(500).json({
        message: `Erro na atualização: ${err.message}`,
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "Error" });

      const resp = await fetch(`https://ms-nutrieat.onrender.com/"produto/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("Erro da API externa:", errorText);
        throw new Error(`Erro: ${resp.status} - ${resp.statusText}`);
      }

      const data = await resp.json();
      return res.status(200).json({ message: data });
    } catch (error) {
      const err = error as Error;
      console.error("Erro no PUT:", err);
      return res.status(500).json({
        message: `Erro na atualização: ${err.message}`,
      });
    }
  }

  return res.status(405).json({ message: "Método não suportado" });
}
