# @itslil/mdast-util-to-hast

mdast-util-to-hast reimplemented in LilScript. This is **not** the official [`mdast-util-to-hast`](https://github.com/syntax-tree/mdast-util-to-hast) package.

**Site:** [yeargun.github.io/mdast-util-to-hastlil/](https://yeargun.github.io/mdast-util-to-hastlil/)

```sh
npm install @itslil/mdast-util-to-hast
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. `extern class` keys may mangle. ESM export names stay so the lane is testable. |

You publish the library lane. The closed artifact is `dist/to-hast.closed.js`.

The LilScript compiler lives next door at `../lilscript`.
