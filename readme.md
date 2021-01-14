Remember to change server address

Those "export not found" errors reported by webpack can be safely ignored.
[`tsc` has stripped all type-only exports from output, so webpack reprots "not found"](https://github.com/webpack/webpack/issues/7378).
