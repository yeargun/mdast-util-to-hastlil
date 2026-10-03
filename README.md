# @itslil/mdast-util-to-hast

Official [`mdast-util-to-hast@13.2.1`](https://github.com/syntax-tree/mdast-util-to-hast) algorithms rewritten in LilScript. Official test suite 142/142. Not affiliated with upstream.

**Site:** [yeargun.github.io/mdast-util-to-hastlil/](https://yeargun.github.io/mdast-util-to-hastlil/)

```sh
npm install @itslil/mdast-util-to-hast
```

The runtime is bundled, so `src/convert.lil` groups the upstream handlers, state, and footer for whole-program optimization. The declaration file likewise merges upstream's root and public `lib` types into one artifact while retaining the exact public API.

## Comparison with the original

See [COMPARISON.md](COMPARISON.md) for current raw-, gzip- and Brotli-objective builds, minified upstream comparisons, build times and validation.

## Delivered files

Every file the package delivers is the compiler's own output. No minifier runs after the compiler.

| File | Loaded by | Written by | Brotli-11 |
| --- | --- | --- | ---: |
| `dist/to-hast.esm.js` | `import` | compiler + license banner | 5,464 |
| `dist/to-hast.cjs` | `require` | compiler + license banner, `module.exports` object in place of the export clause | 5,478 |
| `dist/to-hast.umd.js` | browser script (unpkg, jsdelivr) | compiler + license banner, one function scope and the global `toHast` in place of the export clause | 5,442 |
| `dist/to-hast.closed.js` | `./closed` | compiler (diagnostic lane) | 6,945 |

Until the 2026-09-24 release the CommonJS and browser files were esbuild reprints of the ESM.

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | the same source at a lower effort level with no candidate search. This compiler renames no properties, so `extern class` keys keep their names in both lanes. ESM export names stay so the lane is testable. |

You publish the library lane. `dist/to-hast.closed.js` is diagnostic only.

[Download the checked repository package](https://yeargun.github.io/mdast-util-to-hastlil/downloads/package.tgz) · [Package files, hashes and validation](https://yeargun.github.io/mdast-util-to-hastlil/package-build.json). npm publication is independent.
