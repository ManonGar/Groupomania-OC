// Importation d'express et création d'un routeur express
const express = require('express');
const router = express.Router();

// On importe les middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// On importe le contrôleur
const postCtrl = require('../controllers/post');

// On enregistre les routes post
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;