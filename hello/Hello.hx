// Hello World Node.js usando HaxeNode
// http://haxenode.org
// Autor: Caio R. Pereira
// Email: caio.ribeiro.pereira@gmail.com
// Twitter: @crp_underground
// Data: 27/04/2012

import js.Node;

class Hello {

  public static function main() {

    var server = Node.http.createServer(function(req:NodeHttpServerReq, res:NodeHttpServerResp){
        
		res.setHeader("Content-Type","text/plain");
   		res.writeHead(200);
		res.end('Hello World\n');
		
    });
 
    server.listen(4000,"localhost");
    trace('Hello World executando em http://127.0.0.1:1337/');
  }

}