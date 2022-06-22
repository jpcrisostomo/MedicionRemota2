/* Javascript based on Express */

const express = require('express');
const app = express(); //Este es mi servidor
const morgan = require('morgan'); //Uso middleware rutas

app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());

app.use(morgan('tiny')); //Middleware console logs //Middleware console >
//app.use(express.static('public'));

app.post('/', (req, res) => {
    console.log(req.body);
    res.end();
  });

/* Para cuando se haga request de la página home, entregar HTML correspondiente */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/camera_uploads/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(80, () => {
    console.log('Server on port 80')
})
