var scorePosition = [0, 0, 0, 0, 0, 0, 0, 0];

function ajaxifyDB(method, score){
    var xhttp = new XMLHttpRequest();
    var data = 'score='+score;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          scorePosition = JSON.parse(this.responseText);
      }
    };
    xhttp.open(method, "/board/php/crud_db.php", false);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
    console.log(scorePosition);
}


function resolveData(){

    ajaxifyDB("GET", 0);
    var ranges = new Array(
        [0,29], [30,59], [60,89], [90,119], [120,149], 
        [150,179],[180,209], [210,240]);

    var db_data = new Array(0, 0, 0, 0, 0, 0, 0, 0);


    for(var i=0; i<scorePosition.length; i++){
        scorePosition[i] =  parseInt(scorePosition[i]);
    }
    for(var i=0; i<scorePosition.length; i++){
        for (var x=0; x<db_data.length; x++){
            if (scorePosition[i] >= ranges[x][0] && scorePosition[i] <= ranges[x][1]){
                db_data[x] = db_data[x]+1
            }
        }
    }
    var koef = (db_data.reduce((x, y) => x + y)) / 100;
    var results = new Array();
    for(var i=0; i<db_data.length; i++){
        results[i] = (db_data[i] / koef).toFixed(2);
    }
    return results;
}


function scoreGraphCHART(){

    var results = resolveData();
    var ctx = document.getElementById('scoresChart').getContext('2d');
    
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:['0-29', '30-59', '60-89', '90-119', '120-149', '150-179', '180-209', '210-240'],
    
            datasets:[{
                label: "WPM - Words per minute graphed in percent",
    
                data:[results[0], results[1], results[2], results[3],
                      results[4], results[5], results[6], results[7]],

                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: true,
                labels: {
    
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
    
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    Chart.defaults.global.defaultFontColor = "black";
}


