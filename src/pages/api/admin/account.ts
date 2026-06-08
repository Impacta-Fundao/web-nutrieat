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
  requestBackendAuth,
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

function parseAdminId(value: string | string[] | undefined): number | null {
  if (!value || Array.isArray(value)) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

async function ensureAccessToken(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = getAccessToken(req);
  if (accessToken) {
    return accessToken;
  }

  const refreshToken = getRefreshToken(req);
  if (!refreshToken) {
    return null;
  }

  const { response, payload } = await refreshSession(refreshToken);

  if (!response.ok || !payload || !("data" in payload)) {
    return null;
  }

  setAuthCookies(res, payload.data);
  return payload.data.access_token;
}

async function getCurrentAdminId(accessToken: string) {
  const profileResponse = await getAdminProfile(accessToken);
  if (!profileResponse.ok) {
    return null;
  }

  const payload = await readBackendJson<AdminProfileResponse>(profileResponse);
  return payload?.data?.id ?? null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Método não suportado" });
  }

  try {
    const accessToken = await ensureAccessToken(req, res);

    if (!accessToken) {
      return res.status(401).json({ message: "Sessão não encontrada" });
    }

    let adminId = parseAdminId(req.query.id);
    if (!adminId) {
      adminId = await getCurrentAdminId(accessToken);
    }

    if (!adminId) {
      return res.status(400).json({ message: "ID do admin inválido" });
    }

    const response = await requestBackendAuth(`/admin/account/${adminId}`, {
      method: req.method,
      body: req.method === "PATCH" ? JSON.stringify(req.body) : undefined,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const payload = await readBackendJson<
      AuthApiErrorResponse | AuthApiSuccessResponse | Record<string, unknown>
    >(response);

    return res.status(response.status).json(
      payload ?? {
        message:
          req.method === "GET"
            ? "Conta carregada sem conteúdo"
            : "Conta atualizada sem conteúdo",
      },
    );
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: `Erro ao processar conta do admin: ${err.message}`,
    });
  }
}
