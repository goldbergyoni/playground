// var ProgressBar = require('progress');

// var bar = new ProgressBar(':bar', { total: 10 });
// var timer = setInterval(function () {
//   bar.tick();
//   if (bar.complete) {
//     console.log('\ncomplete\n');
//     clearInterval(timer);
//   }
// }, 100);

var ProgressBar = require('ascii-progress');
var bar = new ProgressBar({
    schema: ':current: :token1 :token2',
    total : 3 
});
bar.tick({
  'token1': "Hello",
  'token2': "World!"
})
bar.tick(2, {
  'token1': "Goodbye",
  'token2': "World!"
})
 
var iv = setInterval(function () {
  bar.tick();
  if (bar.completed) {
    clearInterval(iv);
  }
}, 100);