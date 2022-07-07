// LINODE    "http://45.33.35.67/mediciones/"
// Local PC "http://localhost/mediciones/"
// let URL_Local_Get_Mediciones = "http://localhost/mediciones/";
// let URL_Linode = "http://45.33.35.67/mediciones/";

async function getMediciones() {
  let URL_Mediciones = "http://45.33.35.67/mediciones/";  

  try {
      const res = await fetch(URL_Mediciones); 
      const datillos = await res.json();
      const { ecg, tmp, oxi, resp, fcard } = datillos;
      //Cargar datos ECG a chart js
      passECG(ecg); 

      document.getElementById('temperatura').textContent = tmp;
      document.getElementById('oxigenacion').textContent = oxi;
      document.getElementById('f_respiratoria').textContent = resp;
      document.getElementById('f_cardiaca').textContent = fcard;
    if(btn1=="1"||btn1==1){
        document.getElementById('b1').textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      }
      if(btn1=="2"||btn1==2){
        document.getElementById('b2').textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      }
      if(btn1=="3"||btn1==3){
        document.getElementById('b3').textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      }
      if(btn1=="4"||btn1==4){
        document.getElementById('b4').textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      }
  } catch (error) {  
      console.log(error);
  }
}

setInterval(getMediciones,250);

function init() {
dataPlot = new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      data: [],
      label: "Actividad eléctrica (ECG)",
      borderColor: "#3e95cd",
      fill: true
    }]
  }
});
}

var dataPlot;
var maxDataPoints = 140;

function passECG(ecg) {
  console.log(ecg);
  var today = new Date();
  var t = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  addData(t, ecg);
}



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