// Mini-chat usando Node.js + ExpressJS + NowJS

// Autor: Caio R. Pereira
// Site: http://crpwebdev.com
// Twitter: @crp_underground
// Email: caio.ribeiro.pereira@gmail.com
// Data: 27/04/2012

var express = require('express');
var nowjs = require('now');
var fs = require('fs');

var app = express.createServer();

// Configuração do Express
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

// Rota '/'
app.get('/', function(req, res) {
	
	fs.readFile(__dirname + '/public/index.html', function(err, text){
		res.writeHeader(200, {'Content-Type': 'text/html'});
        res.write(text);
		res.close();
    });

});

app.listen((process.env.PORT || 3000), function(){
	console.log('Mini-chat executando na porta 3000');
});

var chat = nowjs.initialize(app);

chat.now.toServer = function(message){
	chat.now.toClient(this.now.name, message);
};