function init(){

   w=document.body.offsetWidth;
   h=document.body.offsetHeight;
   rd=document.getElementsByTagName('div');

for(c=0;c<rd.length;c++) {
if(rd[c].className=='random menu') {
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