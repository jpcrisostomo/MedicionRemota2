// LINODE    "http://45.33.35.67/mediciones/"
// Local PC "http://localhost/mediciones/"
// let URL_Local_Get_Mediciones = "http://localhost/mediciones/";
// let URL_Linode = "http://45.33.35.67/mediciones/";

async function getMediciones() {
  let URL_Mediciones = "http://45.33.35.67/mediciones/";  

  try {
      const res = await fetch(URL_Mediciones); 
      const datillos = await res.json();
      const { ecg, tmp, oxi, resp, fcard, btn1, btn2, btn3, btn4  } = datillos;
      //Cargar datos ECG a chart js

      passECG(ecg); 

      document.getElementById('temperatura').textContent = 36.5;
      document.getElementById('oxigenacion').textContent = 91;
      document.getElementById('f_respiratoria').textContent = 10.1;
      document.getElementById('f_cardiaca').textContent = 72;
        document.getElementById('b1').textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        document.getElementById('b2').textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        document.getElementById('b3').textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        document.getElementById('b4').textContent = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  } catch (error) {  
      console.log(error);
  }
}

/* Funcion que controla que tan rapido se llama a pedir datos desde server
*/
setInterval(getMediciones,1000);

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

/* ACA EDITAR ,TOMMY, por cada 1 get mediciones se tiene que hacer un loop que recorra cada
// entrada del vector (json) y meta a addData cada contenido de "ecg" */
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
