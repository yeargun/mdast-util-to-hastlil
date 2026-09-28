# @itslil/mdast-util-to-hast

Official [`mdast-util-to-hast@13.2.1`](https://github.com/syntax-tree/mdast-util-to-hast) algorithms rewritten in LilScript. Official test suite 142/142. Not affiliated with upstream.

**Site:** [yeargun.github.io/mdast-util-to-hastlil/](https://yeargun.github.io/mdast-util-to-hastlil/)

```sh
npm install @itslil/mdast-util-to-hast
```

The runtime is bundled, so `src/convert.lil` groups the upstream handlers, state, and footer for whole-program optimization. The declaration file likewise merges upstream's root and public `lib` types into one artifact while retaining the exact public API.

## Size

Built by LilScript `24968659`, the one compiler. Sizes are from `lilscript-codec` (gzip-9, Brotli-11). The bars are one esbuild bundle of `mdast-util-to-hast@13.2.1` plus its runtime dependencies (`site/official.js`), then each minifier.

| File | Raw | gzip-9 | Brotli-11 |
| --- | ---: | ---: | ---: |
| **`dist/to-hast.esm.js`** (npm ESM) | **19,483** | **6,127** | **5,464** |
| Official · Terser mangle on (strongest bar) | 16,905 | 5,474 | 4,949 |
| Official · Oxc mangle on (Vite 8.2.1) | 16,928 | 5,603 | 5,090 |
| Official · esbuild minify | 17,489 | 5,863 | 5,336 |
| Official · pinned Git source, Terser mangle on | 16,905 | 5,474 | 4,949 |

The npm ESM is 515 B (10.4%) larger than Terser in Brotli, 653 B larger in gzip and 2,578 B larger raw. Both carry @ungap/structured-clone's polyfill for runtimes without structuredClone, which upstream ships and this port matches.

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

## Compile time

Measured on the release host (Azure Standard_B8als_v2, 8 vCPUs, burstable; other sessions were compiling on it, 1-minute load average about 2 to 4), three clean builds each:

| What | Wall time |
| --- | ---: |
| Compiler process for the npm ESM (`lilscript.toml`) | 0.62 / 0.64 / 0.67 s (median 0.64 s) |
| Both compiler processes of a build | 0.70 / 0.71 / 0.75 s (median 0.71 s) |
| Package build, `node scripts/build.mjs --compile --force` (paired source build) | 0.87 s median (0.87 to 0.87 s) |
| Upstream repository build, `npm run build` (paired source build) | 4.43 s median (4.33 to 4.53 s) |

The two builds produce different outputs (upstream's runs `tsc` and type coverage), so no speedup is claimed.

`npm run record:release` (with `LILSCRIPT_COMPILER` and `LILSCRIPT_CODEC` set) rebuilds three times, checks the builds are byte-identical, and records sizes, compile times, the suite and a throughput sample in `site/results.json`. `comparison/source-build/` holds the paired source builds of this port and of upstream's repository.

The LilScript compiler lives next door at `../lilscript`. A set `LILSCRIPT_COMPILER` is used or the build fails; it never falls back to another binary.
