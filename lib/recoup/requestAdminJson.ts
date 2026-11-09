/** Authenticated JSON transport; resource adapters own paths and response shapes. */
export async function requestAdminJson<T>(
  url: string | URL,
  accessToken: string,
  errorFields: readonly string[] = ["error", "message"],
): Promise<T> {
  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const errorBody =
      typeof body === "object" && body !== null && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : undefined;
    const message = errorFields
      .map((field) => errorBody?.[field])
      .find((value) => value !== null && value !== undefined);
    throw new Error(String(message ?? `HTTP ${response.status}`));
  }

  return response.json();
}
