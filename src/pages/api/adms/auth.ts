import {
  FormsDataLogin,
  FormsRegisterAdmin,
  FormsRegisterRaw,
} from "@/models/admin/types/admin-props-model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cpf, senha }: FormsDataLogin = req.body;
    const resp = await fetch(
      `${process.env.ROTA_BASE_RENDER || "http://localhost:9090"}/admin/login`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ cpf, senha }),
      }
    );
    const data: FormsDataLogin = await resp.json();
    if (!resp.ok) return res.status(400).json(data);
    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json(err.message);
  }
}
