//1. import 'http' module
const http = require('http');
const path = require('path');
const fs = require('fs');
//2. create server
const serveStaticFile = (request, response) => {
    //3.1. parse url
    console.log("test" + request.url);

    //3.2. if no 'path' is defined, return 'index.html'
    const url = request.url === '/' ? 'index.html' : request.url;

    console.log(__dirname);
    const filePath = path.join(__dirname, "public", url);
    console.log(`filePath: ${filePath}`);

    const fileExt = path.extname(filePath);

    let contentType;

    switch (fileExt) {
        case '.avi':
            contentType = "video/x-msvideo";
            break;
        case '.csv':
            contentType = "text/csv";
            break;
        case '.doc':
            contentType = "application/msword";
            break;
        case '.ico':
            contentType = "image/vnd.microsoft.icon";
            break;
        case '.css':
            contentType = "text/css";
            break;
        case '.jpg':
            contentType = "image/jpeg";
            break;
        case '.json':
            contentType = "application/json";
            break;
        default:
            contentType = "text/html";
    };

    //3.3. else look for the desired files
    //read file async
    fs.readFile(filePath, (error, content) => {
        // 1. Check for errors, return 404 error
        // 2. If exist, return file

        if (error) {
            if (error.code === 'ENOENT') {
                const errorFile = path.join(__dirname, "public", "404.html");
                fs.readFile(errorFile, (err, data) => {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(data);
                })
            } else {
                response.writeHead(500);
                response.end(`Server error: ${error.code}`);
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf8');
        }

    })

    //3.4. if file not found - send error
    //3.5. if file found -  return file

    // responce.end('testing');
}

module.exports = { serveStaticFile };