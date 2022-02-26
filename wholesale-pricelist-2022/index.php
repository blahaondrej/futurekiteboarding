<?php

if(empty($_POST['password']) || trim($_POST['password']) !== 'PREMIUM2022RETAILER!'){
    echo '<p>You do not have permission to access this section!</p>';
    header('Refresh: 5; URL=https://futurekiteboarding.com/');
}else{
    ?>
<html xmlns="http://www.w3.org/1999/xhtml"
      version="XHTML+RDFa 1.0"
      xmlns:og="http://ogp.me/ns#"
      xml:lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="monitor-signature" content="monitor:player:html5" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <meta name="Keywords" content="" />
    <meta name="Description" content="empty" />
    <meta name="Generator" content="Flip PDF Professional 2.4.9.32 at http://www.flipbuilder.com" />
    <link rel="image_src" href="shot.png" />
    <link rel="shortcut icon" href="files/thumb/1.jpg" />
    <link rel="apple-touch-icon" href="files/thumb/1.jpg" />

    <meta property="og:image" content="shot.png" />
    <meta property="og:title" content=""/>
    <meta property="og:description" content="empty" />
    <title></title>

    <link rel="stylesheet" type="text/css" href="mobile/style/style.css" />
    <link rel="stylesheet" type="text/css" href="mobile/style/player.css" />
    <link rel="stylesheet" type="text/css" href="mobile/style/phoneTemplate.css" />
    <link rel="stylesheet" type="text/css" href="mobile/style/template.css" />
    <script type="text/javascript" src="mobile/javascript/jquery-1.9.1.min.js"></script>

    <script type="text/javascript" src="mobile/javascript/config.js"></script>


    <script type="text/javascript">


        var sendvisitinfo = function(type,page){};

    </script>
</head>
<body>
<script type="text/javascript" src="mobile/javascript/bookmark_config.js"></script>
<script type="text/javascript" src="mobile/javascript/LoadingJS.js"></script>

<script type="text/javascript" src="mobile/javascript/main.js"></script>


<script type="text/javascript"></script>
<noscript><div><hr/><ul><li><a href="files/basic-html/index.html">Pages</a></li></ul><hr style="width:80%"/></div></noscript>
</body>
</html>


<?php } ?>