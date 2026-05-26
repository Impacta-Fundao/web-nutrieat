import type { NextApiRequest, NextApiResponse } from "next";

import {
  AuthApiErrorResponse,
  AuthApiSuccessResponse,
} from "@/models/admin/types/admin-auth-model";

import {
  readBackendJson,
  requestBackendAuth,
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
    const response = await requestBackendAuth("/admin/register", {
      method: "POST",
      body: JSON.stringify(req.body),
    });

    const payload = await readBackendJson<
      AuthApiSuccessResponse | AuthApiErrorResponse
    >(response);

    if (!response.ok || !payload || !("data" in payload)) {
      return res.status(response.status).json(
        payload ?? { message: "Falha ao cadastrar admin" },
      );
    }

    setAuthCookies(res, payload.data);

    return res.status(201).json({
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
      .json({ message: `Erro no cadastro: ${err.message}` });
  }
}