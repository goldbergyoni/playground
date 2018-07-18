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

var blessed = require('blessed')
     , screen = blessed.screen();
   

const contrib = require('blessed-contrib');

var bar = contrib.bar(
    { label: 'Server Utilization (%)'
    , barWidth: 4
    , barSpacing: 6
    , xOffset: 0
    , height: "60%"
    , width: "50%",
    , maxHeight: 9})
 screen.append(bar) 
 bar.setData(
    { titles: ['bar1', 'bar2']
    , data: [5, 10]})

screen.render();