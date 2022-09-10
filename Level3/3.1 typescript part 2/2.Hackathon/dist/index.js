"use strict";
var t;
(function (t) {
    t[t["one"] = 0] = "one";
    t[t["two"] = 1] = "two";
    t[t["three"] = 2] = "three";
})(t || (t = {}));
console.log(t.one);
