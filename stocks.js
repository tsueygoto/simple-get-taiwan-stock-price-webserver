
const https = require("https");
var request = require('request');

/*



https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20241109&stockNo=2330&response=json&_=1731162353233

{"stat":"OK","date":"20241109","title":"113年11月 2330 台積電           各日成交資訊","fields":["日期","成交股數","成交 金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"],"data":[["113/11/01","61,545,741","62,269,386,415","996.00","1,030.00","996.00","1,025.00","-5.00","77,404"],["113/11/04","28,225,506","29,263,376,605","1,030.00","1,045.00","1,025.00","1,040.00","+15.00","33,492"],["113/11/05","33,407,780","34,851,674,542","1,030.00","1,055.00","1,030.00","1,050.00","+10.00","28,872"],["113/11/06","59,404,980","63,110,184,620","1,050.00","1,080.00","1,040.00","1,060.00","+10.00","58,611"],["113/11/07","46,030,563","48,979,606,039","1,050.00","1,075.00","1,050.00","1,065.00","+5.00","41,583"],["113/11/08","38,840,413","42,224,017,162","1,085.00","1,090.00","1,080.00","1,090.00","+25.00","58,203"]],"notes":["符號說明:+/-/X表示漲/跌/不比價","當日統計資訊含一般、零股、盤後定價、鉅額交易，不含拍賣、標購。","ETF證券代號第六碼為K、M、S、C者，表示該ETF以外幣交易。","權證證券代號可重複使用，權證顯示之名稱係目前存續權證之簡稱。"],"total":6}

{"stat":"OK","date":"20250516","title":"114年05月 2330 台積電           各日成交資訊","fields":["日期","成交股數","成交金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"],"data":[["114/05/02","48,129,292","45,206,565,214","938.00","950.00","932.00","950.00","+42.00","99,509"],["114/05/05","56,516,129","53,055,259,965","956.00","957.00","923.00","938.00","-12.00","93,285"],["114/05/06","43,358,708","40,011,158,770","916.00","930.00","916.00","920.00","-18.00","74,918"],["114/05/07","39,021,595","36,011,806,469","925.00","932.00","911.00","928.00","+8.00","50,267"],["114/05/08","30,777,988","28,602,519,292","933.00","939.00","918.00","918.00","-10.00","39,133"],["114/05/09","40,878,730","38,557,125,038","938.00","949.00","934.00","949.00","+31.00","68,630"],["114/05/12","25,668,469","24,554,284,001","954.00","962.00","952.00","957.00","+8.00","44,647"],["114/05/13","50,960,522","49,747,284,080","990.00","990.00","969.00","969.00","+12.00","72,252"],["114/05/14","55,061,671","54,697,821,594","990.00","999.00","988.00","999.00","+30.00","105,868"],["114/05/15","28,518,212","28,422,046,465","1,000.00","1,000.00","993.00","993.00","-6.00","50,265"],["114/05/16","18,079,325","17,966,857,712","991.00","998.00","989.00","998.00","+5.00","36,183"]],"notes":["符號說明:+/-/X表示漲/跌/不比價","當日統計資訊含一般、零股、盤後定價、鉅額交易，不含拍賣、標購。","ETF證券代號第六碼為K、M、S、C者，表示該ETF以外幣交易。","權證證券代號可重複使用，權證顯示之名稱係目前存續權證之簡稱。"],"total":11}

*/

data = {
    "stat":"OK",
    "date":"20241109",
    "title":"113年11月 2330 台積電           各日成交資訊",
    "fields":["日期","成交股數","成交 金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"],"data":[["113/11/01","61,545,741","62,269,386,415","996.00","1,030.00","996.00","1,025.00","-5.00","77,404"],["113/11/04","28,225,506","29,263,376,605","1,030.00","1,045.00","1,025.00","1,040.00","+15.00","33,492"],["113/11/05","33,407,780","34,851,674,542","1,030.00","1,055.00","1,030.00","1,050.00","+10.00","28,872"],["113/11/06","59,404,980","63,110,184,620","1,050.00","1,080.00","1,040.00","1,060.00","+10.00","58,611"],["113/11/07","46,030,563","48,979,606,039","1,050.00","1,075.00","1,050.00","1,065.00","+5.00","41,583"],["113/11/08","38,840,413","42,224,017,162","1,085.00","1,090.00","1,080.00","1,090.00","+25.00","58,203"]],
    "notes":["符號說明:+/-/X表示漲/跌/不比價","當日統計資訊含一般、零股、盤後定價、鉅額交易，不含拍賣、標購。","ETF證券代號第六碼為K、M、S、C者，表示該ETF以外幣交易。","權證證券代號可重複使用，權證顯示之名稱係目前存續權證之簡稱。"],
    "total":6
}


function getLastClosingPrice(fields, lastItem, sfield) {
    //value = lastItem[fields.indexOf("收盤價")];
    value = lastItem[fields.indexOf(sfield)];
    return value
}

function proData(data, sfield) {

    console.log("<<<", data, ">>>");
    if (data.stat.toUpperCase() == "OK") {
        //let index = data.fields.findIndex(x => x == "收盤價");
        let index = data.fields.findIndex(x => x == sfield);
        //console.log(data.data[data.total-1][index])
        //str = str.replace(/abc/g, '');
        //closing_price = parseFloat(data.data[data.total-1][index].replace(/,/g,''))
        //console.log(closing_price)
        _total = 0
        if ('total' in data)
            _total = data.total
        else if ('totalCount' in data)
            _total = data.totalCount
        
        if (_total == 0)
            return null;

        let out = []
        for (var idx=_total; idx > 0; idx--) {
            _lastItemIdx = idx - 1
            // chcek --
            if (data.data[_lastItemIdx][6] == '--') {
                console.log("skip " + data.data[_lastItemIdx][0])
                continue;
            }
        
            out.push(data.data[_lastItemIdx][0]);
            out.push(parseInt(data.data[_lastItemIdx][1].replace(/,/g,'')));
            out.push(parseInt(data.data[_lastItemIdx][2].replace(/,/g,'')));
            out.push(parseFloat(data.data[_lastItemIdx][3].replace(/,/g,'')));
            out.push(parseFloat(data.data[_lastItemIdx][4].replace(/,/g,'')));
            out.push(parseFloat(data.data[_lastItemIdx][5].replace(/,/g,'')));
            out.push(parseFloat(data.data[_lastItemIdx][6].replace(/,/g,'')));
            out.push(data.data[_lastItemIdx][7]);
            out.push(parseInt(data.data[_lastItemIdx][8].replace(/,/g,'')));
            
            console.log("out=", out);
            
            break;
            
        }
        
        if (out == [])
            return null;
        else
            return out;
        
    } else {
        return null;
    }
}



//let ret = proData(data)



async function getData_bak(fund_url) {
}

//
//  "https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=20241109&stockNo=2330&response=json"
//
function getStockData(_url)
{
    return new Promise(function (resolve, reject)
    {
        https.get(_url, resp => {
            let data = "";
        
            // A chunk of data has been recieved.
            resp.on("data", chunk => {
              data += chunk;
            });
        
            // The whole response has been received. Print out the result.
            resp.on("end", () => {
              //let url = JSON.parse(data).message;
              //console.log(url);
                //proData(data)
                resolve(data);
            });
          })
          .on("error", err => {
            //console.log("Error: " + err.message);
            reject(null);
          });    
    });
}

/*
https://www.tpex.org.tw/www/zh-tw/afterTrading/tradingStock
code=2629&date=2025%2F05%2F01&id=&response=json


{"tables":[
    {
        "title":"個股日成交資訊",
        "subtitle":"2926 誠品生活 114年05月",
        "date":"20250501",
        "data":[["114/05/02","10","475","47.20","47.20","46.60","47.20","0.00","12"],["114/05/05","19","879","46.50","48.00","46.40","48.00","0.80","26"],["114/05/06","27","1,330","48.45","49.10","48.45","49.10","1.10","30"],["114/05/07","8","397","49.10","49.30","48.20","49.30","0.20","13"],["114/05/08","15","748","49.10","49.60","49.10","49.60","0.30","18"],["114/05/09","11","562","49.80","50.30","49.80","50.30","0.70","19"],["114/05/12","3","160","49.60","49.90","49.60","49.90","-0.40","8"],["114/05/13","15","762","49.10","50.00","49.10","50.00","0.10","20"],["114/05/14","7","366","49.50","49.50","49.30","49.30","-0.70","15"],["114/05/15","10","470","48.95","49.00","48.50","49.00","-0.30","10"],["114/05/16","9","425","48.25","49.80","48.25","49.80","0.80","13"]],
        
        "fields":["日 期","成交張數","成交仟元","開盤","最高","最低","收盤","漲跌","筆數"],
        "notes":["以上資料不含上櫃股票鉅額交易","ETF證券代號第六碼為K、C者，表示該ETF以外幣交易，其一交易單位(張)應為100受益權或其整倍數，請詳其公開說明書。"],
        "totalCount":11,
        "summary":[]}],
"date":"20250501",
"code":"2926",
"name":"誠品生活",
"showListPriceNote":false,
"showListPriceLink":false,
"flagField":"張數",
"stat":"ok"}

*/
//var FormData = require('form-data');

function getStockDatafromTaipeiExchange(stockNo, date)
{
    _url = 'https://www.tpex.org.tw/www/zh-tw/afterTrading/tradingStock'
    
    return new Promise(function (resolve, reject)
    {
        var options = {
            uri: 'https://www.tpex.org.tw/www/zh-tw/afterTrading/tradingStock',
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            form  : {
                "code":stockNo,
                "date": date.substring(0,4)+ "/" + date.substring(4,6) + "/01",
                "id":"",
                "response":"json"
            }
        };
        
            
        console.log(options)
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                obj = JSON.parse(body)
                data = obj.tables[0]
                data.stat = obj.stat
                _data = proData(data, "收盤")
                resolve([data.fields, _data]);
            } else {
                reject(err);
            }
        });
        
    });
}

function getTodayString() {
    const now = new Date();
    let date = '';
    date = date + now.getFullYear();
    let m = now.getMonth()+1
    date = date + (m < 10 ? '0'+m : m);
    let d = now.getDate();
    date = date + (d < 10 ? '0'+d : d);
    console.log(date);
    return date
}

async function getPrice(stockNo) {
   
    date = getTodayString()
    
    //let stockNo = '00763U'
    _url = `https://www.twse.com.tw/rwd/zh/afterTrading/STOCK_DAY?date=${date}&stockNo=${stockNo}&response=json`;
    
    console.log(_url)
    
    let data = await getStockData(_url);
    const obj = JSON.parse(data);
    let value = 0
    lastItem = proData(obj, "收盤價");
    if ( lastItem != null ) {   
        value = await getLastClosingPrice(obj.fields, lastItem, "收盤價");
        console.log("value=", value);
    } else {
        let res = await getStockDatafromTaipeiExchange(stockNo, date).then(
            function ([fields, data]) {
                value = getLastClosingPrice(fields, data, "收盤");
                console.log("value=", value);
            },
            function (error) {console.log(error)}
        )
    }

    
    return value
}

module.exports = {
   getPrice: getPrice
};


