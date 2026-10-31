export type EditDemoQueryDataResult = {
  formData?: unknown
  baseData?: unknown
} | null

export type EditDemoSaveResult = {
  code?: string
  message?: string
}

export type EditDemoAttachListItem = {
  name: string
  fileUrl: string
  status?: string
}

export type EditDemoUntypedFileChangePayload = {
  fileName: string
  fileSize: number
  fileURL: string
  fileData: unknown
}

export type EditDemoResultView = {
  message?: string
  status?: string
  title?: string
} | null
