<?php 
header("Content-Type: text/html; charset=utf-8");
if(isset($header_meta)) { 
		foreach($header_meta as $name=>$content) { 
			echo "<meta name=\"$name\" content=\"$content\" />\n"; 
		}
	}
	?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html>
	<head>
</script>
	<title><?=$title?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="/style/main.css">
	<link rel="stylesheet" type="text/css" href="/style/back3.css" title="Forest" />
	<link rel="alternate stylesheet" type="text/css" href="/style/back.css" title="Ship" />
	<link rel="alternate stylesheet" type="text/css" href="/style/back2.css" title="Marsh" />
	<link rel="alternate stylesheet" type="text/css" href="/style/back4.css" title="Me" />
	<script type="text/javascript" src="/style/styleswitcher.js"></script>  
	<script type="text/javascript" src="/style/jquery.js"></script>
    <script type="text/javascript" src="/style/tooltip.js"></script>
    <!--script type="text/javascript" src="/inc/line.js"></script -->
	<style>
	.random {
    position:relative;
    padding:40px;
 }
	</style>
<script>

function init(){

   w=document.body.offsetWidth;
   h=document.body.offsetHeight;
   rd=document.getElementsByTagName('div');

for(c=0;c<rd.length;c++) {
if(rd[c].className=='random') {
   xCoord=Math.floor(Math.random()*w);

if(xCoord>=w-rd[c].offsetWidth-10){
   xCoord=w-rd[c].offsetWidth-10;
 }
if(xCoord<=10){
   xCoord=10;
 }

   rd[c].style.left=xCoord+'px';
   }
  }
 }
   window.addEventListener?
   window.addEventListener('load',init,false):
   window.attachEvent('onload', init);
</script>
	</head>
<body>

			<!-- End Header --><!-- End Header -->
			