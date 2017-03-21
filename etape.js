const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet-provinces', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

//page de base
app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
   //récupère la bdd
    var cursor = db.collection('carnet-provinces').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // affiche le contenu de la BD
    res.render('index.ejs', {carnet: resultat})

    }) 
})

//lorsqu'on ajoute une adresse
app.get('/fichier',  (req, res) => {
    console.log(__dirname + "/public/text/" + "collection_provinces.json");
     res.sendFile( __dirname + "/public/text/" + "collection_provinces.json" );
  //res.sendFile( __dirname + "/" + "04_form.htm" );
})

//lorsqu'on ajoute une adresse
app.get('/provinces',  (req, res) => {
    fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
       console.log( data );
        res.render('index.ejs', {carnet: JSON.parse(data)})
      // res.end(data);
   });
})

//lorsqu'on ajoute une adresse
app.get('/collection',  (req, res) => {
    var cursor = db.collection('carnet-provinces').find().toArray(function(err, resultat){
       if (err) return console.log(err)
        // affiche le contenu de la BD
        res.render('index.ejs', {carnet: resultat})

    }) 
})