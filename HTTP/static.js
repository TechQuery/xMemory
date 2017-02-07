var  FS = require('fs'),  FT = require('./MIME-Type');


function FolderList(path) {

    return  new Promise(function (resolve, reject) {

        FS.readdir(path,  function (error, data) {

            if ( error )  return  reject( error );

            resolve(data.map(function (file) {
                file = {
                    name:    file,
                    type:    FT( file ),
                    path:    path + file
                };

                return  Object.assign(file,  FS.statSync( file.path ));
            }));
        });
    });
}

module.exports = function (url, request, response)  {

    var file_path = 'public'  +  decodeURI( url.pathname );

    var file_stat = FS.statSync( file_path );

    return  file_stat.isDirectory() ?
        FolderList( file_path ).then(function () {

            response.setHeader('Content-Type', FT('.json'));

            return  JSON.stringify(arguments[0].map(function (file) {
                var _file_ = {
                        name:    file.name,
                        type:    file.type,
                        path:    file.path.replace(/^public\//, ''),
                        size:    file.size
                    };

                for (var key in file)  if (file[key] instanceof Date)
                    _file_[key] = file[key].getTime();

                return _file_;
            }));
        })  :
        (new Promise(function (resolve, reject) {

            FS.readFile(file_path,  function (error, data) {

                if ( error )  return  reject( error );

                response.setHeader(
                    'Content-Type',
                    FT( file_path )  ||  request.headers.accept.split(',')[0]
                );

                resolve( data );
            });
        }));
};