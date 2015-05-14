var UI = require('ui');
var ajax = require('ajax');
var StockDetail = require('stock-detail');

var StockMenu = function(){
  this.menu = new UI.Menu({
    sections: [{
      items: []
    }]
  });
  this.menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    var detail = new StockDetail('124123');
    detail.show();
  });
};

StockMenu.prototype.show = function(){
  this.menu.show();
  this.loadData();
};

StockMenu.prototype.loadData = function(){
  var themenu = this.menu;
  themenu.items(0, [{title: '正在载入...', subtitle: '请耐心等待'}]);
  ajax(
    {
      url: 'http://hq.sinajs.cn/list=sh600389'
    },
    function(data, status, request) {
      console.log('Response data is: ' + data);
      var firstQuoteIndex = data.indexOf('"');
      var lastQuoteIndex = data.lastIndexOf('"');
      var dataString = data.substring(firstQuoteIndex+1, lastQuoteIndex);
      console.log('Stock data is: ' + dataString);
      var dataParts = dataString.split(",");
      console.log('Stock data array is: ' + dataParts);
      if(dataParts.length()>3){
        var stockName = dataParts[0];
        var stockPrice = dataParts[3];
        console.log('Stock name is: ' + stockName + '\nStock price is: ' + stockPrice);
        themenu.items(0, [{title: stockName, subtitle: stockPrice}]);
      }
    },
    function(error, status, request) {
      console.log('The ajax request failed: ' + error);
    }
  );
};

module.exports = StockMenu;