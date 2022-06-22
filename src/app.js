
var dataPlot;
var maxDataPoints = 140;

function removeData(){
  dataPlot.data.labels.shift();
  dataPlot.data.datasets[0].data.shift();
}
function addData(label, data) {
  if(dataPlot.data.labels.length > maxDataPoints) removeData();
  dataPlot.data.labels.push(label);
  dataPlot.data.datasets[0].data.push(data);
  dataPlot.update();
}
/*
function init() {
  let sse = new EventSource('http://localhost/stream');

  dataPlot = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        data: [],
        label: "Medicion (Unidad)",
        borderColor: "#3e95cd",
        fill: true
      }]
    }
  });

  sse.onmessage = function(event) {
    var data = JSON.parse(event.data);
    console.log(data)
    var today = new Date();
    var t = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    addData(t, data.value);
  }
}
*/
/*
function sendDataRate(){
  var dataRate = document.getElementById("dataRateSlider").value;
  webSocket.send(dataRate);
  dataRate = 10 -1.0/dataRate;
  document.getElementById("dataRateLabel").innerHTML = "Rate: " + dataRate.toFixed(2) + "Hz";
}
*/

document.getElementById("tmp").innerHTML= "Temperatura actual:" + data;
