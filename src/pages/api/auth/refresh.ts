import type { NextApiRequest, NextApiResponse } from "next";

import { AuthApiErrorResponse, AuthApiSuccessResponse } from "@/models/admin/types/admin-auth-model";

import {
  getRefreshToken,
  readBackendJson,
  refreshSession,
  setAuthCookies,
} from "@/lib/auth-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não suportado" });
  }

  try {
    const refreshToken = getRefreshToken(req) ?? req.body?.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token não encontrado" });
    }

    const { response, payload } = await refreshSession(refreshToken);

    if (!response.ok || !payload || !("data" in payload)) {
      return res.status(response.status).json(
        (payload as AuthApiErrorResponse | null) ?? {
          message: "Falha ao renovar sessão",
        },
      );
    }

    setAuthCookies(res, payload.data);

    return res.status(200).json({
      message: payload.message,
      data: {
        admin: payload.data.admin,
        token_type: payload.data.token_type,
        access_token_expires_in: payload.data.access_token_expires_in,
        refresh_token_expires_in: payload.data.refresh_token_expires_in,
      },
    });
  } catch (error) {
    const err = error as Error;
    return res
      .status(500)
      .json({ message: `Erro ao renovar sessão: ${err.message}` });
  }
}