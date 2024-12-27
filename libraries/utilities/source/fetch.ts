/**
 * Enhanced fetch function that includes credentials by default.
 * @param uri - The URL to fetch.
 * @param options - The fetch options.
 * @returns The fetch response.
 */
export async function fetch(uri: string, options: RequestInit = {}): Promise<Response> {
  return window.fetch(uri, { credentials: 'include', ...options })
}
