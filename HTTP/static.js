var FS = require('fs');


module.exports = function (url)  {

    return  new Promise(function (resolve, reject) {

        FS.readFile('public' + decodeURI(url.pathname),  function (error, data) {

            error  ?  reject( error )  :  resolve( data );
        });
    });
};