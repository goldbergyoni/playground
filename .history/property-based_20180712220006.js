var jsc = require("jsverify");

// forall (f : bool -> bool) (b : bool), f (f (f b)) = f(b).
var boolFnAppliedThrice =
  jsc.forall("Ed", "bool", function (f, b) {
    return f(f(f(b))) === f(b);
  });
jsc.assert(boolFnAppliedThrice);