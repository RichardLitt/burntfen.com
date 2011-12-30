<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php 
header("Content-Type: text/html; charset=utf-8");
if(isset($header_meta)) { 
		foreach($header_meta as $name=>$content) { 
			echo "<meta name=\"$name\" content=\"$content\" />\n"; 
		}
	}
	?>
	<html>
	<head>
	<title><?=$title?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel=stylesheet href="../marshworm.css" type="text/css">
	</head>
<body>
