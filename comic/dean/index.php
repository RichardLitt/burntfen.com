<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
 <head>
  <title>1ndex 0f /</title>
  <META NAME = "keywords" CONTENT= "deanoemcke, dean oemcke, oemcke, experiential, experiential radio, proxificationator, timelapse">
  <META NAME = "description" CONTENT= "DONT CLICK ON ME!<p>No results! No results!">

  <link rel="shortcut icon" href="./favdicon.ico" type="image/x-icon" />

 </head>
 <body>
 
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29575555-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

	<h1 id="title1">1ndex 0f /</h1>

 <script type="text/javascript">

	updateTitle(0);
	
	function updateTitle(val) {
		var currentStr = document.getElementById('title1').innerHTML;
		var strA = currentStr.substring(0,1);
		var strB = currentStr.substring(6,7);
		
		//dont update strA if count is >50 and its already a 1
		if (val < 50 || strA != 1)
			strA = getNewRand(strA);
		//dont update strB if count is >50 and its already a 0
		if (val < 50 || strB != 0)
			strB = getNewRand(strB);
		
		document.getElementById('title1').innerHTML = strA + "ndex " + strB + "f /";
		val++;
		if (val < 50 || currentStr != "1ndex 0f /")
			setTimeout('updateTitle(' + val + ')', val*3);
	}

	function getNewRand(val) {
		var randomStr = Math.random().toString();
		while (randomStr.substring(2, 3) == val)
			randomStr = Math.random().toString();
		return randomStr.substring(2, 3);
	}
		
 </script>
 
	<?php
	
	$col_name = 'N';
	$col_mod = 'M';
	$col_size = 'S';
	$col_desc = 'D';
	$col_type = 'T';
	$col_href = 'H';
	
	$sort_asc = 'A';
	$sort_desc = 'D';
	
	$icon_blank = '/icons/blank.gif';
	$icon_unknown = '/icons/unknown.gif';
	$icon_text = '/icons/text.gif';
	$icon_image = '/icons/image2.gif';
	$icon_compressed = '/icons/compressed.gif';
	$icon_folder = '/icons/folder.gif';
	
    if (isset( $_GET['C'])) {
		$category = $_GET['C'];
		$order =  $_GET['O'];
    }
	else {
		$category = $col_size;
		$order = $sort_asc;
	}
	
	//organise href variables for sorting
	$sort_cols = Array($col_name=>$sort_asc, 
					   $col_mod=>$sort_asc, 
					   $col_size=>$sort_asc, 
					   $col_desc=>$sort_asc);
	if ($order == $sort_asc) {
		$sort_cols[$category] = $sort_desc;
	}
	else {
		$sort_cols[$category] = $sort_asc;
	}
	
	$dir="./"; // Directory where files are stored
	
	
	echo("<pre>");
	echo("<img src=\"$icon_blank\" alt=\"Icon \"> ");
	echo("<a href=\"?C=$col_name&O=$sort_cols[$col_name]\">Name</a>                    ");
	echo("<a href=\"?C=$col_mod&O=$sort_cols[$col_mod]\">Last modified</a>              ");
	echo("<a href=\"?C=$col_size&O=$sort_cols[$col_size]\">Size</a>  ");
	echo("<a href=\"?C=$col_desc&O=$sort_cols[$col_desc]\">Description</a>");
	echo("<hr>");
	
	if ($dir_list = opendir($dir)) {
		while(($file = readdir($dir_list)) != false) {
			//check for currrent (.) directory listing
			if ($file == ".") {
				continue;
			}
			//check for parent (..) directory listing
			if ($file == "..") {
				echo("<img src=\"/icons/back.gif\" alt=\"[DIR]\"> <a href=\"/\">Parent Directory</a>                                     -   <br>");
				continue;
			}
			
			$size = filesize($file);
			$mod = filemtime($file);
			$type = filetype($file);
			$desc = filetype($file);
			
			//if file is a directory then make sure directory does not contain a 'private' file
			if($type=="dir") {
				$private = false;
				if ($subdir_list = opendir($file)) {
					while(($subfile = readdir($subdir_list)) != false) {
						if ($subfile == "private") 
							$private = true;
						elseif ($subfile == "description") {
							$fh = fopen($file.'/'.$subfile, 'r');
							$desc = fread($fh, 100);
							fclose($fh);
						}
					}
					$size = 0;
				}
				if ($private)
					continue;
			}
			//add file entry to filesArray for listing
			$filesArray[] = Array( $col_type=>filetype($file), 
									 $col_name=>$file, 
									 $col_href=>$file, 
									 $col_mod=>$mod, 
									 $col_size=>$size, 
									 $col_desc=>$desc);
		}
		closedir($dir_list);
		
		//sorting
		$sort_col = array(); 
		foreach($filesArray as $sub) {
			$sort_col[] = $sub[$category];
		}
		if ($order == "A") {
			array_multisort($sort_col, SORT_ASC, $filesArray); 
		}
		else {
			array_multisort($sort_col, SORT_DESC, $filesArray);
		} 
		
		//display sorted filelist
		foreach($filesArray as $index=>$info) {
			writeLine($info[$col_type], $info[$col_name], $info[$col_href], $info[$col_mod], $info[$col_size], $info[$col_desc]);
		}
			
	}
	echo("</pre>");
	echo("<hr>");
	echo("<i>".$_SERVER['SERVER_SOFTWARE']."</i><br><br>");
	
	?>		
	
	<script type="text/javascript">
		var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<script type="text/javascript">
		var pageTracker = _gat._getTracker("UA-5372478-1");
		pageTracker._trackPageview();
	</script>
	
	<?php
	function writeLine($type, $href, $name, $mod, $size, $desc){
		global $icon_blank, $icon_unknown, $icon_text, $icon_image, $icon_compressed, $icon_folder;
		$type = strtolower($type);
		$src = $icon_blank;
		$alt = "Icon ";
		$dateStr = date("d-M-Y", $mod);
		$timeStr = date("G:i:s", $mod);
		$unit = " ";
		if ($size >= 1024) {
			$size = $size / 1024;
			$unit = "K";
		}
		if ($size >= 1024) {
			$size = $size / 1024;
			$unit = "M";
		}
		if ($size >= 1024) {
			$size = $size / 1024;
			$unit = "G";
		}
		$size = number_format($size, 0, '.', '');
		if ($type=="dir") {
			$src = $icon_folder; 
			$alt = "[DIR]";
			$size = "-";
			$unit = " ";
		}
		else {
			$type = substr($name, strlen($name)-3);
			if ($type=="txt") {
				$src = $icon_text; 
				$alt = "[TXT]";
			}
			elseif ($type=="zip") {
				$src = $icon_compressed; 
				$alt = "[TXT]";
			}
			elseif ($type=="jpg" || $type=="gif" || $type=="png" || $type=="bmp" || $type=="tif" || $type=="ico") {
				$src = $icon_image; 
				$alt = "[TXT]";
			}
			else {
				$src = $icon_unknown; 
				$alt = "[   ]";
			}
		}
		echo "<img src=\"$src\" alt=\"$alt\"> <a href=\"$href\">" . cropText($name, 25) . "</a>" . spaceText($name, 25) .
				$dateStr . spaceText($timeStr, 9) . $timeStr . spaceText($size, 10) . $size . $unit . "  " . $desc . "<br/>";
	}
	
	function cropText($text, $max) {
		if (strlen($text) > $max) $text = substr($text, 0, $max);
		return $text;
	}
	
	function spaceText($text, $max) {
		$spacer = "";
		$pos = strlen($text);
		while ($pos < $max) {
			$spacer = $spacer . " ";
			$pos++;
		}
		return $spacer;
	}
	?>
	

	
</body>
</html>
