// let introJs = require("intro.js");
// import introJs from "intro.js/intro.js"
console.log('hello');
introJs().start();
introJs().showHints();

// introJs().setOptions(
//     {
//       hints:[
//       {
//         element: '#one',
//         hintPosition: 'bottom',
//         hint: 'hello one!'
//       },
//       {
//         element: '#two',
//         hintPosition: 'right',
//         hint: 'hello two!'
//       }
//       ]
//     }
//     ).addHints().start();
function showToastr() {
    console.log('showToastr 11111');
    toastr.info('This is a info toastr');
}
