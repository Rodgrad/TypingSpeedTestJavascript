/*
System keys for exclusion
*/
var sysKeys = new Array(17, 32, 13, 18, 16, 20, 37, 38, 39, 40);
var sysAllKeys = new Array(17, 8, 18, 16, 20, 37, 38, 39, 40,191,190,188, 59, 222, 219, 221);

/*
Holds text from file
*/
var textFile = new Array();
/*
Globals used for logic
*/
var wordIndex = 0;                               // Track word index                   
var letterIndex = 0;                             // Track letter index
var firstError = false;                          // Holds error bool
var errorCounterLetter = 0;                      // Track letter errors after first error
var cpmPoints =  0;                              // Track character pressed
var cpmErrors = 0;                               // Track character pressed wrong errors
var wpmPoints = 0;                               // Word submited  -valid
var wpmErrors = 0;                               // Word submited  -invalid
var currentWord = '';                            // Used to hold word to be written
var backtrackWord = '';                          // Holds character values submited for [currentWord]
var restartBool = true;                          // Used to disable/enable character counter, timer




class Main{

    
    /*
    Takes care ONLOAD START call to set app
    */

    startRound(){
        restartBool = true;
        set.setCursorBlinker();
        set.setNewRound();

    }


    stopRound(){

        this.collectStats();
        set.setStatsStyle('col-stats', 'white', 'black');
        set.setStatsStyle('stats-title', 'none', 'black');

        restartBool = false;
        document.getElementById('publish').style = "display:block;";

    }
    

    /*
    Called from [stopRound] to collect stats and create publish message to user
    */
    collectStats(){

        var wpm =  progress.calculateWpmAccuracy();
        // wpm[1]_ is percentage , wpm [0] is number count
        var msg;
        if(wpm[1] < 50 || wpm[0] < 25) {
            msg = "You could do better. Practice every day for 20 minutes to achieve better results. ";
        }else if(wpm[1] < 70 && wpm[1] >= 50 || wpm[0] < 60 && wpm[0] >= 25){
            msg = "You are doing pretty well. With little practice, you could improve to professional.";
        }
        else if(wpm[1] < 80 && wpm[1] >= 70 || wpm[0] < 80 && wpm[0] >= 60){
            msg = "You are crushing it. You are becoming a true legend. Impressive!";
        }
        else if(wpm[1] > 70 &&  wpm[0] >= 80){
            msg = "You are top of the class, a true professional. You can do anything.";
        }
        if (wpm[0] > 10){
            ajaxifyDB('POST', wpm[0]);
        }
        set.setResultMsg(msg);
   
    }

}



class Setter{

    /*
    Setter class 
    */

    
    setNewRound(){

        if(textFile.length < 2){get.getText('words.txt');}


        this.setStatsStyle('col-stats', 'none', '#717a9b)');
        set.setStatsStyle('stats-title', 'none', '#717a9b');

        this.setNullGlobals();
        get.getRandomized();
        var getData = get.getTraverse(textFile, wordIndex);
        set.setTraverse(getData[0], getData[1]);
        document.getElementById('publish').style = "display:none;";
        document.getElementById('editor').innerHTML = "";
        document.getElementById('editor').innerHTML.trim();
        document.getElementById('editor').style= "color:black;";
        scoreGraphCHART();



    }

    // set new word
    setTraverse(word, words){

            document.getElementById('next').innerHTML = "<span id='current'>"+ word +"</span>" +  words.join(' ').trim() ;
    
        }
    
    // reset values to null or equivalent
    setNullGlobals(){
        restartBool = true;
        wordIndex = 0; 
        letterIndex = 0; 
        cpmPoints =  0;
        cpmErrors = 0;
        wpmPoints = 0;
        wpmErrors = 0;
        currentWord = ''; 
        backtrackWord = '';
        firstError = false;
        document.getElementById('wpm').innerHTML="<p>" + 0 + " </p>";
        document.getElementById('cpm').innerHTML="<p>" + 0 + " </p>";
        document.getElementById('wpm-accuracy-stats').innerHTML="<p>" + '0.00' + "%</p>";
        document.getElementById('cpm-accuracy-stats').innerHTML="<p>" + '0.00' + "%</p>";
        document.getElementById('time').innerHTML="<p>" + 60 + "s</p>";

    }

    // Cursor blink, text write guide
    setCursorBlinker(){

        var state;
        setInterval(function(){
            if(state == 1){
                document.getElementById('cursor').style = 'display:block';
                state=0;
            }else{
                document.getElementById('cursor').style = 'display:none';
                state=1;
            }
        }, 1000);
    }

    // Publish selected message from Main[collectStats]
    setResultMsg(msg){
        var index = 0;
        var word = '';
        let a = setInterval(function(){
            word = word + msg[index];
            document.getElementById('publish-msg').innerHTML = word;
            index++;
            if(index == msg.length || restartBool == true){
                document.getElementById('publish-msg').style = "    text-decoration: underline";

                clearInterval(a);
            }
        }, 30);
    }

    setStatsStyle(element, property1, property2){

        let elem = document.getElementsByClassName(element);
        for(var i=0; i<elem.length; i++){
            elem[i].style = "background:" + property1 + "; transition-duration:1s; color:" + property2 +  "; ";
        }
    }
}



class Getter{

    /*
    Get any data necessary 
    */

    // Awaits for user event 
    getInput(){

        if (!restartBool){return false;}

        if(!sysAllKeys.includes(event.keyCode)){
            ++cpmPoints;
        }
        if (cpmPoints == 1){
            timer.start_time();    
        }
        var getWord = get.getTraverse(textFile, wordIndex);

        // Word submit event
        if (event.keyCode == 32 || event.keyCode == 13 ){
            event.preventDefault();
            progress.validateWord(backtrackWord, getWord[0]);
            progress.calculateWpmAccuracy();

            wordIndex++;        
            getWord = get.getTraverse(textFile, wordIndex);
            set.setTraverse(getWord[0], getWord[1]);
            backtrackWord = '';
            currentWord = '';
            letterIndex = 0;
            errorCounterLetter = 0;
            document.getElementById('editor').innerHTML = "";
            firstError = false;


        }

        // Leter submit event
        if (!sysKeys.includes(event.keyCode)){
            var letter = String.fromCharCode(event.keyCode).toLowerCase();
            event.preventDefault();
            progress.validateLetter(getWord[0], letter);
        }

        if (cpmPoints > 0){
            progress.calculateCpmAccuracy();
            document.getElementById('cpm').innerHTML="<p>" + cpmPoints + "</p>"
        }
    }

    // GET next word
    getTraverse(file, index){

        var word = file[index].trim();
        file = file.slice(index+1, file.length);
        return [word , file];
    }

    // Randomize words for new round
    getRandomized(){

        var j, x, i;
        for (i = textFile.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1)) ;
            x = textFile[i].toLowerCase();
            textFile[i] =   textFile[j] ;
            textFile[j] = x;
        }


    }

    // Get words from file , this is intended to be called only once, but if [textFile] is empty it will call again from SETTER
    getText(file){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                textFile  =  this.responseText.split("\n");
            }
        };
        xhttp.open("GET", file, false);
        xhttp.send();
    }

}



class Progression{

    /*
    Validate user inputs and outputs result 
    */


    validateLetter(word, letter){
        // IF Backspace
        if(event.keyCode == 8){
            
            if(errorCounterLetter > 0 ){
                 errorCounterLetter--;
            }
            if(letterIndex > 0){
                letterIndex--;
            }
            if(errorCounterLetter <= 0 && word[letterIndex] == backtrackWord[letterIndex]){
                currentWord = backtrackWord[letterIndex] + currentWord;
                firstError = false;
            }
            backtrackWord = backtrackWord.slice(0, letterIndex);
            if(backtrackWord.length < 1 || backtrackWord == word.slice(0, letterIndex) && letterIndex >=0 ){
                firstError = false;
                document.getElementById('editor').style= "color:black;";
            }
            if(currentWord==''){
                currentWord=word;
            }

            document.getElementById('current').innerHTML = currentWord;
          
        }// Letter character entry
        // IF correct letter
        else if(!sysAllKeys.includes(event.keyCode)){
            if(word[letterIndex] == letter && !firstError){
                backtrackWord = backtrackWord + letter;
                currentWord  = word.substring(letterIndex+1);
                letterIndex++;
                
                document.getElementById('current').innerHTML = currentWord;
                document.getElementById('editor').style= "color:black;";


            }
            // IF uncorrect letter
            else{
                cpmErrors++;
                letterIndex++;
                backtrackWord = backtrackWord + letter;
                document.getElementById('editor').style= "color:red;";
                firstError = true;
                errorCounterLetter++;
            }
        }

        document.getElementById('editor').innerHTML = backtrackWord;
    }

    calculateCpmAccuracy(){

        var result = (100 - ((cpmErrors / (cpmPoints))  * 100)).toFixed(2);   // we do not need to add cpmPoints + cpmErrors because it cpmPoints alread contain errors
        document.getElementById('cpm-accuracy-stats').innerHTML = "<p>" +  result  + "%</p>";
        return result;
    
    }


    validateWord(input, word){

            //case empty submision, count whole current word
            if(backtrackWord.length < 1){
                ++cpmPoints;
                ++cpmErrors;
            }

            if (input == textFile[wordIndex]){
                wpmPoints = wpmPoints + input.length ;

            }else{
                wpmErrors = wpmErrors + textFile[wordIndex].length ;
                --cpmPoints; // noramlize space as wrong step
            }
            

        
    }

    calculateWpmAccuracy(){

        var result1 = Math.round( wpmPoints / 5 );
        document.getElementById('wpm').innerHTML = "<p>" + result1 +"</p>";
        if (wpmPoints < 1 || wpmPoints < 1 ){
            ++wpmErrors;
        }
        var result2 = (100 - (( wpmErrors / ( wpmPoints + wpmErrors))   * 100)).toFixed(2); 
        document.getElementById("wpm-accuracy-stats").innerHTML = "<p>" + result2 + "%</p>";
        return [result1, result2];
    }



}


class Timer{

    start_time(){
        var seconds = 60;
        var timer = setInterval(function(){    
            if (seconds == 0){
                clearInterval(timer);
                main.stopRound();
            }
            document.getElementById('time').innerHTML = "<p>" + (seconds--) + "s</p>";}, 1000);  
     }
}





const get = new Getter();
const set = new Setter();
const main = new Main();
const progress = new Progression();
const timer = new Timer();
window.onload = main.startRound(), document.hasFocus(), scoreGraphCHART();


// User input event handler
document.addEventListener('keydown', event => {
    get.getInput(event);


});


document.getElementById('restart-btn').addEventListener('click', event => {
    set.setNewRound();

});

