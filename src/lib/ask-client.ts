import { buildRetrievalAnswer } from "@/lib/retriever";
import type { AskResponse } from "@/types/content";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

export class ExternalApiError extends Error {
  constructor(public readonly status: number) {
    super(`External API request failed with status ${status}`);
    this.name = "ExternalApiError";
  }
}

export function hasExternalApi(): boolean {
  return API_BASE_URL.length > 0;
}

/**
 * GitHub Pages 没有服务端路由：默认直接在浏览器完成站内检索。
 * 如另有独立部署的问答服务，可通过 NEXT_PUBLIC_API_BASE_URL 接入。
 */
export async function askQuestion(question: string): Promise<AskResponse> {
  if (!API_BASE_URL) {
    return buildRetrievalAnswer(question);
  }

  const response = await fetch(`${API_BASE_URL}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new ExternalApiError(response.status);
  }

  return (await response.json()) as AskResponse;
}
