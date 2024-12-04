const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/santiDBmongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a la base de datos MongoDB.');
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  country: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
