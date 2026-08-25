export interface Options {
  allowDangerousHtml?: boolean | null
}

export function toHast(tree: unknown, options?: Options | null): unknown
export default toHast
