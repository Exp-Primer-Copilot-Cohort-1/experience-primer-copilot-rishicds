// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments');
var mime = require('mime');

var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        pathname = '/index.html';
    }
    if (pathname === '/index.html') {
        var commentsData = comments.get();
        var str = '';
        commentsData.forEach(function(item) {
        str += '<li>' + item + '</li>';
        });
        var fileContent = fs.readFileSync('./index.html').toString();
        fileContent = fileContent.replace('<!--replace-->', str);
        res.setHeader('Content-Type', 'text/html');
        res.end(fileContent);
    } else {
        var fileContent = fs.readFileSync('.' + pathname);
        res.setHeader('Content-Type', mime.lookup(pathname));
        res.end(fileContent);
    }
    });
server.listen(8080, function() {
    console.log('server is listening on 8080');
}
);
