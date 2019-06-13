const mongoose = require('mongoose');

// ma base de donnée
const dbUrl = 'mongodb+srv://Capsule:Magiksysteme@thomasbayardcapsule-6nyun.mongodb.net/mymovizApp?retryWrites=true';
/* --------------------- */

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
};

mongoose.connect(dbUrl, options, error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Serveur DB connecté')
  }
});

module.exports = {
  mongoose: mongoose,
}
