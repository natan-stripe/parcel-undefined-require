var dep;

if (require) {
    dep = require("./dep");
}

if (dep) {
    dep();
}