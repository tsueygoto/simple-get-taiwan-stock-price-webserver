const http = require("http");
var url = require('url')

let stocks = require('./stocks');

const host = 'localhost';
const port = 8000;

const requestListener = async function (req, res) {
    
    var requestUrl = url.parse(req.url)
    
    switch (requestUrl.pathname) {
        case "/stockprice":
            var queryData = url.parse(req.url, true).query;
            stockno = queryData.no;
            console.log(stockno)
            value = await stocks.getPrice(stockno)
            console.log(value)
            console.log(typeof value)
            
            res.writeHead(200);
            res.end(value.toString());
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});