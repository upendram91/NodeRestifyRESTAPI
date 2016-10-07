require("./settings.js")
var restify = require('restify'),
products = require('./products'),
port = process.env.PORT || 3000;


var server = restify.createServer({
  name: 'SIMPLE REST SERVER',
  version: '1.0.0'
});

server.use(function(req, res, next){
    console.log(req.method + ' ' + req.url);
    if(req.method=='GET' && req.params.id!=null) {
        console.log("request params value: " + req.params.id);
    }
    return next();   
});

server.use(restify.bodyParser()); 

server.get('api/products',products.get);
server.get('api/products/:id', products.getById);
server.post('api/products', products.post);
server.put('api/products/:id', products.put);
server.del('api/products/:id', products.del);

server.listen(port, function(){
    console.log('api running at '+ port);
});
