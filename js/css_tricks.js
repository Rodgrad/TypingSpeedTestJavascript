var statCols = document.getElementsByClassName('col-stats');
var statDescription = document.getElementsByClassName('description');


function Listener(col, des){

    col.addEventListener('mouseover', function(){

       des.style = 'width:200px;  height:25px; transition-duration: 0.2s;     border:9bb5fd 2px solid;'
   });
   col.addEventListener('mouseout', function(){
       des.style = 'width:0px; height:0px; transition-duration: 0.2s; border:none;';
   });
}

for(var i=0; i<statCols.length; i++){
Listener(statCols[i], statDescription[i]);
}