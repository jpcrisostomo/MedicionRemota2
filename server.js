/* Javascript based on Express */

const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors'); //Uso middleware rutas
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//binary = require('binary');

//const ejs = require('ejs');
const fetch = require('node-fetch');
const { json } = require('express');
//app.set('views', path.join(__dirname, 'views')); //Para get home
const app = express();

app.use(cors());
//app.use(express.json());
//app.use(express.Blob);
app.use(
  express.json({
    limit: '5mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

//app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny')); //Middleware console logs 'tiny'
app.use(express.static('public'));

var mediciones= {ecg1: "35.50",ecg2: "300.50",ecg3: "3.50",ecg4: "3766.50",ecg5: "0.50",ecg6: "35.50",ecg7: "100.50",ecg8: "35.50",ecg9: "7000.50",ecg10: "550.50",
ecg11: "35.50",ecg12: "300.50",ecg13: "3.50",ecg14: "316.50",ecg15: "0.50",ecg16: "35.50",ecg17: "100.50",ecg18: "35.50",ecg19: "1000.50",ecg20: "35.50",
tmp: "149.00",oxi: "496.50",resp: "764.50",fcard: "35.5"} //Var inicial

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

var counter_images_uploaded = 0;

//var Buff_data;


const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "public/image_uploads/"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});



var stringy = 'image_'+ counter_images_uploaded +  '.jpg';

/*
app.post( "/images",(req, res) => {
    const tempPath = req.file.path;
    const targetPath = "public/image_uploads/"+ stringy;
    counter_images_uploaded++;

      fs.writeFile(targetPath,req.body, err => {
        if (err) return handleError(err, res);
        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
      
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .jpg files are allowed!");
      });
      
  
  }
);

/*
//var buf = Buffer.alloc(600000);
app.post(
  "/images",
  (req, res) => {
    //const tempPath = req.file.;
    //image = new Buffer(req.body, 'binary');
    console.log('HOLI');
    console.log(req.body);
    buf = req.body;
    //console.log()
    //buf= .toString('binary'), 'binary');

    const targetPath = "public/image_uploads/"+ stringy;
    counter_images_uploaded++;
 
      fs.writeFile(targetPath,buf, err => {
        if (err) return handleError(err, res);
        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
  
  }
);


*/

app.post(
  "/images", upload.single("image"),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = "public/image_uploads/"+ stringy;
    counter_images_uploaded++;
    console.log(targetPath);

    if (path.extname(req.file.originalname).toLowerCase() === ".jpg"){
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);
        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .jpg files are allowed!");
      });
    }
  }
);




app.listen(80, () => {
    console.log('Server on port 80')
});
