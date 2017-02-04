var  FS = require('fs'),  Form = require('formidable');


module.exports = function (url, request, response) {

    var form = new Form.IncomingForm();

    form.uploadDir = '.temp';

    if (! FS.existsSync( form.uploadDir ))  FS.mkdirSync( form.uploadDir );

    return  new Promise(function (resolve, reject) {

        form.parse(request,  function(error, fields, files) {

            if ( error )  return  reject( error );

            response.writeHead(200,  {'Content-Type': 'text/plain'});

            var file = files.data;

            var path = 'public/' + file.type.split('/')[0];

            if (! FS.existsSync( path ))  FS.mkdirSync( path );

            resolve(FS.renameSync(file.path,  path + '/' + file.name));
        });
    });
};