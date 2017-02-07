var  URL = require('url'),  FS = require('fs');


require('http').createServer(function (request, response) {

    var url = URL.parse(request.url, true);

    if (url.pathname == '/')  url.pathname += 'index.html';

    var _module_ = './HTTP/' + (
            FS.existsSync('public/' + url.pathname)  ?
                'static'  :  url.pathname.split('/')[1]
        );
    (
        FS.existsSync(_module_ + '.js')  ?
            require(_module_)(url, request, response)  :
            Promise.reject(new Error('Resource not found'))
    ).then(function () {

        response.statusCode = 200;

        response.end( arguments[0] );

    },  function () {

        response.statusCode = 404;

        response.end( arguments[0].message );
    });

}).listen(8081);