# @itslil/mdast-util-to-hast

Official [`mdast-util-to-hast@13.2.1`](https://github.com/syntax-tree/mdast-util-to-hast) algorithms rewritten in LilScript. Official test suite 142/142. Not affiliated with upstream.

**Site:** [yeargun.github.io/mdast-util-to-hastlil/](https://yeargun.github.io/mdast-util-to-hastlil/)

```sh
npm install @itslil/mdast-util-to-hast
```

The runtime is bundled, so `src/convert.lil` groups the upstream handlers, state, and footer for whole-program optimization. The declaration file likewise merges upstream's root and public `lib` types into one artifact while retaining the exact public API.

## Size

Built by LilScript `aa2052f0`, the one compiler. Sizes are from `lilscript-codec` (gzip-9, Brotli-11). The bars are one esbuild bundle of `mdast-util-to-hast@13.2.1` plus its runtime dependencies (`site/official.js`), then each minifier.

| File | Raw | gzip-9 | Brotli-11 |
| --- | ---: | ---: | ---: |
| **`dist/to-hast.esm.js`** (npm ESM) | **16,520** | **5,096** | **4,552** |
| Official · Terser mangle on (strongest bar) | 16,710 | 5,388 | 4,860 |
| Official · Oxc mangle on (Vite 8.2.1) | 16,730 | 5,511 | 5,008 |
| Official · esbuild minify | 17,289 | 5,765 | 5,245 |
| Official · pinned Git source, Terser mangle on | 16,905 | 5,474 | 4,949 |
| Previous release (`acf5610`, old compiler route) | 14,023 | 4,713 | 4,232 |

The npm ESM is 308 B (6.3%) smaller than Terser in Brotli, 292 B in gzip and 190 B raw. It is 320 B (7.6%) larger in Brotli than the previous release, which the deleted old compiler route built.

## Delivered files

Every file the package delivers is the compiler's own output. No minifier runs after the compiler.

| File | Loaded by | Written by | Brotli-11 |
| --- | --- | --- | ---: |
| `dist/to-hast.esm.js` | `import` | compiler + license banner | 4,552 |
| `dist/to-hast.cjs` | `require` | compiler + license banner, `module.exports` object in place of the export clause | 4,547 |
| `dist/to-hast.umd.js` | browser script (unpkg, jsdelivr) | compiler + license banner, one function scope and the global `toHast` in place of the export clause | 4,537 |
| `dist/to-hast.closed.js` | `./closed` | compiler (diagnostic lane) | 5,740 |

Until this release the CommonJS and browser files were esbuild reprints of the ESM.

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | the same source at a lower effort level with no candidate search. This compiler renames no properties, so `extern class` keys keep their names in both lanes. ESM export names stay so the lane is testable. |

You publish the library lane. `dist/to-hast.closed.js` is diagnostic only.

## Compile time

Measured on the release host (Azure Standard_B8als_v2, 8 vCPUs, burstable; other sessions were compiling on it, 1-minute load average about 9 to 15), three clean builds each:

| What | Wall time |
| --- | ---: |
| Compiler process for the npm ESM (`lilscript.toml`) | 1.31 / 0.50 / 0.40 s (median 0.50 s) |
| Both compiler processes of a build | 1.51 / 0.62 / 0.51 s (median 0.62 s) |
| Package build, `node scripts/build.mjs --compile --force` (paired source build) | 0.82 s median (0.77 to 1.72 s) |
| Upstream repository build, `npm run build` (paired source build) | 11.73 s median (10.89 to 13.32 s) |

The two builds produce different outputs (upstream's runs `tsc` and type coverage), so no speedup is claimed. The previous record (2026-09-10, old compiler route `4dc4e33`) was a 23.56 s package build.

`npm run record:release` (with `LILSCRIPT_COMPILER` and `LILSCRIPT_CODEC` set) rebuilds three times, checks the builds are byte-identical, and records sizes, compile times, the suite and a throughput sample in `site/results.json`. `comparison/source-build/` holds the paired source builds of this port and of upstream's repository.

The LilScript compiler lives next door at `../lilscript`. A set `LILSCRIPT_COMPILER` is used or the build fails; it never falls back to another binary.
