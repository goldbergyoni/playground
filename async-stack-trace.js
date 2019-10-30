run().then(() => console.log('success'), error => console.error(error.stack));

async function run() {
  await new Promise(resolve => setTimeout(resolve, 10));
  await bar();
}

async function bar() {
  await Promise.resolve();
  // Stack trace will just include `bar()`, no reference to `run()`
  throw new Error('Oops');
}