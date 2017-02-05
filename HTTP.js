var  URL = require('url'),  FS = require('fs');


require('http').createServer(function (request, response) {

    var url = URL.parse(request.url, true);

    if (url.pathname == '/')  url.pathname += 'index.html';

    var path = url.pathname.split('/');

    var model = './HTTP/' + (
            (path[path.length - 1].indexOf('.')  >  -1)  ?  'static'  :  path[1]
        );
    (
        FS.existsSync(model + '.js')  ?
            require( model )(url, request, response)  :
            Promise.reject()
    ).then(function () {

        response.writeHeader(200, {
            'Content-Type':    request.headers.accept.split(',')[0]
        });

        response.end( arguments[0] );

    },  function () {

        response.statusCode = 404;

        response.end( arguments[0].message );
    });

}).listen(8081);