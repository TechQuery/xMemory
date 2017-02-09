var  Path = require('path'),  FS = require('fs'),  srt2vtt = require('srt2vtt');


module.exports = function (url, request, response) {

    var path = 'public/video/'  +  Path.parse( url.pathname ).name  +  '.srt';

    return  new Promise(function (resolve, reject) {

        FS.readFile(path,  function (error, data) {

            if ( error )  return  reject( error );

            srt2vtt(data,  function (error, data) {

                if ( error )  return  reject( error );

                FS.writeFileSync(path.replace(/srt$/, 'vtt'),  data);

                require('./static')(url, request, response).then(resolve, reject);
            });
        });
    });
};