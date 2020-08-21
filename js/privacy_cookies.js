var privacyText;
var google;


//Check cookie
if(checkCookie()){
  googleAnalyticsEnabled();
  document.getElementById('privacy-text').innerHTML = '';
  document.getElementById('privacy-policy').style = 'display:none;';
}else if(checkCookie() == false){
  document.getElementById('privacy-text').innerHTML = '';
  document.getElementById('privacy-policy').style = 'display:none;';
}else if(checkCookie == null){
  document.getElementById('privacy-policy').style = 'display:block;';
  document.getElementById('privacy-text').innerHTML  = privacyText;
  privacy_policy();
}



// LISTENERS
document.getElementById('show-gdpr-btn').addEventListener('click', function(){
    privacy_policy();
    document.getElementById('privacy-text').innerHTML  = privacyText;

    document.getElementById('privacy-text').style = 'display:block;';
    document.getElementById('hide-gdpr-btn').style = 'display:block;';
});

document.getElementById('hide-gdpr-btn').addEventListener('click', function(){
    document.getElementById('privacy-text').style = 'display:none;';
    document.getElementById('hide-gdpr-btn').style = 'display:none;';
});

document.getElementById('accept-privacy').addEventListener('click', function(){

    if (document.getElementById('privacy-checkbox').checked){
        document.getElementById('privacy-text').innerHTML = '';
        document.getElementById('privacy-policy').style = 'display:none;';
        setCookie('accepted');
        if(checkCookie()){
            document.getElementById('privacy-text').innerHTML = '';
            document.getElementById('privacy-policy').style = 'display:none;';
       googleAnalyticsEnabled();

        }
    }else{
        alert('You must click on checkbox first.');
    }
});
document.getElementById('decline-privacy').addEventListener('click', function(){
    document.getElementById('privacy-text').innerHTML = '';
    document.getElementById('privacy-policy').style = 'display:none;';
    setCookie('refused');

    //cookie false none
});


//Prepare policy window
function privacy_policy(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          privacyText = this.responseText;
      }
  };
  xhttp.open("GET", 'gdpr.html', false);
  xhttp.send();
}



//COOKIE CRUD
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  

function checkCookie() {
    var status = getCookie("privacy-policy");
    if (status == "accepted") {
     return true;
    }else if(status =='refused'){
      return false;
    }else{
        return null;
    }
  }


  function setCookie(status){
    var date = new Date();
    if(status == "accepted"){
        date.setTime(date.getTime() + (365*24*60*60*1000));
    }else{
        date.setTime(date.getTime()+(1*24*60*60*1000));
    }
    var expires =  "expires" + date.toUTCString();
    document.cookie = "privacy-policy=" + status + ";" + expires + "; path=/"; 
}



//Enable GA if cookie true
  function googleAnalyticsEnabled(){
    document.getElementById('privacy-text').innerHTML = '';
    document.getElementById('privacy-policy').style = 'display:none;';
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'USER_ID_HERE');
      
  }