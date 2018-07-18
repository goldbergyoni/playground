var jsc = require("jsverify");

// forall (f : bool -> bool) (b : bool), f (f (f b)) = f(b).
var boolFnAppliedThrice =
  jsc.forall("Example", "bool", function (param) {
    return f(f(f(b))) === f(b);
  });
jsc.assert(boolFnAppliedThrice);