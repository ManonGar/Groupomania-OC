const passwordValidator = require('password-validator');

const pswdSchema = new passwordValidator();

pswdSchema
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf(['1Aaaaaaa','2Bbbbbbb'])

// EXPORT
module.exports = pswdSchema;