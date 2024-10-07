//Module
const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const albumRoute = require('./routes/album.route');
const path = require('path');
const { erreur404 } = require('./controllers/album.controller');
const { error } = require('console');
//Connexion BDD
mongoose.connect('mongodb://localhost/phototheque');//Connexion a la bdd et parametrage de cette derniere
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());
//Configuration EJS
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));//Mise en place du views
app.use(express.static('public'));//Mise en place du 

//Page d'accueil
app.get('/',(req,res)=>{
    res.redirect('/albums')
})
//Config express session
app.set('trust proxy',1);
app.use(session({
    secret:'secretmdp',
    resave:false,
    saveUninitialized:true,
}));
//Utilisation de flash(gestion d erreur)
app.use(flash())
//Gestion des routes dans le fichier album.route.js
app.use('/',albumRoute);
//Gestion des erreurs de page
app.use((req,res)=>{
    res.status(404);//Récuperation de l'erreur (404)
    res.redirect('/pageerror');//Redirection en cas d'erreur 404 vers cette page
});
//Lecture du serveur
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
