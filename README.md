# @itslil/mdast-util-to-hast

Official [`mdast-util-to-hast@13.2.1`](https://github.com/syntax-tree/mdast-util-to-hast) algorithms rewritten in LilScript. Official test suite 142/142. Not affiliated with upstream.

**Site:** [yeargun.github.io/mdast-util-to-hastlil/](https://yeargun.github.io/mdast-util-to-hastlil/)

```sh
npm install @itslil/mdast-util-to-hast
```

The runtime is bundled, so `src/convert.lil` groups the upstream handlers, state, and footer for whole-program optimization. The declaration file likewise merges upstream's root and public `lib` types into one artifact while retaining the exact public API.

## Comparison with the original

See [COMPARISON.md](COMPARISON.md) for current raw-, gzip- and Brotli-objective builds, minified upstream comparisons, build times and validation.
