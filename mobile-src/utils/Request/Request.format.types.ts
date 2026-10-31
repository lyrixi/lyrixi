export type RequestError = {
  config?: unknown
  response?: Record<string, unknown>
  [key: string]: unknown
}

export type RequestResponse = { config?: unknown; data?: unknown; [key: string]: unknown }
