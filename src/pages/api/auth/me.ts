import type { NextApiRequest, NextApiResponse } from "next";

import {
  AuthApiErrorResponse,
  AuthApiSuccessResponse,
} from "@/models/admin/types/admin-auth-model";

import {
  getAccessToken,
  getAdminProfile,
  getRefreshToken,
  readBackendJson,
  refreshSession,
  setAuthCookies,
} from "@/lib/auth-api";

interface AdminProfileResponse {
  data: {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    celular: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não suportado" });
  }

  try {
    const accessToken = getAccessToken(req);
    const refreshToken = getRefreshToken(req);

    if (accessToken) {
      const profileResponse = await getAdminProfile(accessToken);

      if (profileResponse.ok) {
        const payload = await readBackendJson<AdminProfileResponse>(profileResponse);
        return res.status(200).json({ data: payload?.data ?? null });
      }
    }

    if (!refreshToken) {
      return res.status(401).json({ message: "Sessão não encontrada" });
    }

    const { response, payload } = await refreshSession(refreshToken);

    if (!response.ok || !payload || !("data" in payload)) {
      return res.status(response.status).json(
        (payload as AuthApiErrorResponse | null) ?? {
          message: "Sessão expirada",
        },
      );
    }

    setAuthCookies(res, payload.data);

    return res.status(200).json({
      data: payload.data.admin,
      message: payload.message,
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: `Erro ao carregar sessão: ${err.message}`,
    });
  }
}