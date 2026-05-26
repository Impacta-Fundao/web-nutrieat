import type { NextApiRequest, NextApiResponse } from "next";

import { clearAuthCookies } from "@/lib/auth-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não suportado" });
  }

  clearAuthCookies(res);
  return res.status(200).json({ message: "Logout realizado com sucesso" });
}