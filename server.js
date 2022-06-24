/* Javascript based on Express */

const express = require('express');
const app = express();
const morgan = require('morgan'); 
//const cors = require('cors'); //Uso middleware rutas
const ejs = require('ejs');

//app.set('views', path.join(__dirname, 'views')); //Para get home

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny')); //Middleware console logs

app.use('/', express.static('src'));
app.set('view engine', 'ejs');

var sensores = 'hola';
var ecg ='123';

app.post('/', (req, res) => {
  console.log(req.body);
  sensores = req.body;
  res.end();
});

app.post('/ecg', (req, res) => {
  console.log(req.body);
  ecg = req.body;
  res.end();
});

//Entregar HTML on load 
app.get("/", (req, res) => {
  res.render('pages/index');
  res.end();
});

/*
app.get("/camera_uploads/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
*/

app.listen(80, () => {
    console.log('Server on port 80')
})
