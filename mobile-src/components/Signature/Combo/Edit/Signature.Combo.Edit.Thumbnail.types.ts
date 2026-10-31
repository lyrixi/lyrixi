export interface SignatureComboEditThumbnailProps {
  src?: string
  onPreview?: (src: string) => Promise<boolean | string | void>
}
