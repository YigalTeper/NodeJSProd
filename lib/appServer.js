
const http = require('http');
const url = require('url');
const { handleApiRequest } = require('./apiHandler');
const { serveStaticFile } = require('./staticFileHandler');
const { chatServer } = require('./chatHandler');

function startServer(customPort = 3006) {
    const PORT =  customPort; //process.env.PORT ||

    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const method = req.method;

        if (pathname.startsWith('/api/')) {
            handleApiRequest(pathname, method, req, res);
        } else {
            serveStaticFile(req, res);
        }
    });

    chatServer(server);

    server.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

// function doX(){}

module.exports = { startServer };