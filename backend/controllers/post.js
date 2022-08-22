const Post = require('../models/post');
const fs = require('fs');
const User = require('../models/User');

// Création des différentes logiques pour les routes post
// (create, getOne, modify, delete, getAll, like)

exports.createPost = (req, res, next) => {
const postObject = JSON.parse(req.body.post);
delete postObject._id;
const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
});
post.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({
      _id: req.params.id
    }).then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  
exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      User.findOne({_id: req.auth.userId}).then((user) => {
        // si l'id du créateur du post est différent de l'id de l'utilisateur ET que l'utilisateur n'est pas admin on renvoie une erreur 403 
        if (post.userId !== req.auth.userId && user.role !== "admin") {
          res.status(403).json({ error: "Unauthorized request" });
        // sinon on modifie le post
        } else {
            const postObject = req.file ? 
            {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };      
            Post.updateOne(
              { _id: req.params.id },
              { ...postObject, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: "Post modifié." }))
              .catch((error) => res.status(400).json({ error }));
        
        }

      })
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      User.findOne({_id: req.auth.userId}).then((user) => {
        // si l'id du créateur de la sauce est différent de l'id de l'utilisateur ET que l'utilisateur n'est pas admin on renvoie une erreur 403
        if (post.userId !== req.auth.userId && user.role !== "admin") {
          res.status(403).json({ error: "Unauthorized request" });
        // sinon on supprime la sauce
        } else {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Post supprimé !" }))
              .catch((error) => res.status(400).json({ error }));
          });
        }
      })
    })
    .catch((error) => res.status(500).json({ error }));
};
  
exports.getAllPosts = (req, res, next) => {
    Post.find().then(
        (posts) => {
        res.status(200).json(posts);
        }
    ).catch(
        (error) => {
        res.status(400).json({
            error: error
        });
        }
    );
};

// exports.likePost = (req, res, next) => {
//   switch (req.body.like) {
//     // Like
//     case 1:
//       Post.updateOne(
//         { _id: req.params.id },
//         // On ajoute l'id de l'utilisateur dans le tableau usersLiked et on incrémente de 1
//         { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
//       )
//         .then(() => res.status(200).json({ message: 'J\'aime ce message !' }))
//         .catch((error) => res.status(400).json({ error }));
//       break;
//     // Annulation du like ou dislike
//     case 0:
//       Post.findOne({ _id: req.params.id })
//         .then((post) => {
//           // si l'id de l'utilisateur se trouve dans le tableau usersLiked
//           if (post.usersLiked.includes(req.body.userId)) {
//             Post.updateOne(
//               { _id: req.params.id },
//               // On retire l'id de l'utilisateur du tableau usersLiked et on incrémente de -1
//               { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
//             )
//               .then(() =>
//                 res.status(200).json({ message: 'Like supprimé !' })
//               )
//               .catch((error) => res.status(400).json({ error }));
//           }
//           // si l'id de l'utilisateur se trouve dans le tableau usersDisliked
//           // if (post.usersDisliked.includes(req.body.userId)) {
//           //   Post.updateOne(
//           //     { _id: req.params.id },
//           //     // On retire l'id de l'utilisateur du tableau usersDisliked et on incrémente de -1
//           //     { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } }
//           //   )
//           //     .then(() =>
//           //       res.status(200).json({ message: 'Dislike supprimé !' })
//           //     )
//           //     .catch((error) => res.status(400).json({ error }));
//           // }
//         })
//         .catch((error) => res.status(404).json({ error }));
//       break;
//     // Dislike
//     // case -1:
//     //   Post.updateOne(
//     //     { _id: req.params.id },
//     //     // On ajoute l'id de l'utilisateur dans le tableau usersDisliked et on incrémente de 1
//     //     { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } }
//     //   )
//     //     .then(() => {
//     //       res.status(200).json({ message: 'Je n\'aime pas ce message !' });
//     //     })
//     //     .catch((error) => res.status(400).json({ error }));
//     //   break;
//     default:
//       console.log(error);
//   }
// }

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    
    if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
      
      Post.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: +1 },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({ message: "Like ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    if (post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
      Post.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: -1 },
          $pull: { usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(200).json({ message: "Like supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    
  });  
};