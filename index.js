// importar express
const express = require('express');
const mongoose = require('mongoose');

// variables de config
const port = process.env.PORT || 3000;
const db   = process.env.DB || 'mongodb://localhost/users';

// conexion a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
.catch(err => console.error(`Connection error ${err}`));

// crear objeto app
const app = express();

const User = require('./models/User');

// definir las rutas
app.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.json(users);
  });
});

app.get('/users/:id', (req, res) => {
  User.find({ id: req.params.id }).exec((err, user) => {
    res.json(user);
  });
});

// definir alguna ruta para la app
app.get('/', (req, res) => {
  res.send('Usa los endpoints /users o /users/id');
});

// decirle a la app que escuche en algun puerto
app.listen(port, () => {
  console.log('Server escuchando en el puerto ' + port);
});
