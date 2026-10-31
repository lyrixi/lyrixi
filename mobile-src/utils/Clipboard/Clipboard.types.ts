export interface ClipboardCopyParams {
  onSuccess?: (options: { status?: string; message?: string }) => void
  onError?: (options: { status?: string; message?: string }) => void
}
