// Autor: Caio R. Pereira
// Site: http://crpwebdev.com
// Email: caio.ribeiro.pereira@gmail.com
// Data: 26/04/2012

// Carregando os módulos Express e Socket.IO
// Caso esse app não funcione...
// Execute o comando no terminal: npm install express jade socket.io

// Para funcionar Socket.IO com Express é obrigado seguir exatamente 
// essa ordem: 1˚ instancia da variavel app.
// e no final instancia socket.io já executando um listen de app. 
var express = require('express')
	, app = express.createServer()
	, io = require('socket.io').listen(app);

// Configuração do Express
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(express.errorHandler());
	app.use(express.static(__dirname + '/public'));
});

// Rota '/'
app.get('/', function(req, res) {
	res.render('index', { host: req.headers.host });
});

// Variaveis utilizadas para processamento analytics.
var totalVisitas = 0;
var visitas = 0;
var agent = {};
var chrome = firefox = ie = opera = safari = 0
var windows = linux = mac = android = osx = 0;

// Conexão Real-time com Socket.IO
io.sockets.on('connection', function(socket){
	
	socket.on('message', function(data){
		agent = data;
		processAnalytics(agent, true);
		sendAnalytics(socket, true);
	});
	
	socket.on('disconnect', function(){
		processAnalytics(agent, false);
		sendAnalytics(socket, false);
		agent = {};
	});
	
});
// Configuracao obrigatória para hospedar no Heroku
io.configure(function(){
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});

// Processando dados analytics.
var sendAnalytics = function(socket, isConnected){
	var analyticsJSON =  {visitas: visitas
						, totalVisitas: totalVisitas
				    	, firefox: firefox
						, chrome: chrome
						, safari: safari
						, opera: opera
						, ie: ie
						, windows: windows
						, mac: mac
						, linux: linux
						, osx: osx
						, android: android};
	if(isConnected){
		socket.emit('message', analyticsJSON);
	}
	socket.broadcast.emit('message', analyticsJSON);
};

var processAnalytics = function(agent, isConnected){
	if(isConnected){
		totalVisitas++;
		visitas++;
		switch (agent.os){
			case 'Windows' : windows++; break;
			case 'Mac' : mac++; break;
			case 'Linux' : linux++; break;
			case 'OSX': osx++; break;
			case 'Android': android++; break;
		}
		switch (agent.browser){
			case 'Chrome' : chrome++; break;
			case 'Explorer' : ie++; break;
			case 'Opera' : opera++; break;
			case 'Firefox' : firefox++; break;
			case 'Safari' : safari++; break;
		}
	}else{
		visitas--;
		switch (agent.os){
			case 'Windows' : windows--; break;
			case 'Mac' : mac--; break;
			case 'Linux' : linux--; break;
			case 'OSX': osx--; break;
			case 'Android': android--; break;
		}
		switch (agent.browser){
			case 'Chrome' : chrome--; break;
			case 'Explorer' : ie--; break;
			case 'Opera' : opera--; break;
			case 'Firefox' : firefox--; break;
			case 'Safari' : safari--; break;
		}
	}

};

app.listen(process.env.PORT || 3000);
console.log('Executando Simple Analytics');