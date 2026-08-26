export interface Options {
  allowDangerousHtml?: boolean | null
  clobberPrefix?: string | null
  footnoteBackContent?: unknown
  footnoteBackLabel?: unknown
  footnoteLabel?: string | null
  footnoteLabelProperties?: unknown
  footnoteLabelTagName?: string | null
  handlers?: unknown
  passThrough?: string[] | null
  unknownHandler?: unknown
  file?: unknown
}

export const defaultHandlers: Record<string, unknown>
export function defaultFootnoteBackContent(...args: unknown[]): unknown
export function defaultFootnoteBackLabel(...args: unknown[]): unknown
export function toHast(tree: unknown, options?: Options | null): unknown
export default toHast
