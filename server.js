const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
var db = require('./db.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use(jsonServer.rewriter({
  '/api/clients': '/clients'
}));


server.post('/post/client', (req, res) => {
  if (req.method === 'POST') {
    const documentNumber = req.body['documentNumber'];
    const typeClient = req.body['typeClient'];
    const typeDocument = req.body['typeDocument'];
    if (documentNumber !== null) {
      let result = db.clients.find(client => {
        return client.documentNumber === documentNumber;
      });

      if (result) {
        res.status(200).jsonp(result.services);
      } else {
        res.status(400).jsonp({
          error: "El usuario no existe"
        });
      }
    } else {
      res.status(400).jsonp({
        error: "No valid userId"
      });
    }
  }
});

server.use(router);
server.listen(port, function () {
  console.log('Server is running (*-*)/');
});
