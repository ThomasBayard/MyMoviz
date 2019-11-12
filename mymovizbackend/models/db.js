const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
};

// Ne pas oublier de mettre l'API pour se connecter à la BDD 
mongoose.connect('',
    options,
    function(err) {
        if (err) {
            console.log(`Erreur de connexion à la BDD --> ${err}`);
        } else {
            console.info('Succes connexion à la BDD');
        }
    }
);

module.exports = mongoose;
