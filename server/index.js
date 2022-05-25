const server = require('./app');


// Server should indicate when it is listening and on which port
server.listen(3000, function() {
  console.log('Server is listening on http://localhost:3000');
});
