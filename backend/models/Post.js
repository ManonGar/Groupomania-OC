const mongoose = require('mongoose');

// On crée un schéma de données avec les champs requis pour un post
const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    userName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, required: false, default: 0 },
    usersLiked: { type: Array, required: false, default: [] },
});

// On exporte le schéma en tant que modèle Mongoose, on le rend ainsi disponible pour notre application express
module.exports = mongoose.model('Post', postSchema);