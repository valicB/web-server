var http = require('http');
var fs   = require('fs');

// 1) create a new server
var server = http.createServer( callback );

function detect_language(url){
  if(url.split("/")[1] == "en" || url.split("/")[1] == "ru" ) return url.split("/")[1];
  return "en";
}

function callback(req,res){
    var lang = detect_language(req.url);
    var code = 404;
    var page = fs.readFileSync(`./public/${lang}/404.html`);
    // console.log( Object.keys(req) );

    if(req.url == '/'){
        console.log(req.url);
        code = 200;
        page = fs.readFileSync(`./public/${lang}/home.html`);
    } else if( req.url == `/${lang}`){
        console.log(req.url);
        code = 200;
        page = fs.readFileSync(`./public/${lang}/home.html`);
    } else if( req.url == `/${lang}/about`){
        console.log(req.url);
        code = 200;
        page = fs.readFileSync(`./public/${lang}/about.html`);
    } else if( req.url == `/${lang}/contacts`){
        console.log(req.url);
        code = 200;
        page = fs.readFileSync(`./public/${lang}/contacts.html`);
    }
        res.writeHead(code,{'Content-Type': 'text/html'});
        res.write(page);

    // ----end of ROUTING --------------------

    // res.write('OK');
    // res.write('<script>alert()</script>');
    res.end();
}
// 3) start server
server.listen( 9090 );
