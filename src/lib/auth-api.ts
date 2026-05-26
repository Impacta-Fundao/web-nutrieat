import type { NextApiRequest, NextApiResponse } from "next";

import { AuthApiSuccessResponse, AuthPayload } from "@/models/admin/types/admin-auth-model";

const ACCESS_COOKIE_NAME = "nutrieat_access_token";
const REFRESH_COOKIE_NAME = "nutrieat_refresh_token";

const isProduction = process.env.NODE_ENV === "production";

function buildCookie(name: string, value: string, maxAge: number) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];

  if (isProduction) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

function parseCookies(cookieHeader?: string) {
  if (!cookieHeader) {
    return {} as Record<string, string>;
  }

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, entry) => {
    const [rawKey, ...rawValue] = entry.trim().split("=");
    if (!rawKey) {
      return acc;
    }

    acc[rawKey] = decodeURIComponent(rawValue.join("="));
    return acc;
  }, {});
}

export function setAuthCookies(res: NextApiResponse, authData: AuthPayload) {
  res.setHeader("Set-Cookie", [
    buildCookie(
      ACCESS_COOKIE_NAME,
      authData.access_token,
      authData.access_token_expires_in,
    ),
    buildCookie(
      REFRESH_COOKIE_NAME,
      authData.refresh_token,
      authData.refresh_token_expires_in,
    ),
  ]);
}

export function clearAuthCookies(res: NextApiResponse) {
  res.setHeader("Set-Cookie", [
    buildCookie(ACCESS_COOKIE_NAME, "", 0),
    buildCookie(REFRESH_COOKIE_NAME, "", 0),
  ]);
}

export function getAccessToken(req: NextApiRequest) {
  return parseCookies(req.headers.cookie)[ACCESS_COOKIE_NAME];
}

export function getRefreshToken(req: NextApiRequest) {
  return parseCookies(req.headers.cookie)[REFRESH_COOKIE_NAME];
}

export async function requestBackendAuth(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${process.env.ROTA_BASE_RENDER}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

export async function readBackendJson<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
}

export async function refreshSession(refreshToken: string) {
  const response = await requestBackendAuth("/admin/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const payload = await readBackendJson<AuthApiSuccessResponse>(response);
  return { response, payload };
}

export async function getAdminProfile(accessToken: string) {
  return requestBackendAuth("/admin/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}