const mongoose = require('mongoose');

// ma base de donnée
const dbUrl = '';
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
