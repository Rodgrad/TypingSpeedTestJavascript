<!DOCTYPE html>
<html>
<!--  <link type="text/css" id="light-mode" rel="stylesheet" href="css/dark_simple.css"> 
 !-->
 <link type="text/css" id="light-mode" rel="stylesheet" href="css/base.css">  
<link href="https://fonts.googleapis.com/css2?family=Antic+Slab&display=swap" rel="stylesheet"> 
<link href="https://fonts.googleapis.com/css2?family=MuseoModerno:wght@900&display=swap" rel="stylesheet"> 
<link href="https://fonts.googleapis.com/css2?family=Kumar+One+Outline&display=swap" rel="stylesheet"> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" integrity="sha512-s+xg36jbIujB2S2VKfpGmlC3T5V2TF3lY48DX7u2r9XzGzgPsa6wTpOQA7J9iffvdeBN0q9tKzRxVxw1JviZPg==" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@beta/dist/js.cookie.min.js"></script>


<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-175591371-1"></script>
    <title>Typing Speed Test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name='description' content="Typing test app for testing your typing speed and to improve your typing speed by practice. Typing every day will make you 
    better at speed typing.Typing fast is important skill to many job positions."/>
    <meta property="og:image" content="https://keyboardtypingtest.com/css/preview09.png"/>
    <meta property="og:url" content="https://keyboardtypingtest.com/" />
    <meta property="og:image:width" content="300" />
    <meta property="og:image:height" content="300" />
    <meta property="og:type" content="png" />
    <meta property="og:title" content="KeyboardPro-Typing Speed Test" />
    <meta property="og:description" content="Free app to test your typing speed, and to improve your skills with keyboard." />
    <meta property="og:title" content="KeyboardPro-Typing Speed Test"/>
    <meta name="og:description" content="Free app to test your typing speed, and to improve your skills with keyboard."/>
</head>



<body>


<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=1228813847242354&autoLogAppEvents=1" nonce="KJF1Mrgl"></script>

    <div id='wrapper'>
        <div id='wrapper-stats'>
           <header id='header'>
               <h1 id='title'>Keyboard Typing Test</h1>
               <p>What is your typing speed? Test your skills right now.</p>
           </header>
           <div class='col-stats'>
               <p class='stats-title'>WPM</p>
               <p class='description'>Words per minute.</p>
               <div id='wpm'><p>0</p></div>
           </div>
           <div class='col-stats'>
           <p class='description'>Characters per minute.</p>
               <p class='stats-title'>CPM</p>
               <div id='cpm'><p>0</p></div>
           </div>
           <div class='col-stats'>
               <p class='stats-title'>WPM Accuracy</p>
               <p class='description'>Words per minute accuracy.</p>
               <div id='wpm-accuracy-stats'><p>0.00%</p></div>

           </div>
           
           <div class='col-stats'>
           <p class='description'>Characters per minute accuracy.</p>
               <p class='stats-title'>CPM Accuracy</p>               
               <div id='cpm-accuracy-stats'><p>0.00%</p></div>
           </div>

           <div class='col-stats'>
               <p class='stats-title'>TIME</p>
               <p class='description'>Test will last 60 seconds.</p>
               <div id='time'><p>60s</p></div>
           </div>
        </div>


        <div id='publish'>
        
            <div id='publish-stats'>
                <br>
                <br>
                <div id='publish-msg'></div>
                <div id='restart'><button  id='restart-btn'>Try again
                </div>
            </div>
        </div>
        
        <div id="editor-section">
            <p id='editor-msg'>Press Space to submit.</p>
            <div id='editor-box' class='col-editor'><div id='editor'></div></div>
            <div id='cursor-box' class='col-editor'><div id='cursor'> </div></div>
            <div id='next-box' class='col-editor'><div id='next'></div></div>
            <div class="fb-share-button" data-href="https://keyboardtypingtest.com" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fkeyboardtypingtest.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>

        </div>


        <div id='info-section'>
            
        <h2>How others have performed -  graphed in percentage</h2>
        <div id='chart'>
                <canvas id="scoresChart" width="600px" height="200px"></canvas>
        </div>

            <h2>All good reasons to boost your typing speed</h2>
            <div class='col-info'><h3>Productivity</h3>           
               <p>Think how much of
 a work hours you spend typing every day, what if you could cut that by half?
Speed typing skills will make it possible for you to finish tasks more quickly.
 Have some extra time for yourself..</p>
            </div>
    
            <div class='col-info'><h3>Energy</h3>           
               <p>Stop looking at letters, 
 your neck is under stress.
At the end of the day are you dead tired? 
 We can bet all the looking down to the keyboard and correcting errors have taken some of your energy. 
 Stop doing extra work right now. Because you totally can
 with little practice.
                </p>
            </div>
    
            <div class='col-info'><h3>Impressive</h3>  
            <p>No matter what anyone says, 
 fast typing speed is still an impressive skill to possess and necessary for some job positions.
Nobody desire to look like it is his first time with a computer. And why would you, when you have everything you need to learn fast typing here.</p>
            </div>
    
            <div class='col-info'><h3>Everything</h3>  
                <p>If nothing rings a bell for you so far, we can bet you can find your reasons to increase your typing speed. 
 If anything, typing is fun.</p>
            </div>
            <br>
            <br>
            <br>
            <h2>Typing speed, how does it get calculated?</h2>
            <div class='col-info'><h3>WPM</h3>           
               <p>WPM stands for words per minute. It is the total number of words you have typed correctly in the frame of sixty seconds.
It's calculated by dividing all correct character submissions sum with 5 over one minute. So in the sentence "This is mine." you will have two words. </p>
            </div>
            
            <div class='col-info'><h3>CPM</h3>           
               <p>CPM represents typed characters per minute, including errors.
Every time you press a key of letter, numeral, or Space it will create an increment of one.</p>
            </div>
    
            <div class='col-info'><h3>WPM Accuracy</h3>  
            <p>Represents how accurate are your word submissions. 
 Every time you submit a word, you will add one entry.
And from that data, we calculate how accurate your submissions were depending on the correct and incorrect submission ratio.</p>
            </div>
    
            <div class='col-info'><h3>CPM Accuracy</h3>  
            <p>Represents how accurate are your character entries. Every time you press a key, you submit one entry.
And from that data, we calculate how accurate your submissions were depending on correct and incorrect characters.</p>
            </div>
            
            <div id='announcement'>
                <h2>New features coming soon</h2>
                <ul>
                    <li>Feature 01: System to collect score data,  to  represent more accurate typing speed graph.</li>
                    <li>Feature 02: Dark neon theme.</li>
                </ul>
            </div>
            
            
        </div>




        


        <div id='about'>
            <h2>About</h2>
            <div class=col-about>
                <h3>What is this app?</h3>
                <p>Keyboard Typing Test is a free app 
 designed to test your typing speed,
 and to improve your skills with the keyboard.
 Have fun typing. </p>
            </div>
            <div class=col-about>
                <h3>Moto</h3>
                <p>Practice, practice, practice.</p>
            </div>
        
            <div class=col-about>
                <h3>Team</h3>
                <p>Luka Beslic,  developer. <br> For any questions, please contact me on <br>
                   devluka.public@gmail.com</p>
            </div>
        
        
        </div>
    </div>



    <div id="privacy-policy">
        <p>Site is using cookies. Accept cookies and privacy policy to get better user experience and unlock all features.</p>

        <button id='hide-gdpr-btn'>Hide Privacy Policy</button>
        <div id='privacy-text'> 
            Privacy policy did not load - you will be unable to use some features of the site if you do not accept it. Please reload page.
        </div>
        <button id='show-gdpr-btn'>Show Privacy Policy</button>
        <br>
        <br>

        <input  type="checkbox" name="read-privacy" id="privacy-checkbox" value='false'><span style=' padding: 2px; background:rgba(255, 203, 0, 0.38);'>I have read and accept privacy terms above.</span>
        <button id='accept-privacy' type='button'>Accept</button> 
        <button id='decline-privacy' type='button'>Decline</button>

    </div>

<script type="text/javascript" src="js/score_graph.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/privacy_cookies.js"></script>
<script type="text/javascript" src="js/css_tricks.js"></script>


</body>
</html>
