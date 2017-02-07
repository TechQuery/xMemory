var Type_Map = {
        htm:     'text/html',
        html:    'text/html',
        xml:     'text/xml',
        css:     'text/css',
        js:      'text/javascript',
        json:    'application/json',
        md:      'text/plain',
        pdf:     'application/pdf',
        doc:     'application/msword',
        xls:     'application/vnd.ms-excel',
        ppt:     'application/vnd.ms-powerpoint',
        bmp:     'application/x-bmp',
        gif:     'image/gif',
        jpg:     'image/jpeg',
        png:     'image/png',
        svg:     'text/xml',
        mp3:     'audio/mp3',
        mp4:     'video/mpeg4',
        avi:     'video/avi',
        rm:      'application/vnd.rn-realmedia',
        rmvb:    'application/vnd.rn-realmedia-vbr'
    };

module.exports = function (file_name) {

    file_name = file_name.split('.');

    return  file_name[1]  &&  Type_Map[ file_name.slice(-1)[0] ];
};