
async function getMediciones() {
  let URL_Local_Get_Mediciones = "http://localhost/mediciones/";
  try {
      const res = await fetch(URL_Local_Get_Mediciones); 
      const datillos = await res.json();
      const { ecg, tmp, oxi, resp, fcard } = datillos;
      //Cargar datos ECG a chart js
      passECG(ecg); 

      document.getElementById('temperatura').textContent = tmp;
      document.getElementById('oxigenacion').textContent = oxi;
      document.getElementById('f_respiratoria').textContent = resp;
      document.getElementById('f_cardiaca').textContent = fcard;
  } catch (error) {  
      console.log(error);
  }
}

setInterval(getMediciones,100);

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