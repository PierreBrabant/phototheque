const express = require('express');
const router = express.Router()
const albumController = require('../controllers/album.controller')
//Synthaxe d'une route 
//router.get('/url de la page',acces des modules dans le controllers.nom du module)
//Route pour l'affichage des albums
router.get('/albums',albumController.albums);
//Route pour la page d'erreur
router.get('/pageerror',albumController.error)
//Route pour récuperer l'id de l'album
router.get('/albums/:id',albumController.album);
//Route pour envoyer l'image dans la BDD
router.post('/albums/:id',albumController.addImageToAlbum);
//Affichage du formulaire de crréation des albums
router.get('/albums/create',albumController.createAlbumForm);
//Envoie du formulaire dans la BDD
router.post('/albums/create',albumController.createAlbum)
//Supprimer une image 
router.post('/albums/delete/:id',albumController.deleteImageToAlbum)


module.exports=router;