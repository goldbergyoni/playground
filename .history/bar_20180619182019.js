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
    schema: ':bar',
    total : 10 
});
 
var iv = setInterval(function () {
  bar.tick();
  if (bar.completed) {
    clearInterval(iv);
  }
}, 100);