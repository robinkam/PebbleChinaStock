/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
var Settings = require('settings');
var StockMenu = require('stock-menu');

var stockCodes = Settings.option('stockCodes');
var menu = new StockMenu(stockCodes);
menu.show();

var deviceToken = Pebble.getWatchToken();
//var settingsServiceURL = 'http://192.168.199.100:3000/form?appName=ChinaStock&deviceID='+deviceToken;
var settingsServiceURL = 'http://pebblesettings.avosapps.com/form?appName=ChinaStock&deviceID='+deviceToken;
console.log('settings service URL: '+settingsServiceURL);

// Set a configurable with the open callback
Settings.config(
  { url: settingsServiceURL },
  function(e) {
    console.log('opening configurable');
  },
  function(e) {
    console.log('closed configurable');
    // Show the parsed response
    console.log('e.options: '+JSON.stringify(e.options));
    if(e.options.stockCodes!==undefined)
      Settings.option('stockCodes', e.options.stockCodes);
    // Reload stock list
    menu.loadData(Settings.option('stockCodes'));
    // Show the raw response if parsing failed
    if (e.failed) {
      console.log('e.failed: '+e.response);
    }
  }
);

// var UI = require('ui');
// var Vector2 = require('vector2');

// var main = new UI.Card({
//   title: 'Pebble.js',
//   icon: 'images/menu_icon.png',
//   subtitle: 'Hello World!',
//   body: 'Press any button.'
// });

// main.show();

// main.on('click', 'up', function(e) {
//   var menu = new UI.Menu({
//     sections: [{
//       items: [{
//         title: 'Pebble.js',
//         icon: 'images/menu_icon.png',
//         subtitle: 'Can do Menus'
//       }, {
//         title: 'Second Item',
//         subtitle: 'Subtitle Text'
//       }]
//     }]
//   });
//   menu.on('select', function(e) {
//     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
//     console.log('The item is titled "' + e.item.title + '"');
//   });
//   menu.show();
// });

// main.on('click', 'select', function(e) {
//   var wind = new UI.Window();
//   var textfield = new UI.Text({
//     position: new Vector2(0, 50),
//     size: new Vector2(144, 30),
//     font: 'gothic-24-bold',
//     text: 'Text Anywhere!',
//     textAlign: 'center'
//   });
//   wind.add(textfield);
//   wind.show();
// });

// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });
