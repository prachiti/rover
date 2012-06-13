var http = require('http');

var content = [
    "Hello Cloud Foundry from Cloud9 IDE",
    "",
    "This is a placeholder file, Cloud Foundry requires you to have a main entry file with one of these names: 'main.js', 'index.js', 'app.js' or 'server.js'",
    "You can replace the content of your 'main.js' file in Cloud9 with the following code:",
    "",
    'module.exports = require("./your-app")',
    "",
    'Where "./your-app" points to "your-app.js" in the root of your project.'
];
    
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(content.join("\n"));
}).listen(process.env.PORT || process.env.VCAP_APP_PORT);