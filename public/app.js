// LINODE    "http://45.33.35.67/mediciones/"
// Local PC "http://localhost/mediciones/"
// let URL_Local_Get_Mediciones = "http://localhost/mediciones/";
// let URL_Linode = "http://45.33.35.67/mediciones/";

async function getMediciones() {
  let URL_Mediciones = "http://localhost/mediciones/";  
  
  try {
      const res = await fetch(URL_Mediciones); 
      const datillos = await res.json();
      const { ecg1,ecg2,ecg3,ecg4,ecg5,ecg6,ecg7,ecg8,ecg9,ecg10,ecg11,ecg12,ecg13,ecg14,ecg15,ecg17,ecg18,ecg19,ecg20, tmp, oxi, resp, fcard, btn1, btn2, btn3, btn4  } = datillos;
      //Cargar datos ECG a chart js
      ECGs = [ecg1,ecg2,ecg3,ecg4,ecg5,ecg6,ecg7,ecg8,ecg9,ecg10,ecg11,ecg12,ecg13,ecg14,ecg15,ecg17,ecg18,ecg19,ecg20]; 
      const d = new Date();

      document.getElementById('temperatura').textContent = tmp;
      document.getElementById('oxigenacion').textContent = oxi;
      document.getElementById('f_respiratoria').textContent = resp;
      document.getElementById('f_cardiaca').textContent = fcard;
      if(btn1=="1"||btn1==1){
        document.getElementById('b1').textContent = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      }
    if(btn2=="1"||btn2==1){
        document.getElementById('b2').textContent = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      }
    if(btn3=="1"||btn3==1){
        document.getElementById('b3').textContent = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      }
    if(btn4=="1"||btn4==1){
        document.getElementById('b4').textContent = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      }
  } catch (error) {  
      console.log(error);
  }
}

setInterval(getMediciones,1000);
setInterval(actualizeECGindex,55);

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



var ECGs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; 
var dataPlot;
var maxDataPoints = 140;
var ECG_index=0;

function actualizeECGindex()
{
  passECG(ECGs[ECG_index]);
  ECG_index ++;
  if (ECG_index ==20){
    ECG_index=0;
  }
}

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
