const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

console.log('Start');

const PromiseThatThrowsWithDelay = async () =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Not good')), 50);
  });

const FSThatThrowsAfterTimeout = async () => {
  setTimeout(async () => {
    const data = await readFile('noneexistingpath');
    return data;
  }, 10);
};

const FSThatThrows = async () => {
  const data = await readFile('noneexistingpath');
  return data;
};

const FSThatThrowsAfterTimer = async () => {
  setImmediate(async () => {
    const data = await readFile('noneexistingpath');
    return data;
  });
};

(async () => {
  try {
    await FSThatThrowsAfterTimer();
  } catch (error) {
    console.log('Caught it!');
    console.log(error);
  }
})();

console.log('End');
