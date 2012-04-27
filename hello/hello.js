// Hello World Node.js usando Javascript
// http://nodejs.org
// Autor: Caio R. Pereira
// Email: caio.ribeiro.pereira@gmail.com
// Twitter: @crp_underground
// Data: 27/04/2012

var http = require('http');

var server = http.createServer(
  	function (req, res) {
    	res.writeHead(200, {'Content-Type': 'text/plain'});
    	res.end('Hello World\n');
  	}
);
 
server.listen(4000, "127.0.0.1");
console.log('Hello World executando em http://127.0.0.1:4000/');