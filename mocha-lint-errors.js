describe("Too short description", () => {
  const someGlobalObject = { aProperty: true }; // no-setup-in-describe, use hooks (sparingly) instead
  it("Some description", () => {});
});

it("Test name", () => {
  // error:no-skipped-tests, error:error:no-global-tests. Put tests only under describe or suite
  expect("somevalue"); // error:no-assert
});

it("Test name", () => {
  // error:no-identical-title. Assign unique titles to tests
  
});
