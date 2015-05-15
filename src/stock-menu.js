var UI = require('ui');
var ajax = require('ajax');
var StockDetail = require('stock-detail');

var StockMenu = function(stockIDs){
  this.stockIDs = stockIDs;
  this.menu = new UI.Menu({
    sections: [{
      items: []
    }]
  });
  this.menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    var detail = new StockDetail(e.item.dataParts);
    detail.show();
  });
  this.menu.delegate = this;
  this.menu.on('longSelect', function(e) {
    console.log('Long Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    e.menu.delegate.loadData(stockIDs);
  });
};

StockMenu.prototype.show = function(){
  this.menu.show();
  this.loadData(this.stockIDs);
};

StockMenu.prototype.loadData = function(stockIDs){
  var themenu = this.menu;
  themenu.items(0, [{title: '正在载入...', subtitle: '请耐心等待'}]);
  var requestUrl = 'http://hq.sinajs.cn/list=' + stockIDs.join(',');
  console.log('Request URL: ' + requestUrl);
  
  var getMenuItemFromLine = function(line){
		var firstQuoteIndex = line.indexOf('"');
		var lastQuoteIndex = line.lastIndexOf('"');
		if(firstQuoteIndex==-1 || firstQuoteIndex==lastQuoteIndex)
			return null;
		var dataString = line.substring(firstQuoteIndex+1, lastQuoteIndex);
	//	console.log('Stock line is: ' + dataString);
		var dataParts = dataString.split(",");
	//	console.log('Stock data array is: ' + dataParts);
		if(dataParts.length>31){
			var stockData = {
				stockName: dataParts[0],
				openingPriceToday: dataParts[1],
				closingPriceYesterday: dataParts[2],
				currentPrice: dataParts[3],
				highestPriceToday: dataParts[4],
				lowestPriceToday: dataParts[5],
				buyPrice: dataParts[6],
				sellPrice: dataParts[7],
				tradedAmountOfStock: dataParts[8],
				tradedAmountOfMoney: dataParts[9],
				date: dataParts[30],
				time: dataParts[31]
			};
			var stockPrice = stockData.lowestPriceToday+'<= '+stockData.currentPrice+' <='+stockData.highestPriceToday;
			console.log('Stock name is: ' + stockData.stockName + '\nStock price is: ' + stockPrice);
			var item = {title: stockData.stockName, subtitle: stockPrice, dataParts:dataParts};
			return item;
		}else{
			return null;
		}	
  };
  var getMenuItemsFromLines = function(lines){
    var items = [];
    for(var i=0; i<lines.length; i++){
      var item = getMenuItemFromLine(lines[i]);
      if(item!==null)
        items.push(item);
    }
    return items;
  };
  var getMenuItemsFromRawData = function(data){
    var lines = data.split("\n");
//     console.log('Lines: ' + lines);
    var items = getMenuItemsFromLines(lines);
    return items;
  };
  ajax(
    {
      url: requestUrl
    },
    function(data, status, request) {
      console.log('Response data is: ' + data);
      var items = getMenuItemsFromRawData(data);
      console.log('MenuItems: ' + items);
      themenu.items(0, items);
    },
    function(error, status, request) {
      console.log('The ajax request failed: ' + error);
    }
  );
};

module.exports = StockMenu;