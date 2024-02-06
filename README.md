This repository contains a reproduction for a bug where Parcel will convert a reference to require in a conditional (`if (require)) {...}`) into undefined (`if (undefined)) {...}`).

An example module that this causes an issue with is `dagre-d3`: https://unpkg.com/dagre-d3@0.6.1/lib/dagre.js

This will manifest as a runtime error where the export doesn't exist because the dependency (`dagre`) never actually gets required, despite being present in the bundle.

Steps to reproduce:
1) Clone the repo
2) `yarn install`
3) `yarn dev`
4) Navigate to http://localhost:1234/index.js

Observe the output for the `index.js` module looks like:
```
function(require,module,exports) {
var dep;
if (undefined) dep = require("22974921420fda43");
if (dep) dep();
}
```

Expected output:
```
function(require,module,exports) {
var dep;
if (require) dep = require("22974921420fda43");
if (dep) dep();

}
```
