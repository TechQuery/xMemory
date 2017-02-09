var HTTP_Server = require('easy-rest').HTTP().listen(8081);

console.log('HTTP Server runs at:');
console.dir( HTTP_Server.address() );