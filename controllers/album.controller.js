const Album = require('../models/Album');
const path = require("path");
const fs = require('fs')
//Redirection de la page Albums
const albums = async (req,res)=>{
    const albums = await Album.find();//Récuperation des albums
    console.log(albums)
    res.render('albums',{
        title:`Mon album`,//Title pour le html
        albums,//Les données de l'album
        //Permet de retourner une erreur en cas de probleme
    });
}
//Ajout d'une image dans l'album
const addImageToAlbum = async (req,res)=>{
    const idAlbum = req.params.id;//Récuperation de l'id de l'album
    const album = await Album.findById(idAlbum);//Recupêration de l'albums par l'id
    console.log(req.files);
    //Gestion des erreurs 
    if(!req?.files?.image){//Permet de verifier si req est present avec le ? pareil pour files
        req.flash('error','Aucun fichier mis en ligne');
        res.redirect(`/albums/${idAlbum}`);
        return;
    };

    //Gestion des problemes de fichier
    const image = req.files.image;
    if(image.mimetype != 'image/jpeg'&& image.mimetype != 'image/png'){
        req.flash('error','Veuillez mettre un fichier jpeg ou png ');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }

    const imgName = image.name;//Récuperation du nom de l'image
    const folderPath = path.join(__dirname,'../public/upload',idAlbum);//Récuperation de l'adresse du chemin public
    fs.mkdirSync(folderPath,{recursive:true});//Permet la création des dossier si il n'existe pas(recursive permet de faire l'arbo des dossiers)

    const localPath = path.join(folderPath,imgName);//Récuperation de l'adresse complète du dossier de stockage

    await image.mv(localPath)//Stockage de l'image dans le dossier 
    album.images.push(imgName);//Rajout du nom de l'image dans la BDD 
    await album.save();//Sauvegarde de l'image

    res.redirect(`/albums/${idAlbum}`)//Redirection vers la page album
}

//Suppression d'une image
const deleteImageToAlbum = async (req,res)=>{
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum)

    const imgName = image.name;
    const folderPath = path.join(__dirname,'../public/upload',idAlbum);
    fs.rmdir(folderPath,{recursive:true});
    album.images.splice(imgName)
    await album.save();
    res.redirect(`/albums/${idAlbum}`);


}

//Page d'erreur
const error = (req,res)=>{
    res.render('pageerror',{title:"Erreur 404"});//Mise ne place de la page d'erreur
};
//Création d'un nouvel album et gestion des erreurs 
const createAlbum =async (req,res)=>{
    try{
        if(!req.body.albumTitle){//Verification si l'user à mis un nom d'album
            req.flash('error','mets un titre ou je te monte en l\'aire');//Affichage du message d'erreur
            res.redirect('/albums/create');//Redirection vers l'espace de création de l'album
            return;
        }
    await Album.create({//Si un nom à été mis sauvegarde du nom de l'album
        title:req.body.albumTitle//Envoie a la bdd le nom de l'album
    });

    res.redirect('/albums');//Redirection vers les albums
    }catch(err){//Gestion des erreur autres
        req.flash('error','Erreur lors de la création de l\'album')
        res.redirect('/albums/create');

    };
};
//Gestion de la page de création de formulaire
const createAlbumForm = (req,res)=>{
    
    res.render('new-album',//Nommage de la route
        {title: "Nouvel Album",//Title de l'html
         error: req.flash('error')//Affichage en cas d'erreur
        });
    
};
//Récuperation de l'id de l'album
const album = async (req,res)=>{
    try{
    const idAlbum = req.params.id ;//Récuperation de l'id de l'album
    const album = await Album.findById(idAlbum);//Récuperation de l'album par son id
    console.log(album)//Affichage de l'album
    res.render('album',{//Rendu pour la page ejs
        title:album.title,//Affichage du title html
        album,//Récuperation du nom de l'album
        error:req.flash('error'),//Gestion de l'erreur 
    });
}catch(err){//Gestion des erreurs en cas de probleme avec un id album
    console.log(err);//Affichage dans la console de l'erreur
    res.redirect('/404');//Redirection vers la page des erreurs
};
};


//exportation des fonctions 
module.exports = {
    albums,
    album,
    error,
    createAlbumForm,
    createAlbum,
    addImageToAlbum,
    deleteImageToAlbum,
    
};