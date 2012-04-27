# Hello World Node.js usando CoffeeScript
# http://coffeescript.org
# Autor: Caio R. Pereira
# Email: caio.ribeiro.pereira@gmail.com
# Twitter: @crp_underground
# Data: 27/04/2012

http = require 'http'

http.createServer (req, res) ->

  res.writeHead 200, 'Content-Type': 'text/plain'
  res.end 'Hello, World!'

.listen 4000

console.log 'Hello World executando em http://127.0.0.1:4000/'