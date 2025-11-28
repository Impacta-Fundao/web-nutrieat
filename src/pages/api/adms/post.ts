import {
  FormsRegisterAdmin,
  FormsRegisterRaw,
} from "@/models/admin/types/admin-props-model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { nome, cpf, celular, email, senha }: FormsRegisterAdmin = req.body;
    const resp = await fetch(
      `${process.env.ROTA_BASE_RENDER || "http://localhost:9090"}/admin`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ nome, cpf, celular, senha, email }),
      }
    );
    const data: FormsRegisterRaw = await resp.json();
    if (!resp.ok) return res.status(400).json(data);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
}
