mode = 0

 function do_switch () {
   if (mode == 0) {
     switch_inktank ()	
  } else if (mode == 1) {
     switch_green ()
  } else if (mode == 2) {
     switch_parrot ()
   }
   mode = (mode + 1) % 3;
 }

 function switch_inktank () {
   document.photo.src = 'images/inktank.png'	
   egg = document.getElementById ("egg")
   egg.innerHTML = "But I am not really a sketch."
 }

 function switch_green () {
   document.photo.src = 'images/green.jpg'	
   egg = document.getElementById ("egg")
   egg.innerHTML = "I am really this guy."
 }

 function switch_parrot () {
   document.photo.src = 'images/parrot.jpg'	
   egg = document.getElementById ("egg")
   egg.innerHTML = "PARROT TIME."
 }

