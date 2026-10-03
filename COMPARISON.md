# Current comparison with the original

Portable main-entry ESM with matching shared named exports and external imports. The original uses production/default package conditions. Package Node, browser and development variants are tested separately.

Each compression row uses a separate LilScript compilation targeting that objective. Original results are the smallest of Terser, esbuild and Oxc for the named codec.

| Objective | LilScript bytes | Original minified bytes | Original minifier | LilScript build (s) | Original bundle + minify (s) |
|---|---:|---:|---|---:|---:|
| raw | 17,373 | 16,904 | Terser | 89.565 | 0.778 |
| gzip | 6,018 | 5,472 | Terser | 57.143 | 0.778 |
| brotli | 5,369 | 4,947 | Terser | 159.617 | 0.778 |

Original version: `mdast-util-to-hast@13.2.1`. gzip level 9; Brotli quality 11/window 22. Each time is one sequential fresh-output build on the recorded shared machine. Original timing starts from installed ESM and does not include the original repository’s TypeScript compilation. Dependency installation, tests and final file compression are excluded.

Validation: 1,980 checks across raw, gzip and Brotli main entries. This does not cover every package format or establish complete upstream API equivalence.

[Artifacts, hashes and settings](site/comparison.json) · [Commands, source identities and timings](site/comparison-builds.json) · [Exact checked source inputs](site/comparison-artifacts/sources.tar.gz).
