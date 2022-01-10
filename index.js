const http = require('http');
const fs = require('fs')

const internalError = `<h1>Error 404</h1>`

let callHtmlPage = (path, response, statusCode) => {
    fs.readFile(path, (err, data) => {
        if(err) {
            response.writeHead(500)
            response.end(internalError)
        } else {
            const pageString = data.toString()
            response.writeHead(statusCode, { "Content-Type" : "text/html"})
            response.end(pageString)
        }
            
    })
}

let cssImplementation = (path, response, statusCode) => {
    fs.readFile(path, (err, data) => {
        if(err) {
            response.writeHead(500)
            response.end(internalError)
        } else {
            const pageString = data.toString()
            response.writeHead(statusCode, { "Content-Type" : "text/css"})
            response.end(pageString)
        }
            
    })
}

let callHtmlPageImage = (path, response, statusCode) => {
    fs.readFile(path, (err, data) => {
        if(err) {
            response.writeHead(500)
            response.end(internalError)
        } else {
            response.writeHead(statusCode, { "Content-Type" : "image/png"})
            response.end(data)
        }
            
    })
}

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);
    switch (request.url) {
        case "/":
        case "/home":
            callHtmlPage("./html/home.html", response, 200)
            break;
        case "/about":
            callHtmlPage("./html/about.html", response, 200)
            break;
        case "/contact":
            callHtmlPage("./html/contact.html", response, 200)
            break;
        case "/faq":
            callHtmlPage("./html/faq.html", response, 200)
            break;
        case "/Rectangle5.png":
            callHtmlPageImage("./images/Rectangle5.png", response, 200)
            break;
        case "/balconyTable.png":
            callHtmlPageImage("./images/balconyTable.png", response, 200)
            break;
        case "/css/style.css":
            cssImplementation("./css/style.css", response, 200)
            break;
        default:
            callHtmlPage("./html/notFound.html", response, 404)
            break;
        
    }
})

const PORT = 2500
server.listen(PORT, () => console.log("Listening on port ", PORT))