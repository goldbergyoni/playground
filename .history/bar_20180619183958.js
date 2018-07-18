// var ProgressBar = require('ascii-progress');

// var bar = new ProgressBar({
//     schema: ':current: :token1 :token2',
//     total : 3 
// });
// bar.tick({
//   'token1': "Hello",
//   'token2': "World!"
// })
// bar.tick(2, {
//   'token1': "Goodbye",
//   'token2': "World!"
// })

// var iv = setInterval(function () {
//   bar.tick();
//   if (bar.completed) {
//     clearInterval(iv);
//   }
// }, 500);

// var blessed = require('blessed');

// // Create a screen object.
// var screen = blessed.screen({
//   smartCSR: true
// });

// screen.title = 'my window title';

// // Create a box perfectly centered horizontally and vertically.
// var box = blessed.box({
//   top: 'center',
//   left: 'center',
//   width: '50%',
//   height: '50%',
//   content: 'Hello {bold}world{/bold}!',
//   tags: true,
//   border: {
//     type: 'line'
//   },
//   style: {
//     fg: 'white',
//     bg: 'magenta',
//     border: {
//       fg: '#f0f0f0'
//     },
//     hover: {
//       bg: 'green'
//     }
//   }
// });

// // Append our box to the screen.
// screen.append(box);

// var ProgressBar = require('progress');

// var bar = new ProgressBar(':bar', {
//     total: 10
// });
// var timer = setInterval(function () {
//     bar.tick();
//     if (bar.complete) {
//         console.log('\ncomplete\n');
//         clearInterval(timer);
//         var babar = require('babar');

//         console.log(babar([
//             [0, 1],
//             [1, 5],
//             [2, 5],
//             [3, 9],
//             [4, 2]
//         ], {
//             color: 'green',
//             width: 40,
//             height: 30,
//             maxY: 10,
//             yFractions: 1,
//             caption: "Promises vs Boo"
//         }));
//     }
// }, 100);

var CLI = require(''),
    clc = require('cli-color');

var Line = CLI.Line;

var blankLine = new Line().fill().output();

var headers = new Line()
  .padding(2)
  .column('Suscipit', 20, [clc.cyan])
  .column('Voluptatem', 20, [clc.cyan])
  .column('Nesciunt', 20, [clc.cyan])
  .column('Laudantium', 20, [clc.cyan])
  .fill()
  .output();

var line;
for(var l = 0; l < 20; l++)
{
  line = new Line()
    .padding(2)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 20)
    .fill()
    .output();
}