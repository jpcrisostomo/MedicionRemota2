/* Javascript based on Express */

const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors'); //Uso middleware rutas
//const ejs = require('ejs');
const fetch = require('node-fetch');
//app.set('views', path.join(__dirname, 'views')); //Para get home
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny')); //Middleware console logs 'tiny'
app.use(express.static('public'));
//app.set('view engine', 'ejs');


var mediciones= {ecg: "350.50",
tmp: "149.00",
oxi: "496.50",
resp: "764.50",
fcard: "571.00"} //Var inicial


app.post('/', (req, res) => {
  console.log(req.body);
  mediciones = req.body;
  res.end();
});

app.get("/mediciones", async (req, res) => {
  console.log(req.body);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(mediciones);
  res.end();
});

//Entregar HTML on load 
app.get("/", (req, res) => {
  res.render('/public/index.html');
  res.end();
});

//Entregar Software on get request 
app.get('/firmware/', function(req, res){
  const file = `${__dirname}/public/firmware/myprogram_v4.bin`;
  res.download(file); // Set disposition and send it.
  res.status(200);
});

//Entregar HTML images on load 
app.get("/images", (req, res) => {
  res.render('/public/images.html');
  res.end();
});

//Entregar HTML images on load 
app.get("/audio", (req, res) => {
  res.render('/public/audio.html');
  res.end();
});

app.listen(80, () => {
    console.log('Server on port 80')
});
