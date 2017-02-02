<!DocType HTML>
<html><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no">

	<meta name="author" content="https://github.com/TechQuery">

    <title>QVOD</title>
    <style>
        * {
            box-sizing:    border-box;
        }
        html, body {
            margin:    0;
            height:    100%;
        }
        body > video {
            width:    	   100%;
            height:    	   40%;
			background:    black;
			padding: 	   1.5em  0;
        }
        body > ul {
            margin:        0;
			height:		   60%;
			overflow:      auto;
            padding:       1em;
			list-style:    none;
        }
        body > ul > li > a {
            display:          inline-block;
            max-width:        100%;
            white-space:      nowrap;
            overflow:         hidden;
            text-overflow:    ellipsis;
            line-height:      1.5em;
        }
    </style>
    <script>
        document.onclick = function (iEvent) {

            if (iEvent.target.tagName != 'A')  return;

            var iVideo = document.querySelector('video');

			var iVTT = iVideo.children[0];

			iVTT.onerror = function () {

				this.removeAttribute('src');
			};
			iVTT.src = iEvent.target.href.replace(/\.\w+$/, '.vtt');

			iVideo.src = iEvent.target.href;

            iEvent.preventDefault();
        };
    </script>
</head><body>
    <video controls autoplay>
		<track srclang="zh-cn" label="简体中文" default>
	</video><?php

    $_File = glob('video/*.{avi,wmv,rm,rmvb,flv,mp4,mkv}', GLOB_BRACE);

    if (preg_match('/Win/i', PHP_OS))
        $_File = array_map(
            function ($_Name) {
                return  iconv('GBK', 'UTF-8//TRANSLIT', $_Name);
            },
            $_File
        );  ?>
    <ul><?php
    foreach ($_File as $_Name) {  ?>
        <li><a target="_blank" href="<?php  echo $_Name;  ?>" title="<?php  echo basename($_Name);  ?>"><?php
            echo  pathinfo($_Name, PATHINFO_FILENAME);  ?>
        </a></li><?php
    }  ?>
    </ul>
</body></html>