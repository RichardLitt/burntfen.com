mode = 0

 function do_switch () {
   if (mode == 0) {
     switch_inktank ()	
  } else if (mode == 1) {
     switch_astoria ()
  } else if (mode == 2) {
     switch_green ()	
   }
   mode = (mode + 1) % 3;
 }

 function switch_inktank () {
   document.photo.src = 'images/inktank.png'	
   egg = document.getElementById ("egg")
   egg.innerHTML = "But I am not really a sketch."
 }

 function switch_astoria () {
   document.photo.src = 'images/astoria.jpeg'	
   egg = document.getElementById ("egg")
   egg.innerHTML = "See?"
 }

 function switch_green () {
   document.photo.src = 'images/green.jpg'	
   egg = document.getElementById ("egg")
   egg.innerHTML = "I am him, too."
 }

