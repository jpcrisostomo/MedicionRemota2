/* Javascript based on Express */

const express = require('express');
const app = express(); //Este es mi servidor
const morgan = require('morgan'); //Uso middleware rutas
//const cors = require('cors'); //Uso middleware rutas
const ejs = require('ejs');

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views')); //Para get home

//app.use(cors())
app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());

app.use(morgan('tiny')); //Middleware console logs //Middleware console >
//app.use(express.static('public'));
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

/* Res. Render funcional 
app.get("/", (req, res) => {
  var mediciones = [sensores, ecg];
  res.render('pages/index',{
    mediciones: mediciones
  });
  //res.end();
  //res.render("index.ejs", {medicion});
});

*/

/* res.render adaptada */
app.get("/", (req, res) => {
  var mediciones = [sensores, ecg];
  res.render('pages/index');
  //res.end();
  //res.render("index.ejs", {medicion});
});

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  var mediciones = [sensores, ecg];
  res.write("mediciones: "+ mediciones + "\n\n");
  });
  //res.end();
  //res.render("index.ejs", {medicion});

/*
app.get("/camera_uploads/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
*/

app.listen(80, () => {
    console.log('Server on port 80')
})
