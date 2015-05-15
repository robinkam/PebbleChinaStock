var UI = require('ui');

var StockDetail = function(dataParts){
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
		var subtitle = '现价'+stockData.currentPrice+"元";
		var lines = [
			"今开盘价"+stockData.openingPriceToday+"元",
			"昨收盘价"+stockData.closingPriceYesterday+"元",
			"今最高价"+stockData.highestPriceToday+"元",
			"今最低价"+stockData.lowestPriceToday+"元",
			"竞买价"+stockData.buyPrice+"元",
			"竞卖价"+stockData.sellPrice+"元",
			"成交量\n"+stockData.tradedAmountOfStock+"股",
			"成交金额\n"+stockData.tradedAmountOfMoney/10000+"万元",
			"数据时间\n"+stockData.date+" "+stockData.time
		];
		var body = lines.join("\n");
		this.main = new UI.Card({
			title: stockData.stockName,
			subtitle: subtitle,
			body: body,
			scrollable:true,
			style: "small"
		});
	}else{
		this.main = new UI.Card({
    title: '数据无效',
    subtitle: '请返回上一页面',
    body: '再试试别的股票',
    scrollable:true,
		style: "small"
  });
  }
};

StockDetail.prototype.show = function(){
  this.main.show();
};

module.exports = StockDetail;