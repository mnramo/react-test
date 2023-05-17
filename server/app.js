/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;
const url = require('url');

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format
// Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
        return;
    }

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var searchKey = query.searchKey;

    searchKey = searchKey.toUpperCase();

    const p = Array.from(searchKey).reduce((a, v, i) => `${a}[^${searchKey.substr(i)}]*?${v}`, '');
    const re = RegExp(p);

    const filteredProducts = data.filter(v =>  {
        if(v["name"].toUpperCase().match(re) || v["about"].toUpperCase().match(re)) {
            return v;
        }
        if(v["tags"].length > 0) {
            let isValid = false;
            v["tags"].forEach(tag => {
                /*if(tag.toUpperCase().match(re)) {
                    isValid = true;
                }*/
                if(tag.toUpperCase() === searchKey) {
                    isValid = true;
                }
            })
            return isValid ? v : false;
        }
        return false;
    })

    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(filteredProducts));

    // res.write("Response goes in here..."); // Write out the default response
    // res.end(); //end the response
}).listen( port );


console.log(`[Server running on ${hostname}:${port}]`);
