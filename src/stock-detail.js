var UI = require('ui');

var StockDetail = function(stockCode){
  this.main = new UI.Card({
    title: stockCode,
    icon: 'images/menu_icon.png',
    subtitle: 'Hello World!',
    body: 'Press any button.'
  });
};

StockDetail.prototype.show = function(){
  this.main.show();
};

module.exports = StockDetail;