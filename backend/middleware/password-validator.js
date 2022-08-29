const pswdSchema = require('../models/Password');

module.exports = (req, res, next) => {
    if (!pswdSchema.validate(req.body.password)) {
        return res.status(400).json({ message: "Le mot de passe doit contenir entre 8 et 20 caractères, avec au moins une majuscule, une minuscule et un chiffre." });
    } else {
        next();
    }
};