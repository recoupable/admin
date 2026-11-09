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
    const body = await response.json().catch(() => ({}));
    const message = errorFields
      .map((field) => body[field])
      .find((value) => value !== null && value !== undefined);
    throw new Error(message ?? `HTTP ${response.status}`);
  }

  return response.json();
}
