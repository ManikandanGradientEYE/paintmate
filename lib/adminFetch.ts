export async function adminFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) {
      return { ok: false, error: body?.error ?? `Request failed (${response.status})` };
    }
    return { ok: true, data: body as T };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
